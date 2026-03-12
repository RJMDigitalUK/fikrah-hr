import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";

const DiscoveryCallBooking = ({
	backgroundColour,
	headingTextColour,
	subheadingTextColour,
	descriptionTextColour,
	bulletPointsTextColour,
	heading,
	subheading,
	description,
	bulletPoints,
	iframe,
	redirectUrl,
	webhookUrl,
	customCss
}) => {
	const [cleanHtml, setCleanHtml] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!iframe || typeof window === 'undefined') return;

		try {
			const parser = new DOMParser();
			const doc = parser.parseFromString(iframe, 'text/html');

			// remove script tags and capture them to append safely
			const scripts = Array.from(doc.querySelectorAll('script'));
			scripts.forEach(s => s.remove());

			const cleaned = doc.body.innerHTML;
			setCleanHtml(cleaned);

			const externalScripts = scripts.map(s => ({ src: s.src, inline: s.src ? null : s.textContent }));

			// If there are external src scripts, track their load state and show a loading indicator
			const srcScripts = externalScripts.filter(s => s.src).map(s => s.src);
			if (srcScripts.length) {
				setIsLoading(true);
				setTimeout(() => {
					let loadedCount = 0;
					const markLoaded = () => {
						loadedCount += 1;
						if (loadedCount >= srcScripts.length) {
							setIsLoading(false);
						}
					};

					srcScripts.forEach(src => {
						if (!document.querySelector(`script[src="${src}"]`)) {
							const scr = document.createElement('script');
							scr.src = src;
							scr.async = true;
							scr.onload = markLoaded;
							scr.onerror = markLoaded;
							document.body.appendChild(scr);
						} else {
							// already on the page
							markLoaded();
						}
					});
					// Append inline scripts immediately (they don't affect loading count)
					externalScripts.filter(s => !s.src && s.inline).forEach(({ inline }) => {
						const scr = document.createElement('script');
						scr.type = 'text/javascript';
						scr.text = inline;
						document.body.appendChild(scr);
					});
				}, 50);
			} else {
				// No external scripts to wait for — consider loading complete
				// Append inline scripts immediately
				externalScripts.filter(s => !s.src && s.inline).forEach(({ inline }) => {
					const scr = document.createElement('script');
					scr.type = 'text/javascript';
					scr.text = inline;
					document.body.appendChild(scr);
				});
				setIsLoading(false);
			}
		} catch (err) {
			console.error('Failed to parse discovery iframe HTML:', err);
			setCleanHtml(iframe);
		}
	}, [iframe]);

	// Split bullet points into two columns for lg and up
	let leftBulletPoints = [];
	let rightBulletPoints = [];
	if (bulletPoints && bulletPoints.length) {
		const half = Math.ceil(bulletPoints.length / 2);
		leftBulletPoints = bulletPoints.slice(0, half);
		rightBulletPoints = bulletPoints.slice(half);
	}

		const renderBullet = (point, idx) => {
			const iconImage = getImage(point.icon?.localFile);
			const iconSrc = point.icon?.localFile?.publicURL || point.icon?.sourceUrl || point.icon?.publicURL || point.icon?.mediaItemUrl || null;
				return (
					<div key={idx} className="discoverycall-bullet-item bullet-point d-flex align-items-center mb-3">
						{iconImage ? (
							<GatsbyImage
								image={iconImage}
								alt={point.icon?.altText || "Bullet point icon"}
								className="discoverycall-bullet-icon bullet-point-icon me-3 align-self-center"
							/>
						) : iconSrc ? (
							<img
								src={iconSrc}
								alt={point.icon?.altText || 'Bullet point icon'}
								className="discoverycall-bullet-icon bullet-point-icon me-3 align-self-center"
								style={{ width: 32, height: 32, objectFit: 'contain' }}
								/>
						) : (
							<div className="discoverycall-bullet-icon bullet-point-icon me-3 align-self-center" style={{ width: 32, height: 32, background: 'rgba(0,0,0,0.03)', borderRadius: 6 }} />
						)}
						<p 
							className="discoverycall-bullet-text bullet-point-text mb-0 align-self-center"
							style={{ color: bulletPointsTextColour }}
						>
							{point.text}
						</p>
					</div>
				);
		};

	return (
		<section 
			className="discovery-call-booking-section py-7 py-xl-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row>
					<Col xs={12}>
						<div className="discoverycall-text-container justify-content-center px-xl-8">
							
							{heading && (
								<h2 className="discoverycall-heading text-center" style={{ color: headingTextColour }}>{heading}</h2>
							)}
                            {subheading && (
								<div className="discoverycall-subheading" style={{ color: subheadingTextColour }}>
									<SafeHtmlParser className="text-center pb-3" htmlContent={subheading} />
								</div>
							)}
							{description && (
								<div 
									className="discoverycall-description discovery-call-text"
									style={{ color: descriptionTextColour }}
								>
									<SafeHtmlParser className="text-center pb-3" htmlContent={description} />
								</div>
							)}

							{bulletPoints && bulletPoints.length > 0 && (
								<div className="discovery-call-bullet-points px-3 py-3">
									<Row>
										<Col md={6} className="pe-xl-3">
											{leftBulletPoints.map((point, i) => renderBullet(point, i))}
										</Col>
										<Col md={6}>
											{rightBulletPoints.map((point, i) => renderBullet(point, i + leftBulletPoints.length))}
										</Col>
									</Row>
								</div>
							)}
						</div>
					</Col>
					<Col xs={12}>
						{typeof window !== 'undefined' && cleanHtml ? (
							<div className="discovery-call-iframe position-relative">
								{isLoading && (
									<div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{background: 'rgba(255,255,255,0.7)', zIndex: 2}}>
										<Spinner animation="border" role="status">
											<span className="visually-hidden">Calendar loading...</span>
										</Spinner>
									</div>
								)}
								<SafeHtmlParser htmlContent={cleanHtml} />
							</div>
						) : (
							<div className="discovery-call-iframe-placeholder">
								{/* iframe not provided or not mounted yet */}
							</div>
						)}
					</Col>
				</Row>
			</Container>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default DiscoveryCallBooking;