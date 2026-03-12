import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";

const CoachBioSection = ({
	backgroundColour,
	image,
	heading,
	subheading,
	description,
	headingColour,
	subheadingColour,
	descriptionTextColour,
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
					<Col xs={12} md={12} xl={6}>
						{bioImage && (
							<GatsbyImage
								image={bioImage}
								alt={image?.altText || "Coach bio"}
								className="coach-bio-image w-100 h-100 mb-4 pb-lg-4 mb-xl-0"
							/>
						)}
					</Col>
					<Col xs={12} md={12} xl={6}>
						<div className="mx-auto mx-md-5 mx-lg-6 mx-xl-0 mt-4 mt-xl-0">
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
						</div>
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