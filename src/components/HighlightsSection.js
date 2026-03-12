import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const HighlightsSection = ({
	backgroundColour,
	heading,
	description,
	highlights,
	cta,
	headingTextColour,
	descriptionTextColour,
	highlightsHeadingTextColour,
	highlightsDescriptionTextColour,
	customCss,
	ctaButtonColour,
	ctaButtonTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour
}) => {
	return (
		<section 
			className="highlights-section py-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="highlights-content-container">
				<Row>
					<Col xs={12}>
						<div className="highlights-text-container text-center mb-5">
                            {heading && (
								<h2 
									className="highlights-heading mb-0"
									style={{ color: headingTextColour }}
								>
									{heading}
								</h2>
							)}
							{description && (
								<p 
									className="highlights-description my-3 mx-auto" 
									style={{maxWidth: '800px', color: descriptionTextColour}}
								>
									{description}
								</p>
							)}
							
						</div>
					</Col>
				</Row>
				
				{highlights && highlights.length > 0 && (
					<Row className="g-4 mb-7 justify-content-center">
						{/* First highlight - centered on tablet/desktop */}
						{highlights[0] && (
							<Col 
								xs={12} 
								md={12} 
								lg={4} 
								className="d-md-flex d-lg-block justify-content-md-center"
							>
								<div className="highlights-item text-center h-100 px-3">
									{highlights[0].icon && (
										<div className="highlights-icon-container mb-4">
											{highlights[0].icon?.mimeType === "image/svg+xml" ? (
												<img
													src={highlights[0].icon.localFile?.publicURL || highlights[0].icon.sourceUrl}
													alt={highlights[0].icon?.altText || "Highlight icon"}
													className="highlight-svg-icon"
													style={{ width: "80px", height: "80px" }}
												/>
											) : getImage(highlights[0].icon?.localFile) ? (
												<GatsbyImage
													image={getImage(highlights[0].icon?.localFile)}
													alt={highlights[0].icon?.altText || "Highlight icon"}
													className="highlight-image-icon"
												/>
											) : (
												<img
													src={highlights[0].icon.sourceUrl}
													alt={highlights[0].icon?.altText || "Highlight icon"}
													className="highlight-fallback-icon"
													style={{ width: "80px", height: "80px" }}
												/>
											)}
										</div>
									)}
									{highlights[0].heading && (
										<h3 
											className="highlights-item-heading mb-3"
											style={{ color: highlightsHeadingTextColour }}
										>
											{highlights[0].heading}
										</h3>
									)}
									{highlights[0].description && (
										<p 
											className="highlights-item-description mb-0"
											style={{ color: highlightsDescriptionTextColour }}
										>
											{highlights[0].description}
										</p>
									)}
								</div>
							</Col>
						)}
						
						{/* Remaining highlights - two columns on tablet */}
						{highlights.slice(1).map((highlight, index) => {
							const iconImage = getImage(highlight.icon?.localFile);
							const isSvg = highlight.icon?.mimeType === "image/svg+xml";
							
							return (
								<Col 
									xs={12} 
									md={6} 
									lg={4} 
									key={index + 1}
								>
									<div className="highlights-item text-center h-100 px-3">
										{highlight.icon && (
											<div className="highlights-icon-container mb-4">
												{isSvg ? (
													<img
														src={highlight.icon.localFile?.publicURL || highlight.icon.sourceUrl}
														alt={highlight.icon?.altText || "Highlight icon"}
														className="highlight-svg-icon"
														style={{ width: "80px", height: "80px" }}
													/>
												) : iconImage ? (
													<GatsbyImage
														image={iconImage}
														alt={highlight.icon?.altText || "Highlight icon"}
														className="highlight-image-icon"
													/>
												) : (
													<img
														src={highlight.icon.sourceUrl}
														alt={highlight.icon?.altText || "Highlight icon"}
														className="highlight-fallback-icon"
														style={{ width: "80px", height: "80px" }}
													/>
												)}
											</div>
										)}
										{highlight.heading && (
											<h3 
												className="highlights-item-heading mb-3"
												style={{ color: highlightsHeadingTextColour }}
											>
												{highlight.heading}
											</h3>
										)}
										{highlight.description && (
										<p 
											className="highlights-item-description mb-0"
											style={{ color: highlightsDescriptionTextColour }}
										>
											{highlight.description}
										</p>
										)}
									</div>
								</Col>
							);
						})}
					</Row>
				)}
				
				{cta && cta.title && (
					<Row>
						<Col xs={12} className="text-center">
							<Button 
								className="highlights-cta-button btn-primary px-3 py-3"
								style={{
									...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
									...(ctaButtonTextColour && { color: ctaButtonTextColour })
								}}
								href={cta.url}
								target={cta.target || "_self"}
								
							>
								{cta.title}
							</Button>
						</Col>
					</Row>
				)}
			</Container>
			
			<style>{`
				 .highlights-cta-button:hover {
        background-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
        border-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
        color: ${ctaButtonTextHoverColour || 'var(--primary-cta-hover-text-colour)'} !important;
    }
				
				.highlight-svg-icon,
				.highlight-image-icon,
				.highlight-fallback-icon {
					max-width: 80px;
					max-height: 80px;
					object-fit: contain;
					opacity: 0.8;
				}
				
				.highlight-image-icon {
					width: 80px !important;
					height: 80px !important;
				}
				
				
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default HighlightsSection;