import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";

const FaqSection = ({
	backgroundColour,
	subheadingColour,
	descriptionColour,
	textColour,
	text,
	questions,
	subheading,
	description,
	cta,
	ctaButtonColour,
	ctaButtonTextColour,
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
					{description && (
								<div className="faq-text  mb-5" style={{color: descriptionColour}}>								
									{description}
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
										style={{ color: textColour }}
									>
										{faq.faqFields?.question}
									</Card.Title>
													{faq.faqFields?.answer && (
														<div className="faq-answer preview mt-2">
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
				
				{cta && cta.title && (
					<Row>
						<Col xs={12} className="text-center text-xl-start">
						<div className="faq-header text-xl-start">
							{subheading && (
								<h3 className="faq-heading" style={{ color: subheadingColour }}>{subheading}</h3>
							)}
							{text && (
						<div style={{ color: textColour }} className="faq-subheading">
							<p>{text}</p>
						</div>
							)}
						</div>
							<Button 
								className="faq-cta-button px-3 py-3 mt-4 w-100 w-md-auto"
								href={cta.url}
								target={cta.target || "_self"}
								style={{
									...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
									...(ctaButtonTextColour && { color: ctaButtonTextColour })
								}}
							>
								{cta.title}
							</Button>
						</Col>
					</Row>
				)}
			</Container>
			<style>{`
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