import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";

const CtaBanner = ({
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
	return (
		<section 
			className="cta-banner-section py-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row className="justify-content-center text-center">
					<Col xs={12} md={12}>
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
									
									<div className="cta-banner-buttons py-5">
											{primaryCta && primaryCta.title && (
											<Button 
								className="ctabanner-primary-cta btn-primary py-3 px-3 w-100 w-md-auto me-3 mb-3 mb-md-0"
												style={{color: primaryCtaButtonTextColour, background: primaryCtaButtonColour}}
											>
												{primaryCta.title}
											</Button>
										)}
									
										{secondaryCta && secondaryCta.title && (
											<Button 
									className="ctabanner-secondary-cta cta-secondary px-3 py-3  w-100 w-md-auto"
												style={{color: secondaryCtaButtonTextColour, background: secondaryCtaButtonColour}}
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
				.ctabanner-primary-cta:hover {
					background-color: ${primaryCtaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
					color: ${primaryCtaButtonTextHoverColour || 'var(--primary-cta-hover-text-colour)'} !important;
				}
				.ctabanner-secondary-cta:hover {
					background-color: ${secondaryCtaButtonHoverColour || 'var(--secondary-cta-hover-colour)'} !important;
					color: ${secondaryCtaButtonTextHoverColour || 'var(--secondary-cta-hover-text-colour)'} !important;
					
				}
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default CtaBanner;