import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";

const CtaBanner = ({
	backgroundImage,
	backgroundColour,
	headingTextColour,
	descriptionTextColour,
	heading,
	description,
	secondaryCta,
	primaryCta,
	customCss,
	primaryCtaButtonColour,
	primaryCtaButtonTextColour,
	primaryCtaButtonHoverColour,
	primaryCtaButtonTextHoverColour,
	secondaryCtaButtonColour,
	secondaryCtaButtonTextColour,
	secondaryCtaButtonHoverColour,
	secondaryCtaButtonTextHoverColour
}) => {
	const isSvg = backgroundImage?.mimeType === "image/svg+xml";
	const bgImage = isSvg ? null : getImage(backgroundImage?.localFile);
	const svgUrl = isSvg ? (backgroundImage?.localFile?.publicURL || backgroundImage?.sourceUrl) : null;

	return (
		<section 
			className="cta-banner-section py-7 position-relative"
			style={{ backgroundColor: backgroundColour }}
		>
			{bgImage && (
				<GatsbyImage
					image={bgImage}
					alt={backgroundImage?.altText || ""}
					className="position-absolute top-0 start-0 w-100 h-100"
					style={{ zIndex: 0 }}
					imgStyle={{ objectFit: "cover" }}
				/>
			)}
			{svgUrl && (
				<img
					src={svgUrl}
					alt={backgroundImage?.altText || ""}
					className="position-absolute top-0 start-0 w-100 h-100"
					style={{ objectFit: "cover", zIndex: 0 }}
				/>
			)}
			<Container className="position-relative" style={{ zIndex: 1 }}>
				<Row className="justify-content-center text-center">
					<Col xs={12} md={12} style={{ maxWidth: '800px' }}>
						<div className="">
							{heading && (
								<h2 className="cta-banner-heading" style={{color: headingTextColour}}>{heading}</h2>
							)}
							{description && (
								<div className="pt-3">
									<p 
										className="cta-banner-description"
										style={{ color: descriptionTextColour }}
									>
										{description}
									</p>
									
									<div className="cta-banner-buttons py-3">
											{primaryCta && primaryCta.title && (
											<Button 
												as={primaryCta.url?.startsWith('/') ? Link : 'a'}
												to={primaryCta.url?.startsWith('/') ? primaryCta.url : undefined}
												href={primaryCta.url?.startsWith('/') ? undefined : primaryCta.url}
												target={primaryCta.target || (primaryCta.url?.startsWith('/') ? undefined : '_blank')}
								className="ctabanner-primary-cta btn-primary py-3 px-3 w-100 w-md-auto me-3 mb-3 mb-md-0"
												style={{color: primaryCtaButtonTextColour, background: primaryCtaButtonColour, borderColor: primaryCtaButtonColour}}
											>
												{primaryCta.title}
											</Button>
										)}
									
										{secondaryCta && secondaryCta.title && (
											<Button 
												as={secondaryCta.url?.startsWith('/') ? Link : 'a'}
												to={secondaryCta.url?.startsWith('/') ? secondaryCta.url : undefined}
												href={secondaryCta.url?.startsWith('/') ? undefined : secondaryCta.url}
												target={secondaryCta.target || (secondaryCta.url?.startsWith('/') ? undefined : '_blank')}
									className="ctabanner-secondary-cta cta-secondary px-3 py-3  w-100 w-md-auto"
												style={{color: secondaryCtaButtonTextColour, background: secondaryCtaButtonColour, borderColor: secondaryCtaButtonColour}}
											>
												{secondaryCta.title}
											</Button>
										)}
									
									</div>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</Container>
			<style>{`
			
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default CtaBanner;