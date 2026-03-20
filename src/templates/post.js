import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import BlogContentSection from "../components/BlogContentSection";
import Layout from "../components/Layout";
import BlogCta from "../components/BlogCta";
import { Col, Container, Row } from "react-bootstrap";
import { StickyContainer, Sticky } from "react-sticky";
import { useMediaQuery } from "react-responsive";
import Header1 from "../components/Header1";
import PageBreak from "../components/PageBreak";
import BlogCarousel from "../components/BlogCarousel";

const PostTemplate = ({ data: { wpPage, site, wpComponentThemeSettings } }) => {
	const siteUrl = site?.siteMetadata?.siteUrl;
	const [activeRole, setActiveRole] = useState(null);
	const categoryName = wpPage.categories?.nodes?.[0]?.name || "Uncategorized";
	const categoryId = wpPage.categories?.nodes?.[0]?.databaseId;

	// Create category color map from repeater
	const categoryColorMap = new Map(
		wpComponentThemeSettings?.themeSettings?.blogCategoryColours?.map(c => [
			c.category.databaseId,
			{ bg: c.backgroundColour, text: c.textColour }
		]) || []
	);

	// Get category-specific colors from map
	const categoryColors = categoryId ? categoryColorMap.get(categoryId) : null;

	const isDesktop = useMediaQuery({ minWidth: 992 });

	const { seoFields } = wpPage;

	const breadcrumb = {
		"@context": "http://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: "1",
				name: "Home",
				item: {
					url: `${siteUrl}`,
					id: `${siteUrl}`,
				},
			},
			{
				"@type": "ListItem",
				position: "2",
				name: `Blog`,
				item: {
					url: `${siteUrl}/blog`,
					id: `${siteUrl}/blog`,
				},
			},
			{
				"@type": "ListItem",
				position: "3",
				name: `${seoFields?.metaTitle}`,
				item: {
					url: `${siteUrl}/blog/${wpPage.slug}`,
					id: `${siteUrl}/blog/${wpPage.slug}`,
				},
			},
		],
	};

	return (
		<Layout>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
			</Helmet>
			<GatsbySeo
				title={seoFields?.metaTitle || wpPage?.title}
				description={seoFields?.metaDescription}
				language="en"
				openGraph={{
					type: "website",
					url: `${siteUrl}/resources/${wpPage.slug}`,
					title: `${seoFields?.opengraphTitle || wpPage?.title}`,
					description: `${seoFields?.opengraphDescription}`,
					images: [
						{
							url: `${seoFields?.image?.sourceUrl}`,
							width: `${seoFields?.image?.mediaDetails.width}`,
							height: `${seoFields?.image?.mediaDetails.height}`,
							alt: `${seoFields?.image?.altText}`,
						},
					],
				}}
			/>
			<Header1 heading={wpPage.title} backgroundImage={wpPage.postBannerFields?.featuredImage} frameFullHeight={true} headingTextColour={wpComponentThemeSettings.themeSettings.blogPostHeadingTextColour}/>
			{wpPage.postBannerFields?.keyBenefits?.length > 0 && (
				<PageBreak keyBenefits={wpPage.postBannerFields.keyBenefits} backgroundColour={wpComponentThemeSettings.themeSettings.keyBenefitsBackgroundColour} keyBenefitsTextColour={wpComponentThemeSettings.themeSettings.keyBenefitsTextColour} customCss={wpComponentThemeSettings.themeSettings.customCss}/>
			)}
			<section className="pt-5 pb-0 py-lg-7" style={{backgroundColor: wpComponentThemeSettings.themeSettings.blogPostBackgroundColour}}>
				<Container>
					<StickyContainer>
						<Row className="g-6 g-lg-5">
							<Col lg={8}>
								<Row className="g-2 align-items-center mb-4">
									<Col xs="auto">
										<div className="p-1 px-2 position-relative">
											<div
												style={{
													...(categoryColors?.bg ? { background: categoryColors.bg } : { background: "rgba(233, 78, 27, 0.25)" }),
													borderRadius: "6px",
												}}
												className="position-absolute w-100 h-100 start-0 top-0"
											/>
											<p
												style={{ 
													zIndex: 2,
													...(categoryColors?.text && { color: categoryColors.text })
												}}
												className="position-relative py-0 my-0"
											>
												{categoryName}
											</p>
										</div>
									</Col>

									<Col xs="auto">
										<p className="ms-3 ms-xl-4 mb-0" style={{ color: wpComponentThemeSettings.themeSettings.minsToReadText }}>
											{wpPage.blogFields.numberOfMinsRead} mins to read
										</p>
									</Col>
								</Row>
								
								<BlogContentSection site={site} wpPage={wpPage} styling={wpComponentThemeSettings.themeSettings} />
								
							</Col>
							{wpPage.blogCtaFields && (
								<Col xs={12} lg={4}>
									{isDesktop ? (
										<Sticky>
											{({ style, isSticky }) => (
												<div
													style={{
														boxShadow: "none",
														backgroundColor: "#F9FAFB",
														...style,
														...(isSticky ? { marginTop: "50px" } : {}),
													}}
												>
													<BlogCta
														heading={wpPage.blogCtaFields.ctaHeading}
														body={wpPage.blogCtaFields.body}
														primaryCta={wpPage.blogCtaFields.primaryCta}
														secondaryCta={wpPage.blogCtaFields.secondaryCta}
														backgroundColour={wpPage.blogCtaFields.backgroundColour}
														headingColour={wpPage.blogCtaFields.headingColour}
														bodyTextColour={wpPage.blogCtaFields.bodyTextColour}
														primaryCtaColour={wpPage.blogCtaFields.primaryCtaColour}
														primaryCtaTextColour={wpPage.blogCtaFields.primaryCtaTextColour}
														secondaryCtaColour={wpPage.blogCtaFields.secondaryCtaColour}
														secondaryCtaTextColour={wpPage.blogCtaFields.secondaryCtaTextColour}
														customCss={wpPage.blogCtaFields.customCss}
													/>
												</div>
											)}
										</Sticky>
									) : (
										// On smaller screens, simply render the CTA with a bit of padding
										<div>
											<BlogCta
												heading={
													wpPage.blogCtaFields.ctaHeading
												}
												body={wpPage.blogCtaFields.body}
												primaryCta={wpPage.blogCtaFields.primaryCta}
												secondaryCta={wpPage.blogCtaFields.secondaryCta}
											/>
										</div>
									)}
								</Col>
							)}
						</Row>
					</StickyContainer>
				</Container>
			</section>

			{/* Blog carousel: show latest posts in a single horizontal row (3 visible on desktop) */}
			<BlogCarousel />
		</Layout>
	);
};

