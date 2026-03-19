import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";

const EmotionalHookSection = ({
	backgroundImage,
	heading,
	subheadingAbove,
	subheading,
	description,
	ctaButton,
	headingColour,
	subheadingAboveColour,
	subheadingColour,
	descriptionColour,
	ctaButtonColour,
	ctaTextColour,
	customCss,
	backgroundColour
}) => {
	const bgImage = getImage(backgroundImage?.localFile);

	return (
		<section className="emotionalhook-section py-5 position-relative" style={{background: backgroundColour}}>
			{bgImage && (
				<GatsbyImage
					image={bgImage}
					alt={backgroundImage?.altText || "Background"}
					className="emotionalhook-background-image"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: 0,
					}}
					imgStyle={{ objectFit: 'cover' }}
				/>
			)}
			<Container className="emotionalhook-content-container position-relative" style={{ zIndex: 1 }}>
				<Row className="justify-content-center">
					<Col xs={12} lg={9}>
						<div className="emotionalhook-text-container mx-auto" style={{maxWidth: '1000px'}}>
							{subheadingAbove && (
								<p
									className="emotionalhook-subheading-above text-start mb-2"
									style={{ color: subheadingAboveColour }}
								>
									{subheadingAbove}
								</p>
							)}
							{heading && (
								<h2 
									className="emotionalhook-heading text-start mb-4"
									style={{ color: headingColour }}
								>
									{heading}
								</h2>
							)}
                            
                            {subheading && (
								<p 
									className="emotionalhook-subheading text-start" 
									style={{color: subheadingColour}}
								>
									{subheading}
								</p>
							)}
							
							{description && (
								<div 
									className="emotionalhook-description text-start lh-lg emotional-hook-text"
									style={{ color: descriptionColour }}
								>
									<SafeHtmlParser className="emotionalhook-description-html" htmlContent={description} style={{color: descriptionColour}} />
								</div>
							)}

							{ctaButton && ctaButton.url && (
								<div className="emotionalhook-cta-container text-center mt-4">
									<Button
										as={ctaButton.url.startsWith('/') ? Link : 'a'}
										to={ctaButton.url.startsWith('/') ? ctaButton.url : undefined}
										href={!ctaButton.url.startsWith('/') ? ctaButton.url : undefined}
										target={ctaButton.target || '_self'}
										variant="primary"
										className="emotionalhook-cta-button btn-primary py-3 px-4"
										style={{
											...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
											...(ctaTextColour && { color: ctaTextColour })
										}}
									>
										{ctaButton.title}
									</Button>
								</div>
							)}
						</div>
					</Col>
				</Row>
			</Container>
			
			<style>{`
				.emotional-hook-text .quote {
					display: block;
					font-style: italic;					
					margin: 2rem 0;
					padding: 0 1rem 0 2rem;
					position: relative;
					font-size: 1.65rem;					
					line-height: 1.3;
				}				
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default EmotionalHookSection;