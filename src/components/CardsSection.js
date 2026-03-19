import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";

const CardsSection = ({
	heading,
	description,
	card,
	primaryCtaButton,
	secondaryCta,
	headingColour,
	descriptionColour,
	primaryCtaButtonColour,
	primaryCtaTextColour,
	secondaryCtaTextColour,
	secondaryCtaChevronColour,
	customCss
}) => {
	return (
		<section className="cards-section py-5 py-lg-7">
			<Container className="cards-section-content-container">
				<Row className="justify-content-center text-center mb-5">
					<Col xs={12} lg={8}>
						{heading && (
							<h2
								className="cards-section-heading mb-3"
								style={{ color: headingColour }}
							>
								{heading}
							</h2>
						)}
						{description && (
							<div
								className="cards-section-description"
								style={{ color: descriptionColour }}
							>
								<SafeHtmlParser htmlContent={description} />
							</div>
						)}
					</Col>
				</Row>

				{card && card.length > 0 && (
					<Row className="cards-section-cards g-4">
						{card.map((item, index) => {
							const iconImage = getImage(item.icon?.localFile);
							const isSvg = item.icon?.mimeType === "image/svg+xml";
							const iconSrc = item.icon?.localFile?.publicURL || item.icon?.sourceUrl;

							return (
								<Col xs={12} sm={6} lg={4} key={index}>
									<div
										className="cards-section-card h-100 p-4"
										style={{
											border: item.outlineColour ? `2px solid ${item.outlineColour}` : undefined,
											"--card-hover-colour": item.hoverColour,
										}}
									>
										{item.icon && (
											<div className="cards-section-card-icon-container mb-3">
												{isSvg ? (
													<img
														src={iconSrc}
														alt={item.icon?.altText || "Card icon"}
														className="cards-section-card-icon"
														style={{ width: "56px", height: "56px", objectFit: "contain" }}
													/>
												) : iconImage ? (
													<GatsbyImage
														image={iconImage}
														alt={item.icon?.altText || "Card icon"}
														className="cards-section-card-icon"
														style={{ width: "56px", height: "56px" }}
													/>
												) : iconSrc ? (
													<img
														src={iconSrc}
														alt={item.icon?.altText || "Card icon"}
														className="cards-section-card-icon"
														style={{ width: "56px", height: "56px", objectFit: "contain" }}
													/>
												) : null}
											</div>
										)}
										{item.heading && (
											<h3
												className="cards-section-card-heading mb-2"
												style={{ color: item.headingColour }}
											>
												{item.heading}
											</h3>
										)}
										{item.description && (
											<div
												className="cards-section-card-description"
												style={{ color: item.descriptionColour }}
											>
												<SafeHtmlParser htmlContent={item.description} />
											</div>
										)}
									</div>
								</Col>
							);
						})}
					</Row>
				)}

				{(primaryCtaButton?.title || secondaryCta?.title) && (
					<Row className="mt-5">
						<Col xs={12} className="text-center d-flex align-items-center justify-content-center flex-wrap gap-3">
							{primaryCtaButton && primaryCtaButton.url && (
								<Button
									as={primaryCtaButton.url.startsWith('/') ? Link : 'a'}
									to={primaryCtaButton.url.startsWith('/') ? primaryCtaButton.url : undefined}
									href={!primaryCtaButton.url.startsWith('/') ? primaryCtaButton.url : undefined}
									target={primaryCtaButton.target || '_self'}
									variant="primary"
									className="cards-section-primary-cta-button btn-primary py-3 px-4"
									style={{
										...(primaryCtaButtonColour && { backgroundColor: primaryCtaButtonColour, borderColor: primaryCtaButtonColour }),
										...(primaryCtaTextColour && { color: primaryCtaTextColour }),
									}}
								>
									{primaryCtaButton.title}
								</Button>
							)}
							{secondaryCta && secondaryCta.url && (
								<Button
									as={secondaryCta.url.startsWith('/') ? Link : 'a'}
									to={secondaryCta.url.startsWith('/') ? secondaryCta.url : undefined}
									href={!secondaryCta.url.startsWith('/') ? secondaryCta.url : undefined}
									target={secondaryCta.target || '_self'}
									variant="btn-link"
									className="cards-section-secondary-cta-button p-0 text-decoration-none d-inline-flex align-items-center"
									style={{ color: secondaryCtaTextColour }}
								>
									{secondaryCta.title}
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

export default CardsSection;