export default PostTemplate;

export const pageQuery = graphql`
	query PostById($id: String!) {
		site {
			siteMetadata {
				siteUrl
			}
		}
		wpComponentBlogCta: wpComponent(slug: { eq: "blog-cta" }) {
			title
			slug
		}

		wpComponentThemeSettings: wpComponent(slug: { eq: "theme-settings" }) {
      	themeSettings {
			blogPostBackgroundColour
			blogPostHeadingTextColour
			keyBenefitsBackgroundColour
			keyBenefitsTextColour
			minsToReadText
			authorNameTextColour
			authorDescriptionTextColour
			customCss
			blogCategoryColours {
				category {
					databaseId
				}
				backgroundColour
				textColour
			}
       }
    }

		wpPage: wpPost(id: { eq: $id }) {
			postBannerFields {
				keyBenefits{
					benefit
				}
				featuredImage {
					altText
					localFile {
						childImageSharp {
							gatsbyImageData(
								formats: [WEBP, AUTO]
								quality: 100
								transformOptions: { cropFocus: CENTER, fit: COVER }
								layout: CONSTRAINED
								placeholder: BLURRED
							)
						}
					}
				}
			}
			blogCtaFields{
				ctaHeading
				body
				backgroundColour
				headingColour
				bodyTextColour
				primaryCtaColour
				primaryCtaTextColour
				secondaryCtaColour
				secondaryCtaTextColour
				customCss
				secondaryCta {
					title
					url
					target
				}
				primaryCta {
					title
					url
					target
				}
			}	
			author {
				node {
					name
					lastName
					description
				}
			}
			content
			slug
			id
			title
			date
			seoFields {
				opengraphTitle
				opengraphDescription
				metaTitle
				metaDescription
				fieldGroupName
				productSchema
				image {
					altText
					sourceUrl
					mediaDetails {
						height
						width
					}
				}
			}
			blogFields {
				description
				numberOfMinsRead
				authorName
				authorRole
				authorImage {
					altText
					localFile {
						childImageSharp {
							gatsbyImageData(
								formats: [WEBP, AUTO]
								quality: 100
								transformOptions: { cropFocus: CENTER, fit: COVER }
								layout: CONSTRAINED
								placeholder: BLURRED
							)
						}
					}
				}				
			}
			categories {
				nodes {
					name
					databaseId
				}
			}
		}
	}
`;
