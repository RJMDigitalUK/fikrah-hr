import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";

const ProgramStorySection = ({
	subheadingColour,
	descriptionText1Colour,
	descriptionText2Colour,
	bulletPointTextColour,
	heading,
	headingColour,
	subheading,
	descriptionText1,
	image,
	bulletPoints,
	descriptionText2,
	cta,
	ctaButtonColour,
	ctaButtonTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour,
	backgroundColour,
	customCss
}) => {
	const storyImage = getImage(image?.localFile);

	return (
		<section className="programstory-section py-7" style={{background: backgroundColour}}>
			<Container className="programstory-content-container">
				<Row className="align-items-center">
					<Col xs={12}>
                    <div className="programstory-text-container mx-auto" style={{maxWidth: '800px'}}>
					{heading && (
								<h2 
									className="programstory-heading mb-4 text-center"
									style={{ color: headingColour }}
								>
									{heading}
								</h2>
							)}
							{subheading && (
								<p 
									className="programstory-subheading mb-3" 
									style={{color: subheadingColour}}
								>
									{subheading}
									
								</p>
							)}
							
							{descriptionText1 && (
								<div className="programstory-description-1 mb-4 lh-lg" style={{ color: descriptionText1Colour }}>
									<SafeHtmlParser className="" htmlContent={descriptionText1} style={{color: descriptionText1Colour}	}/>
								</div>
							)}
                            </div>
                            </Col>
                    </Row>
                    <Row className="align-items-center mt-4 mb-lg-5">
                            <Col xs={12}>
						{storyImage && (
							<div className="programstory-image-container mx-auto" style={{maxWidth: '800px'}}>
								<GatsbyImage
									image={storyImage}
									alt={image?.altText || "Program story"}
									className="programstory-image w-100 rounded"
									objectFit="cover"
									style={{
										aspectRatio: "16/9",
										minHeight: "400px"
									}}
								/>
							</div>
						)}
					</Col>
                    </Row>
                    <Row className="pt-4">
                            
                          <Col xs={12}>
							
							{bulletPoints && bulletPoints.length > 0 && (
								<div className="programstory-bullet-points-container mb-4 mx-auto" style={{maxWidth: '800px'}}>
									<Row>
										{bulletPoints.map((point, index) => {
											const iconImage = getImage(point.icon?.localFile);
											const isSvg = point.icon?.localFile?.extension === 'svg';
											
											return (
												<Col key={index} xs={12} lg={6} className="mb-4">
														<div className="programstory-bullet-item d-flex align-items-start h-100">
															{point.icon && (
																<div className="programstory-bullet-icon-container me-3 flex-shrink-0">
																{isSvg ? (
																	<img
																		src={point.icon.localFile.publicURL}
																		alt={point.icon.altText || "Bullet point icon"}
																		className="bullet-svg-icon"
																	/>
																) : iconImage ? (
																	<GatsbyImage
																		image={iconImage}
																		alt={point.icon.altText || "Bullet point icon"}
																		className="bullet-image-icon"
																	/>
																) : (
																	<div className="bullet-fallback-icon rounded-circle" style={{width: '20px', height: '20px'}}></div>
																)}
															</div>
														)}
														<p 
													className="mb-0 flex-grow-1 lh-base"
													style={{ color: bulletPointTextColour }}
												>
													{point.text}
												</p>
													</div>
												</Col>
											);
										})}
									</Row>
								</div>
							)}	
                            {descriptionText2 && (
								<div className="programstory-description-2 mb-4 lh-lg mx-auto" style={{maxWidth: '800px', color: descriptionText2Colour}}>
									<SafeHtmlParser className="" htmlContent={descriptionText2} />
								</div>
							)}					
							
					
					</Col>
					
				</Row>
				
				{cta && cta.title && (
					<Row className="justify-content-center">
						<Col xs={12} className="text-center">
							<Button 
								className="programstory-cta-button btn-primary py-3 px-3"
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
				.programstory-cta-button:hover {
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

export default ProgramStorySection;