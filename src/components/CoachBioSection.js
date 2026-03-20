import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";

const CoachBioSection = ({
	backgroundColour,
	sectionLayout,
	image,
	subheadingAbove,
	heading,
	subheading,
	description,
	primaryCtaButton,
	secondaryCta,
	subheadingAboveColour,
	headingColour,
	subheadingColour,
	descriptionTextColour,
	primaryCtaButtonColour,
	primaryCtaTextColour,
	secondaryCtaTextColour,
	secondaryCtaChevronColour,
	customCss
}) => {
	const bioImage = getImage(image?.localFile);

	return (
		<section 
			className="coach-bio-section py-5 py-xl-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row className="align-items-center">
					
					<Col xs={12} md={12} lg={9} xl={7} className={`ps-xl-0 ${sectionLayout ? 'order-1 pe-xl-7' : 'order-2 ps-xl-7 pe-xl-0'}`}>
						<div className="mx-auto mx-md-0 mx-xl-0 mt-4 mt-xl-0">
							{subheadingAbove && (
								<p
									className="coach-bio-subheading-above mb-2"
									style={{ color: subheadingAboveColour }}
								>
									{subheadingAbove}
								</p>
							)}
                            {heading && (
								<h2 
									className="coach-bio-heading"
									style={{ color: headingColour }}
								>
									{heading}
								</h2>
							)}
							{subheading && (
								<p 
									className="coach-bio-subheading"
									style={{ color: subheadingColour }}
								>
									<strong>{subheading}</strong>
								</p>
							)}
							
							{description && (
								<div className="coach-bio-description" style={{ color: descriptionTextColour }}>
									<SafeHtmlParser className="coach-bio-description-html" htmlContent={description} />
								</div>
							)}

							{primaryCtaButton && primaryCtaButton.url && (
								<div className="coach-bio-cta-container mt-4 d-flex align-items-center flex-wrap gap-3 justify-content-center justify-content-xl-start">
									<Button
										as={primaryCtaButton.url.startsWith('/') ? Link : 'a'}
										to={primaryCtaButton.url.startsWith('/') ? primaryCtaButton.url : undefined}
										href={!primaryCtaButton.url.startsWith('/') ? primaryCtaButton.url : undefined}
										target={primaryCtaButton.target || '_self'}
										variant="primary"
										className="coach-bio-primary-cta-button btn-primary py-3 px-3"
										style={{
											...(primaryCtaButtonColour && { backgroundColor: primaryCtaButtonColour, borderColor: primaryCtaButtonColour }),
											...(primaryCtaTextColour && { color: primaryCtaTextColour })
										}}
									>
										{primaryCtaButton.title}
									</Button>
									{secondaryCta && secondaryCta.url && (
										<Button
											as={secondaryCta.url.startsWith('/') ? Link : 'a'}
											to={secondaryCta.url.startsWith('/') ? secondaryCta.url : undefined}
											href={!secondaryCta.url.startsWith('/') ? secondaryCta.url : undefined}
											target={secondaryCta.target || '_self'}
											variant="btn-link"
											className="coach-bio-secondary-cta-button p-0 text-decoration-none d-inline-flex align-items-center justify-content-center"
											style={{ color: secondaryCtaTextColour }}
										>
											{secondaryCta.title}
											<svg className="ms-2" width="16" height="16" viewBox="0 0 24 24" fill={secondaryCtaChevronColour || secondaryCtaTextColour}>
												<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
											</svg>
										</Button>
									)}
								</div>
							)}
						</div>
					</Col>
					<Col xs={12} md={12} lg={3} xl={5} className={`px-md-9 py-md-3 px-lg-0 py-lg-0 ${sectionLayout ? 'order-2' : 'order-1'}`}>
						{bioImage && (
							<GatsbyImage
								image={bioImage}
								alt={image?.altText || "Coach bio"}
								className="coach-bio-image w-100 h-100 mb-4 pb-lg-4 mb-xl-0"
							/>
						)}
					</Col>
				</Row>
			</Container>
			
			<style>{`
				.coach-bio-image {
					margin: 0 !important;
					padding: 0 !important;
					box-shadow: none !important;
					filter: none !important;
				}
				
				.coach-bio-image img {
					margin: 0 !important;
					padding: 0 !important;
					object-fit: cover !important;
					box-shadow: none !important;
					filter: none !important;
				}
				
				.coach-bio-image picture {
					margin: 0 !important;
					padding: 0 !important;
					box-shadow: none !important;
					filter: none !important;
				}
				
				.coach-bio-image > div {
					margin: 0 !important;
					padding: 0 !important;
					box-shadow: none !important;
					filter: none !important;
				}
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default CoachBioSection;