// Header1.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";
import { FaArrowRightLong } from "react-icons/fa6";

const Header1 = ({ 
	backgroundImage, 
	heading, 
	description,
	cta,
	frameFullHeight,
	backgroundColour,
	headingTextColour,
	descriptionTextColour,
	customCss,
	ctaButtonColour,
	ctaButtonTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour
}) => {
	const renderImage = (img) => {
		if (!img) return null;

		const gatsbyImg = getImage(img.localFile?.childImageSharp);
		return (
			<GatsbyImage
				className="w-100"
				image={gatsbyImg}
				alt={img.altText || "Header background"}
			/>
		);
	};

	return (
		<section
			className={`header1-section position-relative d-flex flex-column ${frameFullHeight ? 'vh-50' : ''}`}
			style={{
				background: backgroundColour,
				minHeight: frameFullHeight ? '50vh' : '35vh'
			}}
		>
			{backgroundImage && (() => {
				const isSvg = backgroundImage.mimeType === "image/svg+xml" || backgroundImage.localFile?.extension === 'svg';
				const bgImage = getImage(backgroundImage.localFile?.childImageSharp);
				const svgUrl = backgroundImage.localFile?.publicURL || backgroundImage.sourceUrl;

				return (
					<div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
						{isSvg ? (
							<img
								src={svgUrl}
								alt={backgroundImage?.altText || "Header background"}
								className="w-100 h-100"
								style={{ objectFit: 'cover' }}
							/>
						) : bgImage ? (
							<GatsbyImage
								className="w-100 h-100"
								image={bgImage}
								alt={backgroundImage?.altText || "Header background"}
								style={{ objectFit: 'cover' }}
							/>
						) : null}
					</div>
				);
			})()}
			
			<Container className="header1-content-container flex-fill d-flex align-items-center justify-content-center" style={{ zIndex: 2 }}>
				<Row className="w-100">
					<Col xs={12} className="text-center">
						<div className="header1-text-container">
							{heading && (
								<h1 className="header1-heading" style={{ color: headingTextColour }}>
									{heading}
								</h1>
							)}
							{description && (
								<p 
									className="header1-description mt-3 "
									style={{ color: descriptionTextColour }}
								>
									{description}
								</p>
							)}
							{cta && cta.url && (
								<Button 
									as={cta.url.startsWith('/') ? Link : 'a'}
									to={cta.url.startsWith('/') ? cta.url : undefined}
									href={!cta.url.startsWith('/') ? cta.url : undefined}
									target={cta.target || '_self'}
									variant="primary"
								className="header1-cta-button btn-primary py-3 px-3 mt-3"
								size="lg"
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
				</Row>
			</Container>
			<style>{`
				.header1-cta-button:hover {
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

export default Header1;
