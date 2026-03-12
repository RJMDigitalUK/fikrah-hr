import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";

const ProgramSummary = ({
	heading,
	subheading,
	description,
	cta,
	bulletPoints,
	backgroundColour,
	headingTextColour,
	subheadingTextColour,
	descriptionTextColour,
	bulletPointsTextColour,
	ctaButtonColour,
	ctaButtonTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour,
	customCss
}) => {
	return (
		<section 
			className="programsummary-section py-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="programsummary-content-container">
				<Row>
					<Col xs={12} xl={6} className="order-1">
						<div className="programsummary-text-container">
                            {heading && (
								<h2 
									className="programsummary-heading text-center text-md-start"
									style={{ color: headingTextColour }}
								>
									{heading}
								</h2>
							)}
							{subheading && (
								<p 
									className="programsummary-subheading text-center text-md-start pb-4"
									style={{ color: subheadingTextColour }}
								>
									<strong>{subheading}</strong>
								</p>
							)}
							
							{description && (
								<div className="programsummary-description" style={{ color: descriptionTextColour }}>
									<SafeHtmlParser 
										className="programsummary-description-html" 
										htmlContent={description} 
									/>
								</div>
							)}
							
							{/* CTA shown on desktop only */}
							{cta && cta.title && (
								<Button 
									className="programsummary-cta-button btn-primary px-3 py-3 d-none d-lg-block"
									href={cta.url}
									target={cta.target || "_self"}
									style={{
										...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
										...(ctaButtonTextColour && { color: ctaButtonTextColour })
									}}
								>
									{cta.title}
								</Button>
							)}
						</div>
					</Col>
					<Col xs={12} xl={4} className="ms-md-4 ms-lg-6 mt-xl-8 order-2 pt-4">
						{bulletPoints && bulletPoints.length > 0 && (
							<div className="programsummary-bullet-points-container program-bullet-points">
								{bulletPoints.map((point, index) => {
									const iconImage = getImage(point.icon?.localFile);
									const isSvg = point.icon?.mimeType === "image/svg+xml";
									
									return (
										<div key={index} className="programsummary-bullet-item bullet-point d-flex mb-3 mb-xl-0">
											{point.icon && (
												<div className="programsummary-bullet-icon-container bullet-point-icon me-3">
													{isSvg ? (
														<img
															src={point.icon.localFile?.publicURL || point.icon.sourceUrl}
															alt={point.icon?.altText || "Bullet point icon"}
															className="bullet-svg-icon"
															style={{ width: "40px", height: "40px" }}
														/>
													) : iconImage ? (
														<GatsbyImage
															image={iconImage}
															alt={point.icon?.altText || "Bullet point icon"}
															className="bullet-image-icon"
														/>
													) : (
														<img
															src={point.icon.sourceUrl}
															alt={point.icon?.altText || "Bullet point icon"}
															className="bullet-fallback-icon"
															style={{ width: "40px", height: "40px" }}
														/>
													)}
												</div>
											)}
											<p 
												className="bullet-point-text"
												style={{ color: bulletPointsTextColour }}
											>
												{point.text}
											</p>
										</div>
									);
								})}
							</div>
						)}
					</Col>
					{/* CTA shown on mobile/tablet only, positioned below bullet points */}
					<Col xs={12} className="order-3 d-lg-none text-center">
						{cta && cta.title && (
							<Button 
								className="programsummary-cta-button btn-primary mt-4 px-3 py-3"                                
								href={cta.url}
								target={cta.target || "_self"}
								style={{
									...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
									...(ctaButtonTextColour && { color: ctaButtonTextColour })
								}}
							>
								{cta.title}
							</Button>
						)}
					</Col>
				</Row>
			</Container>
			
			<style>{`
				.program-bullet-points {
					line-height: 1;
				}
				
				.bullet-point-icon {
					max-width: 20px;
					max-height: 20px;
					width: 20px !important;
					height: 20px !important;
				}
				
				.bullet-svg-icon,
				.bullet-image-icon,
				.bullet-fallback-icon {
					max-width: 20px;
					max-height: 20px;
					object-fit: contain;
				}
				
				.programsummary-cta-button:hover {
					background-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
					border-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
					color: ${ctaButtonTextHoverColour || 'var(--primary-cta-hover-text-colour)'} !important;
				}
				
				@media (min-width: 768px) and (max-width: 991.98px) {
					.program-bullet-points {
						line-height: 2;
					}
				}
				
				@media (max-width: 767.98px) {
					.program-bullet-points {
						line-height: 2;
					}
				}
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default ProgramSummary;