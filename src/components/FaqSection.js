import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";

const FaqSection = ({
	backgroundColour,
	subheadingColour,
	descriptionColour,
	headingColour,
	questions,
	heading,
	subheading,
	subheadingDescription,
	description,
	ctaButton,
	subheadingDescriptionColour,
	ctaButtonColour,
	ctaTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour,
	customCss
}) => {
	return (
		<section 
			className="faq-section py-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row>
					<Col xs={12}>
					{heading && (
								<h2 className="faq-heading mb-3" style={{ color: headingColour }}>{heading}</h2>
							)}
					{description && (
								<div className="faq-text  mb-5" style={{color: descriptionColour}}>								
									<SafeHtmlParser htmlContent={description} />
								</div>
							)}
					
                        
					</Col>
				</Row>
				
				{questions && questions.length > 0 && (
					<Row className="justify-content-center mb-7">
						<Col xs={12}>
							<Row className="faq-cards gx-4 gy-4">
								{questions.map((faq, index) => {
									const key = faq.id || index;
									const url = faq.uri || faq.link || (faq.slug ? `/your-questions/${faq.slug}` : '#');
									
									return (
										<Col xs={12} md={6} lg={4} key={key}>
											<Card as="a" href={url} className="h-100 text-reset text-decoration-none faq-card py-3 px-3">
												<Card.Body>
													<Card.Title 
										className="pb-3"
										style={{ color: "#292d65"}}
									>
										{faq.faqFields?.question}
									</Card.Title>
													{faq.faqFields?.answer && (
														<div className="faq-answer preview mt-2" style={{ color: "#43454B" }}>
															<SafeHtmlParser htmlContent={faq.faqFields?.answer} />
														</div>
													)}
												</Card.Body>
											</Card>
										</Col>
									);
								})}
							</Row>
						</Col>
					</Row>
				)}
				
				{ctaButton && ctaButton.title && (
					<Row>
						<Col xs={12} className="text-center text-xl-start">
						<div className="faq-header text-xl-start">
							{subheading && (
								<h3 className="faq-subheading-cta" style={{ color: subheadingColour }}>{subheading}</h3>
							)}
							{subheadingDescription && (
								<div className="faq--description mb-5" style={{ color: subheadingDescriptionColour }}><SafeHtmlParser htmlContent={subheadingDescription} /></div>
							)}
						</div>
							<Button 
								className="faq-cta-button px-3 py-3 mt-4 w-100 w-md-auto"
								href={ctaButton.url}
								target={ctaButton.target || "_self"}
								style={{
									...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
									...(ctaTextColour && { color: ctaTextColour })
								}}
							>
								{ctaButton.title}
							</Button>
						</Col>
					</Row>
				)}
			</Container>
			<style>{`
				.faq-subheading-cta {
					font-size: 34px !important;
				}

				@media (min-width: 768px) {
					.faq-subheading-cta	 {
						font-size: 36px !important;
					}
				}

				@media (min-width: 992px) {
					.faq-subheading-cta {
						font-size: 40px !important;
					}
				}

				.faq-cta-button:hover {
					background-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
					border-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
					color: ${ctaButtonTextHoverColour || 'var(--primary-cta-hover-text-colour)'} !important;
				}
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default FaqSection;