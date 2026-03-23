import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const cardTotal = card?.length || 0;
	const prevCard = () => setActiveCardIndex(i => (i - 1 + cardTotal) % cardTotal);
	const nextCard = () => setActiveCardIndex(i => (i + 1) % cardTotal);

	return (
		<section className="cards-section py-5 py-lg-7">
			<Container className="cards-section-content-container">
				<Row className="justify-content-center text-center mb-0">
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
					<>
					{/* Mobile carousel — xs/sm only */}
					<div className="d-block d-md-none">
						{(() => {
							const item = card[activeCardIndex];
							const iconImage = getImage(item.icon?.localFile);
							const isSvg = item.icon?.mimeType === "image/svg+xml";
							const iconSrc = item.icon?.localFile?.publicURL || item.icon?.sourceUrl;
							return (
								<div className="px-3 pt-5">
									<div
										className="cards-section-card position-relative text-center px-4 pb-4 mx-auto"
										style={{
											border: item.outlineColour ? `2px solid ${item.outlineColour}` : undefined,
											borderRadius: "30px",
											backgroundColor: item.outlineColour ? `${item.outlineColour}1a` : undefined,
										}}
									>
										{item.icon && (
											<div className="cards-section-card-icon-container position-absolute top-0 start-50 translate-middle">
												{isSvg ? (
													<img src={iconSrc} alt={item.icon?.altText || "Card icon"} style={{ width: "64px", height: "64px", objectFit: "contain" }} />
												) : iconImage ? (
													<GatsbyImage image={iconImage} alt={item.icon?.altText || "Card icon"} style={{ width: "64px", height: "64px" }} />
												) : iconSrc ? (
													<img src={iconSrc} alt={item.icon?.altText || "Card icon"} style={{ width: "64px", height: "64px", objectFit: "contain" }} />
												) : null}
											</div>
										)}
										<div className="cards-section-card-body">
											{item.heading && (
												<h3 className="cards-section-card-heading mb-2" style={{ color: item.headingColour || "#292D65" }}>
													{item.heading}
												</h3>
											)}
											{item.description && (
												<div className="cards-section-card-description" style={{ color: item.descriptionColour || "#43454B" }}>
													<SafeHtmlParser htmlContent={item.description} />
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})()}
						<div className="d-flex justify-content-between align-items-center mt-5 px-2">
							<div className="d-flex gap-2">
								{card.map((_, i) => (
									<button
										key={i}
										className={`cards-carousel-dot${i === activeCardIndex ? " active" : ""}`}
										onClick={() => setActiveCardIndex(i)}
										aria-label={`Go to slide ${i + 1}`}
									/>
								))}
							</div>
							<div className="d-flex gap-2">
								<button className="cards-carousel-arrow" onClick={prevCard} aria-label="Previous">
									<FaChevronLeft size={14} />
								</button>
								<button className="cards-carousel-arrow" onClick={nextCard} aria-label="Next">
									<FaChevronRight size={14} />
								</button>
							</div>
						</div>
					</div>
					{/* Desktop grid — md+ */}
					<Row className="cards-section-cards g-4 pt-4 d-none d-md-flex">
						{card.map((item, index) => {
							const iconImage = getImage(item.icon?.localFile);
							const isSvg = item.icon?.mimeType === "image/svg+xml";
							const iconSrc = item.icon?.localFile?.publicURL || item.icon?.sourceUrl;

							return (
								<Col xs={12} sm={6} lg={4} key={index} className="mt-5">
									<div
										className="cards-section-card h-100 position-relative text-center px-4 pb-4"
										style={{
											border: item.outlineColour ? `2px solid ${item.outlineColour}` : undefined,
											borderRadius: "30px",
											"--card-hover-bg": item.outlineColour ? `${item.outlineColour}1a` : undefined,
										}}
									>
										{item.icon && (
											<div className="cards-section-card-icon-container position-absolute top-0 start-50 translate-middle">
												{isSvg ? (
													<img
														src={iconSrc}
														alt={item.icon?.altText || "Card icon"}
														className="cards-section-card-icon"
														style={{ width: "64px", height: "64px", objectFit: "contain" }}
													/>
												) : iconImage ? (
													<GatsbyImage
														image={iconImage}
														alt={item.icon?.altText || "Card icon"}
														className="cards-section-card-icon"
														style={{ width: "64px", height: "64px" }}
													/>
												) : iconSrc ? (
													<img
														src={iconSrc}
														alt={item.icon?.altText || "Card icon"}
														className="cards-section-card-icon"
														style={{ width: "64px", height: "64px", objectFit: "contain" }}
													/>
												) : null}
											</div>
										)}
										<div className="cards-section-card-body">
											{item.heading && (
												<h3
													className="cards-section-card-heading mb-2"
													style={{ color: item.headingColour || "#292D65" }}
												>
													{item.heading}
												</h3>
											)}
											{item.description && (
												<div
													className="cards-section-card-description"
													style={{ color: item.descriptionColour || "#43454B" }}
												>
													<SafeHtmlParser htmlContent={item.description} />
												</div>
											)}
										</div>
									</div>
								</Col>
							);
						})}
					</Row>
					</>
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
									className="cards-section-primary-cta-button btn-primary py-3 px-4 mb-3 mb-md-0"
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
									className="cards-section-secondary-cta-button p-0 text-decoration-none d-inline-flex align-items-center w-100 w-md-auto justify-content-center justify-content-md-start"
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
			<style>{`
				.cards-section-card {
					transition: background-color 0.3s ease;
				}
				.cards-section-card:hover {
					background-color: var(--card-hover-bg, transparent);
				}
				.cards-section-card-body {
					padding-top: 48px;
				}
				.cards-section-card-heading {
					font-family: 'AmplesoftPro', sans-serif;
					font-weight: 700;
					font-size: 22px;
				}
				@media (min-width: 768px) {
					.cards-section-card-heading {
						font-size: 24px;
					}
				}
				.cards-section-card-description,
				.cards-section-card-description p {
					color: #43454B;
				}
				.cards-carousel-dot {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					border: none;
					background-color: #7CB6E4;
					padding: 0;
					cursor: pointer;
				}
				.cards-carousel-dot.active {
					background-color: #E83166;
				}
				.cards-carousel-arrow {
					width: 48px;
					height: 48px;
					border-radius: 50%;
					background: #ffffff;
					border: 2px solid #292D65;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					padding: 0;
					color: #292D65;
				}
				.cards-carousel-arrow:hover {
					background: #292D65;
					color: #ffffff;
					border-color: #ffffff;
				}
				.cards-section-secondary-cta-button:hover {
					color: #E83166 !important;
				}
				.cards-section-secondary-cta-button:hover svg {
					fill: #E83166;
				}
			`}</style>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default CardsSection;
