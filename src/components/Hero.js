import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { SafeHtmlParser } from "./SafeHtmlParser";

const Hero = ({ 
	backgroundImage, 
	subheading, 
	heading, 
	body, 
	cta, 
	backgroundColour,
	headingTextColour,
	subheadingTextColour,
	bodyTextColour,
	textAlignment,
	ctaButtonColour,
	ctaButtonTextColour,
	css
}) => {
	const videoRef = useRef(null);
	const [posterUrl, setPosterUrl] = useState(null);
	
	// Map textAlignment to Bootstrap classes
	const getTextAlignmentClass = () => {
		const alignment = textAlignment;
		const alignmentMap = {
			'Left': 'text-start',
			'Centre': 'text-center',
			'Center': 'text-center',
			'Right': 'text-end'
		};
		return alignmentMap[alignment];
	};
	
	const getRowJustifyClass = () => {
		const alignment = textAlignment;
		const justifyMap = {
			'Left': 'justify-content-start',
			'Centre': 'justify-content-center',
			'Center': 'justify-content-center',
			'Right': 'justify-content-end'
		};
		return justifyMap[alignment];
	};
	
	// Determine media type based on mimeType
	const isVideo = backgroundImage?.mimeType?.startsWith('video/');
	const isImage = backgroundImage?.mimeType?.startsWith('image/') || !backgroundImage?.mimeType;
	
	// Get image data for images
	const pluginImage = isImage ? getImage(backgroundImage?.localFile) : null;
	
	// Get video URL for videos
	const videoUrl = isVideo ? (
		backgroundImage?.localFile?.publicURL || 
		backgroundImage?.sourceUrl
	) : null;
	
	// Extract first frame from video for poster
	useEffect(() => {
		if (isVideo && videoRef.current && !posterUrl) {
			const video = videoRef.current;
			
			const extractPoster = () => {
				try {
					const canvas = document.createElement('canvas');
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
					const ctx = canvas.getContext('2d');
					ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
					const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
					setPosterUrl(dataUrl);
				} catch (error) {
					console.warn('Failed to extract video poster:', error);
				}
			};
			
			// Try to extract poster when metadata is loaded
			if (video.readyState >= 2) {
				extractPoster();
			} else {
				video.addEventListener('loadeddata', extractPoster, { once: true });
			}
		}
	}, [isVideo, posterUrl]);

	return (
		<section 
			className="hero-section d-flex align-items-center position-relative"
			style={{ backgroundColor: backgroundColour }}
		>
			{/* Background Video */}
			{isVideo && videoUrl && (
				<video
					ref={videoRef}
					autoPlay
					loop
					muted
					playsInline
					poster={posterUrl}
					className="hero-background-video"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						zIndex: -1,
					}}
				>
					<source src={videoUrl} type={backgroundImage.mimeType} />
				</video>
			)}
			
			{/* Background Image */}
			{isImage && pluginImage && (
				<GatsbyImage
					image={pluginImage}
					alt={backgroundImage?.altText || "Background"}
					className="hero-background-image"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						zIndex: -1,
					}}
					imgStyle={{
						objectFit: 'cover',
					}}
				/>
			)}
			
			{/* Fallback for images without childImageSharp (legacy support) */}
			{isImage && !pluginImage && backgroundImage?.sourceUrl && (
				<div
					className="hero-background-fallback"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundImage: `url(${backgroundImage.sourceUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						zIndex: -1,
					}}
				/>
			)}
			
			{/* Content Layer */}
			<Container className="h-100 position-relative" style={{ zIndex: 1 }}>
				<Row className={getRowJustifyClass()}>
					<Col 
						xs={12} 
						md={8} 
						lg={5}
					>
						<div className={`hero-content-container ${getTextAlignmentClass()}`}>
							{subheading && (
								<p 
									className="hero-subheading"
									style={{ color: subheadingTextColour }}
								>
									{subheading}
								</p>
							)}
							{heading && (
								<h1 
									className="hero-heading"
									style={{ color: headingTextColour }}
								>
									{heading}
								</h1>
							)}
							{body && (
								<div 
									className="hero-body py-3"
									style={{ color: bodyTextColour }}
								>
									<SafeHtmlParser htmlContent={body} />
								</div>
							)}
							{cta && cta.title && (
								<Button 
									href={cta.url}
									target={cta.target || "_self"}
									variant="primary"
									size="lg"
									className="hero-cta-button btn-primary py-3"
									style={{
										backgroundColor: ctaButtonColour,
										color: ctaButtonTextColour,
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
			.hero-section {
					position: relative;
					min-height: 80vh;
				}
				
				.hero-section::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 0;
				}
				
				
				
				.hero-background-video {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					object-fit: cover;
					z-index: -1;
				}
				
				.hero-background-image {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: -1;
				}
				
				.hero-content {
					position: relative;
					z-index: 2;
				}
				
				.hero-subheading {
					margin-bottom: 1rem;
				}
				
				.hero-body {
					margin-bottom: 1.5rem;
				}
				
				.hero-cta {
					padding: 0.75rem 1.5rem;
				}
				
				@media (max-width: 767.98px) {
					.hero-section {
						min-height: 55vh;
					}

						min-height: 80vh;
					}
				}
			`}</style>

			{css && (
				<style>{`${css}`}</style>
			)}
		</section>
	);
};

export default Hero;
