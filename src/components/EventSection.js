import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";

const EventSection = ({
	backgroundImage,
	subheading,
	heading,
	description,
	ctaButton,
	backgroundColour,
	subheadingColour,
	headingColour,
	descriptionColour,
	ctaButtonColour,
	ctaButtonTextColour,
	customCss
}) => {
	const bgImage = getImage(backgroundImage?.localFile);

	return (
		<section
			className="event-section py-5 py-lg-7 position-relative d-flex align-items-center"
			style={{ backgroundColor: backgroundColour, minHeight: "400px" }}
		>
			{bgImage && (
				<GatsbyImage
					image={bgImage}
					alt={backgroundImage?.altText || "Event background"}
					className="event-section-background-image"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 0,
					}}
					imgStyle={{ objectFit: "cover" }}
				/>
			)}
			{!bgImage && backgroundImage?.sourceUrl && (
				<div
					className="event-section-background-fallback"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundImage: `url(${backgroundImage.sourceUrl})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						zIndex: 0,
					}}
				/>
			)}

			<Container className="event-section-content-container position-relative" style={{ zIndex: 1 }}>
				<Row className="justify-content-center text-center">
					<Col xs={12} lg={8}>
						{subheading && (
							<p
								className="event-section-subheading mb-2"
								style={{ color: subheadingColour }}
							>
								{subheading}
							</p>
						)}
						{heading && (
							<h2
								className="event-section-heading mb-3"
								style={{ color: headingColour }}
							>
								{heading}
							</h2>
						)}
						{description && (
							<div
								className="event-section-description mb-4"
								style={{ color: descriptionColour }}
							>
								<SafeHtmlParser htmlContent={description} />
							</div>
						)}
						{ctaButton && ctaButton.url && (
							<Button
								as={ctaButton.url.startsWith('/') ? Link : 'a'}
								to={ctaButton.url.startsWith('/') ? ctaButton.url : undefined}
								href={!ctaButton.url.startsWith('/') ? ctaButton.url : undefined}
								target={ctaButton.target || '_self'}
								variant="primary"
								className="event-section-cta-button btn-primary py-3 px-4"
								style={{
									...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
									...(ctaButtonTextColour && { color: ctaButtonTextColour }),
								}}
							>
								{ctaButton.title}
							</Button>
						)}
					</Col>
				</Row>
			</Container>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default EventSection;
