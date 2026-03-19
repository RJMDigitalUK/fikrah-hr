import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Testimonial = ({
	backgroundImage,
	customers,
	backgroundColour,
	quoteTextColour,
	nameTextColour,
	customCss
}) => {
	const bgImage = getImage(backgroundImage?.localFile);
	const [activeIndex, setActiveIndex] = useState(0);
	const [carouselMinHeight, setCarouselMinHeight] = useState(0);
	const carouselRef = useRef(null);

	useEffect(() => {
		if (!carouselRef.current || !customers?.length) return;
		const items = carouselRef.current.querySelectorAll('.carousel-item');
		let maxHeight = 0;
		items.forEach(item => {
			const prevDisplay = item.style.display;
			item.style.display = 'block';
			maxHeight = Math.max(maxHeight, item.offsetHeight);
			item.style.display = prevDisplay;
		});
		if (maxHeight > 0) setCarouselMinHeight(maxHeight);
	}, [customers]);

	return (
		<section 
			className="testimonial-section py-7 py-xl-10 position-relative"
			style={{ backgroundColor: backgroundColour }}
		>
			{bgImage && (
				<GatsbyImage
					image={bgImage}
					alt={backgroundImage?.altText || "Testimonial background"}
					className="testimonial-bg-image position-absolute w-100 h-100"
					style={{
						top: 0,
						left: 0,
						zIndex: -1
					}}
				/>
			)}
			<Container className="testimonial-content-container position-relative">
				<Row className="justify-content-center">
					<Col xs={12} lg={8}>
						{customers && customers.length > 0 && (
							<div ref={carouselRef} style={{ minHeight: carouselMinHeight > 0 ? `${carouselMinHeight}px` : undefined }}>
							<Carousel className="testimonial-carousel" indicators={false} activeIndex={activeIndex} onSelect={setActiveIndex}>
								{customers.map((customer, index) => {
									const customerImage = getImage(customer.testimonialFields?.profilePicture?.localFile);
									return (
										<Carousel.Item key={customer.id || index}>
											<div className="testimonial-item text-center">
												{customerImage && (
													<GatsbyImage
														image={customerImage}
														alt={customer.testimonialFields?.profilePicture?.altText || "Customer"}
														className="testimonial-customer-image"
													/>
												)}
												{customer.testimonialFields?.review && (
													<p
														className="testimonial-review px-0 px-xl-4 pt-4"
														style={{ color: quoteTextColour, fontFamily: "'AmpleSoftPro', sans-serif", fontWeight: 500 }}
													>
														{customer.testimonialFields.review}
													</p>
												)}
												<div className="testimonial-attribution">
													{customer.testimonialFields?.name && (
														<p 
															className="testimonial-name"
															style={{ color: nameTextColour, fontFamily: "'AmpleSoftPro', sans-serif", fontWeight: 700 }}
														>
															{customer.testimonialFields.name}
														</p>
													)}
												</div>
											</div>
										</Carousel.Item>
									);
								})}
							</Carousel>
						</div>
						)}
						{customers && customers.length > 1 && (
							<div className="testimonial-indicators d-flex justify-content-center gap-2 mt-4">
								{customers.map((_, i) => (
									<button
										key={i}
										className={`testimonial-indicator-dot${i === activeIndex ? ' active' : ''}`}
										onClick={() => setActiveIndex(i)}
										aria-label={`Go to slide ${i + 1}`}
									/>
								))}
							</div>
						)}
					</Col>
				</Row>
			</Container>
			
			<style>{`
				.testimonial-indicator-dot {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					border: none;
					padding: 0;
					cursor: pointer;
					background-color: #7CB6E4;
					transition: background-color 0.2s ease;
					min-width: unset !important;
				}
				.testimonial-indicator-dot.active {
					background-color: #E83166;
				}

				.testimonial-customer-image {
					border-radius: 50%;
					width: 80px;
					height: 80px;
					object-fit: cover;
				}
				
				.testimonial-section {
					min-height: 500px;
					padding: 4rem 0;
				}
				
				.testimonial-bg-image {
					object-fit: cover !important;
				}

				.testimonial-review {
					font-size: 22px;
				}

				@media (max-width: 767.98px) {
					.testimonial-review {
						font-size: 20px;
					}
				}
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default Testimonial;