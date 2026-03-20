import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
	const [activeIndex, setActiveIndex] = useState(0);
	const total = service?.length || 0;
	const prev = () => setActiveIndex(i => (i - 1 + total) % total);
	const next = () => setActiveIndex(i => (i + 1) % total);

	return (
		<section
			className="circles-section py-5 py-lg-7 px-md-0"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container fluid className="circles-section-content-container px-md-0">
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

				{service && service.length > 0 && (
					<>
						{/* Mobile carousel — xs/sm only */}
						<div className="d-block d-md-none">
							{(() => {
								const item = service[activeIndex];
								const iconHoverImage = getImage(item.iconHoverState?.localFile);
								const iconHoverSrc = item.iconHoverState?.localFile?.publicURL || item.iconHoverState?.sourceUrl;
								const iconDefaultImage = getImage(item.icon?.localFile);
								const iconDefaultSrc = item.icon?.localFile?.publicURL || item.icon?.sourceUrl;
								const displayImage = iconHoverImage || iconDefaultImage;
								const displaySrc = !displayImage ? (iconHoverSrc || iconDefaultSrc) : null;
								const displayAlt = item.iconHoverState?.altText || item.icon?.altText || "Service icon";

								return (
									<div
										className="circles-section-mobile-card mx-auto"
										style={{ backgroundColor: item.hoverColour }}
									>
										{(displayImage || displaySrc) && (
											<div className="circles-section-service-icon-container mb-2">
												{displayImage ? (
													<GatsbyImage
														image={displayImage}
														alt={displayAlt}
														className="circles-section-service-icon"
														style={{ width: "56px", height: "56px" }}
													/>
												) : (
													<img
														src={displaySrc}
														alt={displayAlt}
														className="circles-section-service-icon"
														style={{ width: "56px", height: "56px", objectFit: "contain" }}
													/>
												)}
											</div>
										)}
										{item.heading && (
											<h3 className="circles-section-service-heading mb-2">{item.heading}</h3>
										)}
										{item.description && (
											<div className="circles-section-service-description">
												<SafeHtmlParser htmlContent={item.description} />
											</div>
										)}
									</div>
								);
							})()}

							{/* Controls: dots bottom-left, arrows bottom-right */}
							<div className="d-flex justify-content-between align-items-center mt-3 px-2">
								<div className="d-flex gap-2">
									{service.map((_, i) => (
										<button
											key={i}
											className={`circles-carousel-dot${i === activeIndex ? " active" : ""}`}
											onClick={() => setActiveIndex(i)}
											aria-label={`Go to slide ${i + 1}`}
										/>
									))}
								</div>
								<div className="d-flex gap-2">
									<button className="circles-carousel-arrow" onClick={prev} aria-label="Previous">
										<FaChevronLeft size={14} />
									</button>
									<button className="circles-carousel-arrow" onClick={next} aria-label="Next">
										<FaChevronRight size={14} />
									</button>
								</div>
							</div>
						</div>

					{/* md/lg peek carousel */}
					<div className="d-none d-md-block d-xl-none">
						<div className="circles-peek-wrapper">
							<div className="circles-peek-track">
								{[-1, 0, 1].map((offset) => {
									const idx = (activeIndex + offset + total) % total;
									const item = service[idx];
									const isActive = offset === 0;
									const iconHoverImage = getImage(item.iconHoverState?.localFile);
									const iconHoverSrc = item.iconHoverState?.localFile?.publicURL || item.iconHoverState?.sourceUrl;
									const iconDefaultImage = getImage(item.icon?.localFile);
									const iconDefaultSrc = item.icon?.localFile?.publicURL || item.icon?.sourceUrl;
									const displayImage = isActive ? (iconHoverImage || iconDefaultImage) : iconDefaultImage;
									const displaySrc = !displayImage ? (isActive ? (iconHoverSrc || iconDefaultSrc) : iconDefaultSrc) : null;
									const displayAlt = (isActive ? item.iconHoverState?.altText : null) || item.icon?.altText || "Service icon";

									return (
										<div
											key={offset}
											className={`circles-peek-item${isActive ? " active" : ""}`}
											style={isActive ? { backgroundColor: item.hoverColour } : {}}
											onClick={() => { if (!isActive) setActiveIndex(idx); }}
										>
											{(displayImage || displaySrc) && (
												<div className="circles-section-service-icon-container mb-2">
													{displayImage ? (
														<GatsbyImage
															image={displayImage}
															alt={displayAlt}
															className="circles-section-service-icon"
															style={{ width: "56px", height: "56px" }}
														/>
													) : (
														<img
															src={displaySrc}
															alt={displayAlt}
															className="circles-section-service-icon"
															style={{ width: "56px", height: "56px", objectFit: "contain" }}
														/>
													)}
												</div>
											)}
											{item.heading && (
												<h3 className="circles-section-service-heading mb-2">{item.heading}</h3>
											)}
											{item.description && (
												<div className="circles-section-service-description">
													<SafeHtmlParser htmlContent={item.description} />
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>
						<div className="position-relative d-flex justify-content-center align-items-center mt-3 mt-md-5 px-2">
							<div className="d-flex gap-2">
								{service.map((_, i) => (
									<button
										key={i}
										className={`circles-carousel-dot${i === activeIndex ? " active" : ""}`}
										onClick={() => setActiveIndex(i)}
										aria-label={`Go to slide ${i + 1}`}
									/>
								))}
							</div>
							<div className="d-flex gap-2 position-absolute end-0 me-2">
								<button className="circles-carousel-arrow" onClick={prev} aria-label="Previous">
									<FaChevronLeft size={14} />
								</button>
								<button className="circles-carousel-arrow" onClick={next} aria-label="Next">
									<FaChevronRight size={14} />
								</button>
							</div>
						</div>
					</div>

					{/* Desktop orbit layout — xl+ */}
					<div className="circles-desktop-grid">
						{service.map((item, index) => {
							const iconDefaultImage = getImage(item.icon?.localFile);
							const iconDefaultSrc = item.icon?.localFile?.publicURL || item.icon?.sourceUrl;
							const iconHoverImage = getImage(item.iconHoverState?.localFile);
							const iconHoverSrc = item.iconHoverState?.localFile?.publicURL || item.iconHoverState?.sourceUrl;
							const hasHoverIcon = !!(iconHoverImage || iconHoverSrc);

							return (
								<div
									key={index}
									className={`circles-desktop-item circles-desktop-pos-${index}${hasHoverIcon ? " has-hover-icon" : ""}`}
									style={{ "--hover-colour": item.hoverColour }}
								>
									{(iconDefaultImage || iconDefaultSrc) && (
										<div className="circles-desktop-icon icon-default mb-2">
											{iconDefaultImage ? (
												<GatsbyImage
													image={iconDefaultImage}
													alt={item.icon?.altText || "Service icon"}
													style={{ width: "56px", height: "56px" }}
												/>
											) : (
												<img
													src={iconDefaultSrc}
													alt={item.icon?.altText || "Service icon"}
													style={{ width: "56px", height: "56px", objectFit: "contain" }}
												/>
											)}
										</div>
									)}
									{hasHoverIcon && (
										<div className="circles-desktop-icon icon-hover mb-2">
											{iconHoverImage ? (
												<GatsbyImage
													image={iconHoverImage}
													alt={item.iconHoverState?.altText || "Service icon"}
													style={{ width: "56px", height: "56px" }}
												/>
											) : (
												<img
													src={iconHoverSrc}
													alt={item.iconHoverState?.altText || "Service icon"}
													style={{ width: "56px", height: "56px", objectFit: "contain" }}
												/>
											)}
										</div>
									)}
									{item.heading && (
										<h3 className="circles-section-service-heading mb-2">{item.heading}</h3>
									)}
									{item.description && (
										<div className="circles-section-service-description">
											<SafeHtmlParser htmlContent={item.description} />
										</div>
									)}
								</div>
							);
						})}
						{sectionImage && (
							<div className="circles-desktop-center">
								<GatsbyImage
									image={sectionImage}
									alt={image?.altText || "Section image"}
									style={{ width: "100%", height: "100%" }}
									imgStyle={{ objectFit: "cover" }}
								/>
							</div>
						)}
					</div>
					</>
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
			<style>{`
				.circles-section-service-heading,
				.circles-section-service-description,
				.circles-section-service-description p {
					color: #292D65;
				}
				.circles-section-mobile-card {
					width: min(340px, 90vw);
					height: min(340px, 90vw);
					border-radius: 50%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 40px;
					text-align: center;
					overflow: hidden;
				}
				@media (max-width: 767px) {
					.circles-section-mobile-card .circles-section-service-heading {
						font-size: 22px !important;
					}
					.circles-section-mobile-card .circles-section-service-description,
					.circles-section-mobile-card .circles-section-service-description p {
						font-size: 16px !important;
					}
				}
				.circles-peek-wrapper {
					overflow: hidden;
				}
				.circles-peek-track {
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 2vw;
				}
				.circles-peek-item {
					flex: 0 0 auto;
					border-radius: 50%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 40px;
					text-align: center;
					overflow: hidden;
					cursor: pointer;
					border: 2px solid rgba(255, 255, 255, 0.3);
				}
				.circles-peek-item.active {
					border: none;
					cursor: default;
				}
				.circles-peek-item:not(.active) .circles-section-service-heading,
				.circles-peek-item:not(.active) .circles-section-service-description,
				.circles-peek-item:not(.active) .circles-section-service-description p {
					color: white;
				}
				@media (min-width: 768px) and (max-width: 1199px) {
					.circles-peek-item {
						width: 48vw;
						height: 48vw;
					}
				}
				.circles-carousel-dot {
					width: 10px;
					height: 10px;
					border-radius: 50%;
					border: none;
					background-color: #7CB6E4;
					padding: 0;
					cursor: pointer;
				}
				.circles-carousel-dot.active {
					background-color: #E83166;
				}
				.circles-carousel-arrow {
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
				.circles-carousel-arrow:hover {
					background: #292D65;
					color: #ffffff;
                    border-color: #ffffff;
				}
				/* Desktop orbit grid — xl+ */
				.circles-desktop-grid {
					display: none;
				}
				@media (min-width: 1200px) {
					.circles-desktop-grid {
						display: grid;
						grid-template-columns: min(260px, 19vw) min(260px, 19vw) min(300px, 22vw) min(260px, 19vw) min(260px, 19vw);
						grid-auto-rows: min(180px, 13vw);
						align-items: center;
						justify-items: center;
						width: fit-content;
						margin: 0 auto;
					}
				}
				.circles-desktop-pos-0 { grid-column: 2; grid-row: 1; }
				.circles-desktop-pos-1 { grid-column: 4; grid-row: 1; }
				.circles-desktop-pos-2 { grid-column: 1; grid-row: 2; }
				.circles-desktop-pos-3 { grid-column: 5; grid-row: 2; }
				.circles-desktop-pos-4 { grid-column: 2; grid-row: 3; }
				.circles-desktop-pos-5 { grid-column: 4; grid-row: 3; }
				.circles-desktop-center {
					grid-column: 3;
					grid-row: 2;
					width: min(300px, 22vw);
					height: min(300px, 22vw);
					border-radius: 50%;
					overflow: hidden;
				}
				.circles-desktop-item {
					width: min(260px, 19vw);
					height: min(260px, 19vw);
					border-radius: 50%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 28px;
					text-align: center;
					overflow: hidden;
					border: 2px solid rgba(255, 255, 255, 0.3);
					transition: background-color 0.3s ease, border-color 0.3s ease;
				}
				.circles-desktop-item:hover {
					background-color: var(--hover-colour);
					border-color: transparent;
				}
				.circles-desktop-item .circles-section-service-heading {
					color: white;
					font-size: 15px;
					line-height: 1.3;
				}
				.circles-desktop-item .circles-section-service-description,
				.circles-desktop-item .circles-section-service-description p {
					color: white;
					font-size: 12px;
					line-height: 1.4;
				}
				.circles-desktop-icon {
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.circles-desktop-icon.icon-hover {
					display: none;
				}
				.circles-desktop-item.has-hover-icon:hover .icon-default {
					display: none;
				}
				.circles-desktop-item.has-hover-icon:hover .icon-hover {
					display: flex;
				}
			`}</style>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default CirclesSection;
