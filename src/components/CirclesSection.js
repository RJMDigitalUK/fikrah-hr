import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";

const CirclesSection = ({
	subheading,
	heading,
	image,
	service,
	primaryCtaButton,
	secondaryCtaButton,
	backgroundColour,
	subheadingColour,
	headingColour,
	primaryCtaButtonColour,
	primaryCtaTextColour,
	secondaryCtaTextColour,
	secondaryCtaChevronColour,
	customCss
}) => {
	const sectionImage = getImage(image?.localFile);

	return (
		<section
			className="circles-section py-5 py-lg-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="circles-section-content-container">
				<Row className="justify-content-center text-center mb-5">
					<Col xs={12} lg={8}>
						{subheading && (
							<p
								className="circles-section-subheading mb-2"
								style={{ color: subheadingColour }}
							>
								{subheading}
							</p>
						)}
						{heading && (
							<h2
								className="circles-section-heading"
								style={{ color: headingColour }}
							>
								{heading}
							</h2>
						)}
					</Col>
				</Row>

				{sectionImage && (
					<Row className="justify-content-center mb-5">
						<Col xs={12} md={8} lg={6} className="text-center">
							<GatsbyImage
								image={sectionImage}
								alt={image?.altText || "Section image"}
								className="circles-section-image"
							/>
						</Col>
					</Row>
				)}

				{service && service.length > 0 && (
					<Row className="circles-section-services g-4 justify-content-center">
						{service.map((item, index) => {
							const iconImage = getImage(item.icon?.localFile);
							const iconHoverImage = getImage(item.iconHoverState?.localFile);
							const isSvg = item.icon?.mimeType === "image/svg+xml";
							const iconSrc = item.icon?.localFile?.publicURL || item.icon?.sourceUrl;

							return (
								<Col xs={12} sm={6} md={4} key={index}>
									<div
										className="circles-section-service-item text-center p-4 h-100"
										style={{ "--hover-colour": item.hoverColour }}
									>
										{item.icon && (
											<div className="circles-section-service-icon-container mb-3">
												{isSvg ? (
													<img
														src={iconSrc}
														alt={item.icon?.altText || "Service icon"}
														className="circles-section-service-icon"
														style={{ width: "64px", height: "64px" }}
													/>
												) : iconImage ? (
													<GatsbyImage
														image={iconImage}
														alt={item.icon?.altText || "Service icon"}
														className="circles-section-service-icon"
														style={{ width: "64px", height: "64px" }}
													/>
												) : iconSrc ? (
													<img
														src={iconSrc}
														alt={item.icon?.altText || "Service icon"}
														className="circles-section-service-icon"
														style={{ width: "64px", height: "64px", objectFit: "contain" }}
													/>
												) : null}
											</div>
										)}
										{item.heading && (
											<h3 className="circles-section-service-heading mb-2">
												{item.heading}
											</h3>
										)}
										{item.description && (
											<div className="circles-section-service-description">
												<SafeHtmlParser htmlContent={item.description} />
											</div>
										)}
									</div>
								</Col>
							);
						})}
					</Row>
				)}

				{(primaryCtaButton?.title || secondaryCtaButton?.title) && (
					<Row className="mt-5">
						<Col xs={12} className="text-center d-flex align-items-center justify-content-center flex-wrap gap-3">
							{primaryCtaButton && primaryCtaButton.url && (
								<Button
									as={primaryCtaButton.url.startsWith('/') ? Link : 'a'}
									to={primaryCtaButton.url.startsWith('/') ? primaryCtaButton.url : undefined}
									href={!primaryCtaButton.url.startsWith('/') ? primaryCtaButton.url : undefined}
									target={primaryCtaButton.target || '_self'}
									variant="primary"
									className="circles-section-primary-cta-button btn-primary py-3 px-4"
									style={{
										...(primaryCtaButtonColour && { backgroundColor: primaryCtaButtonColour, borderColor: primaryCtaButtonColour }),
										...(primaryCtaTextColour && { color: primaryCtaTextColour }),
									}}
								>
									{primaryCtaButton.title}
								</Button>
							)}
							{secondaryCtaButton && secondaryCtaButton.url && (
								<Button
									as={secondaryCtaButton.url.startsWith('/') ? Link : 'a'}
									to={secondaryCtaButton.url.startsWith('/') ? secondaryCtaButton.url : undefined}
									href={!secondaryCtaButton.url.startsWith('/') ? secondaryCtaButton.url : undefined}
									target={secondaryCtaButton.target || '_self'}
									variant="btn-link"
									className="circles-section-secondary-cta-button p-0 text-decoration-none d-inline-flex align-items-center"
									style={{ color: secondaryCtaTextColour }}
								>
									{secondaryCtaButton.title}
									<svg className="ms-1" width="16" height="16" viewBox="0 0 24 24" fill={secondaryCtaChevronColour || secondaryCtaTextColour}>
										<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
									</svg>
								</Button>
							)}
						</Col>
					</Row>
				)}
			</Container>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default CirclesSection;
