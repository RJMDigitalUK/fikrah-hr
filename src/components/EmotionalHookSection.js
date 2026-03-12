import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";

const EmotionalHookSection = ({
	heading,
	subheading,
	description,
	headingColour,
	subheadingColour,
	descriptionColour,
	customCss,
	backgroundColour
}) => {
	return (
		<section className="emotionalhook-section py-5" style={{background: backgroundColour}}>
			<Container className="emotionalhook-content-container">
				<Row className="justify-content-center">
					<Col xs={12} lg={8}>
						<div className="emotionalhook-text-container mx-auto" style={{maxWidth: '800px'}}>
							{heading && (
								<h2 
									className="emotionalhook-heading text-center mb-4"
									style={{ color: headingColour }}
								>
									{heading}
								</h2>
							)}
                            
                            {subheading && (
								<p 
									className="emotionalhook-subheading text-center" 
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