import React, { useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Container, Card, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BlogCarousel = () => {
	const scrollRef = useRef(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(true);

	const data = useStaticQuery(graphql`
		query BlogCarouselPosts {
			allWpPost(sort: { fields: date, order: DESC }, limit: 20) {
				nodes {
					id
					title
					slug
					excerpt
					categories {
						nodes {
							name
							databaseId
						}
					}
					blogFields {
						numberOfMinsRead
					}
					postBannerFields {
						featuredImage {
							altText
							localFile {
								childImageSharp {
									gatsbyImageData(
										width: 800
										height: 500
										placeholder: BLURRED
										formats: [AUTO, WEBP]
										quality: 80
									)
								}
							}
						}
					}
				}
			}
			wpComponent: wpComponent(slug: { eq: "theme-settings" }) {
				themeSettings {
					blogPageBackgroundColour
					customCss
					blogCarouselHeadingTextColour
					blogCardBackgroundColour
					blogCardHeadingTextColour
					blogCardDescriptionTextColour
					blogCardCtaTextColour
					blogCardMinsReadTextColour
					blogCategoryColours {
						category {
							databaseId
						}	
						backgroundColour
						textColour
					}
				}
			}
		}
	`);

	const posts = data?.allWpPost?.nodes || [];
	const themeSettings = data?.wpComponent?.themeSettings;

	// Create category color map from repeater
	const categoryColorMap = new Map(
		themeSettings?.blogCategoryColours?.map(c => [
			c.category.databaseId,
			{ bg: c.backgroundColour, text: c.textColour }
		]) || []
	);

	if (!posts.length) return null;

	const handleScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setShowLeftArrow(scrollLeft > 0);
			setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	const scrollLeft = () => {
		if (scrollRef.current) {
			const cardWidth = scrollRef.current.querySelector('.carousel-card')?.offsetWidth || 0;
			scrollRef.current.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			const cardWidth = scrollRef.current.querySelector('.carousel-card')?.offsetWidth || 0;
			scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
		}
	};

	return (
		<section className="blogcarousel-section blog-carousel-section py-5" style={{backgroundColor: themeSettings.blogPageBackgroundColour}}>
			<Container fluid="lg" className="blogcarousel-content-container">
				{/* <h2 
					className="blogcarousel-heading mb-4"
					style={themeSettings?.blogCarouselHeadingTextColour ? { color: themeSettings.blogCarouselHeadingTextColour } : {}}
				>
					Latest blog posts
				</h2> */}

				<div className="blogcarousel-wrapper carousel-wrapper position-relative">
					{showLeftArrow && (
						<button
							className="carousel-arrow carousel-arrow-left position-absolute"
							onClick={scrollLeft}
						>
							<FaChevronLeft color="#292D65" size={16} />
						</button>
					)}

					<div
						ref={scrollRef}
						className="carousel-row"
						onScroll={handleScroll}
						style={{ overflowX: "auto", scrollbarWidth: 'none', msOverflowStyle: 'none' }}
					>
						{posts.map((post) => {
							const img = post.postBannerFields?.featuredImage?.localFile?.childImageSharp?.gatsbyImageData;
							const categoryName = post.categories?.nodes?.[0]?.name || "Uncategorized";
							const categoryId = post.categories?.nodes?.[0]?.databaseId;
							const readTime = post.blogFields?.numberOfMinsRead;
							
							// Get category-specific colors from map
							const categoryColors = categoryId ? categoryColorMap.get(categoryId) : null;
							
							return (
								<div
									key={post.id}
									className="blogcarousel-card carousel-card"
								>
									<Card 
										className="blogcarousel-card-inner h-100" 
										style={{ 
											border: '1px solid #7CB6E4',
											...(themeSettings?.blogCardBackgroundColour && { backgroundColor: themeSettings.blogCardBackgroundColour })
										}}
									>
										{img && (
											<GatsbyImage
												image={img}
												alt={post.postBannerFields?.featuredImage?.altText || post.title}
												className="card-img-top"
											/>
										)}
										<Card.Body>
											<div className="d-flex align-items-center gap-2 my-3">
												<span 
													className="badge-category"
													style={{
														...(categoryColors?.bg && { backgroundColor: categoryColors.bg }),
														...(categoryColors?.text && { color: categoryColors.text })
													}}
												>
													{categoryName}
												</span>
												{readTime && (
													<span 
														className="small ms-3"
														style={themeSettings?.blogCardMinsReadTextColour ? { color: themeSettings.blogCardMinsReadTextColour } : {}}
													>
														{readTime} min read
													</span>
												)}
											</div>
											<Card.Title 
												as="h3" 
												className="h5 my-4"
												style={themeSettings?.blogCardHeadingTextColour ? { color: themeSettings.blogCardHeadingTextColour } : {}}
											>
												{post.title}
											</Card.Title>
											<Card.Text
												className="card-excerpt"
												style={themeSettings?.blogCardDescriptionTextColour ? { color: themeSettings.blogCardDescriptionTextColour } : {}}
												dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
												
											/>
											<Card.Link 
												href={`/blog/${post.slug}`} 
												className="text-decoration-none pt-5"
												style={themeSettings?.blogCardCtaTextColour ? { color: themeSettings.blogCardCtaTextColour } : {}}
											>
												Read more
											</Card.Link>
										</Card.Body>
									</Card>
								</div>
							);
						})}
					</div>

					{showRightArrow && (
						<button
							className="carousel-arrow carousel-arrow-right position-absolute"
							onClick={scrollRight}
						>
							<FaChevronRight color="#292D65" size={16} />
						</button>
					)}
				</div>

				<style>{`
					.carousel-wrapper {
						position: relative;
					}
					
					.carousel-row {
						display: flex;
						gap: 16px;
						padding-bottom: 6px;
						scroll-snap-type: x mandatory;
						-webkit-overflow-scrolling: touch;
					}
					
					/* Hide scrollbar */
					.carousel-row::-webkit-scrollbar {
						display: none;
					}
					
					.carousel-card { 
						scroll-snap-align: start;
						flex: 0 0 100%;
						max-width: 100%;
						box-sizing: border-box;
						padding: 0 12px;
					}

					/* responsive card widths: 1 per view xs, 2 per view md, exactly 3 per view lg+ */
					@media (min-width: 768px) {
						.carousel-card { 
							flex: 0 0 calc(50% - 8px); 
							max-width: calc(50% - 8px);
						}
					}
					@media (min-width: 992px) {
						.carousel-card { 
							flex: 0 0 calc(33.3333% - 10.67px); 
							max-width: calc(33.3333% - 10.67px);
						}
					}

					.carousel-card .card-img-top {
						width: 100%;
						height: auto;
						display: block;
					}
					
					.card-excerpt {
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					
					.badge-category {						
						padding: 4px 12px;
						border-radius: 6px;
						font-size: 0.875rem;
						font-weight: 500;
						text-transform: uppercase;
					}
					
					.carousel-arrow {
							display: none;
							width: 40px;
							height: 40px;
							min-width: 40px;
							border-radius: 50%;
							padding: 0;
							background-color: #ffffff;
							border: 2px solid #292D65;
							cursor: pointer;
							align-items: center;
							justify-content: center;
							transition: all 0.2s ease;
						}
						.carousel-arrow-left {
							top: 50%;
							left: -20px;
							transform: translateY(-50%);
							z-index: 10;
						}
						.carousel-arrow-right {
							top: 50%;
							right: -20px;
							transform: translateY(-50%);
							z-index: 10;
						}
						@media (min-width: 992px) {
							.carousel-arrow { display: flex !important; }
						}
						.carousel-arrow:hover {
							background-color: #292D65 !important;
							border-color: #292D65 !important;
					}
					.carousel-arrow:hover svg {
						fill: #ffffff !important;
						color: #ffffff !important;
					}
				`}</style>
			</Container>
			{themeSettings.customCss && (
				<style>{`${themeSettings.customCss}`}</style>
			)}
		</section>
	);
};

export default BlogCarousel;