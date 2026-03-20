import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { navigate } from "gatsby";

const GuideDownloadSection = ({
	backgroundColour,
	headingTextColour,
	descriptionTextColour,
	bulletPointsTextColour,
	heading,
	description,
	bulletPoints,
	redirectUrl,
	webhookUrl,
	cta,
	disclaimer,
	image,
	disclaimerTextColour,
	ctaButtonColour,
	ctaButtonTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour,
	customCss
}) => {
	const guideImage = getImage(image?.localFile);
	const [formData, setFormData] = useState({ name: '', email: '' });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (!webhookUrl) {
			console.error('No webhook URL provided');
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch(webhookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: formData.name,
					email: formData.email
				})
			});

			if (response.ok) {
				if (redirectUrl) {
					if (redirectUrl.startsWith('/')) {
						navigate(redirectUrl);
					} else {
						window.location.href = redirectUrl;
					}
				}
			} else {
				console.error('Form submission failed:', response.statusText);
				alert('There was an error submitting the form. Please try again.');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('There was an error submitting the form. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section 
			className="guidedownload-section py-5"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="guidedownload-content-container">
				<Row className="align-items-center">
					<Col xs={12} lg={6} xl={7} className="order-2 order-lg-1">
						<div className="guidedownload-text-container pe-md-4">
							{heading && (
								<h2 className="guidedownload-heading mb-4 text-center text-lg-start" style={{color: headingTextColour}}>
									{heading}
								</h2>
							)}
							{description && (
						<div 
							className="mb-4 pe-xl-3"
							style={{ color: descriptionTextColour }}
						>
							<SafeHtmlParser htmlContent={description} style={{color: descriptionTextColour}} />
								</div>
							)}
							
							{bulletPoints && bulletPoints.length > 0 && (
								<div className="guidedownload-bullet-points-container mb-4 pe-md-4">
									{bulletPoints.map((point, index) => {
										// prefer a processed Gatsby image (childImageSharp), otherwise use raw file URL (SVGs)
										const localFile = point.icon?.localFile;
										const iconImage = localFile?.childImageSharp ? getImage(localFile) : null;
										const mime = point.icon?.mimeType || '';
										const isSvg = mime === 'image/svg+xml' || (localFile?.extension === 'svg');
										const rawUrl = localFile?.publicURL || point.icon?.publicURL || point.icon?.sourceUrl;

										// choose display source: GatsbyImage when available, otherwise raw URL (works for SVG)
										const imgSrc = iconImage ? null : rawUrl;

										return (
											<div key={index} className="guidedownload-bullet-item d-flex align-items-start mb-3">
												{(iconImage || imgSrc) && (
													<div className="guidedownload-bullet-icon-container flex-shrink-0 me-3">
														<div
															className="d-flex align-items-center justify-content-center"
															style={{ width: '12px', height: '12px' }}
														>
															{iconImage ? (
																<GatsbyImage
																	image={iconImage}
																	alt={point.icon?.altText || 'Bullet point icon'}
																	style={{ width: 12, height: 12 }}
																	imgStyle={{ objectFit: 'contain' }}
																/>
															) : imgSrc ? (
																<img
																	src={imgSrc}
																	alt={point.icon?.altText || 'Bullet point icon'}
																	style={{ width: 12, height: 12, objectFit: 'contain', display: 'block' }}
																/>
															) : null}
														</div>
													</div>
												)}
													<div className="guidedownload-bullet-content flex-grow-1">
													<p 
														className="guidedownload-bullet-text mb-0"
													style={{ color: bulletPointsTextColour }}
												>
													{point.text}
												</p>
												</div>
											</div>
										);
									})}
								</div>
							)}
							
						<Form className="guidedownload-form mb-4" onSubmit={handleSubmit}>
							<Row className="g-3">
								<Col xs={12}>
									<Form.Group>
										<Form.Control
											type="text"
											name="name"
											placeholder="Name"
											required
											value={formData.name}
											onChange={handleInputChange}
											className="py-3 border-2"
											style={{borderColor: '#e9ecef'}}
										/>
									</Form.Group>
								</Col>
								<Col xs={12}>
									<Form.Group>
										<Form.Control
											type="email"
											name="email"
											placeholder="Email"
											required
											value={formData.email}
											onChange={handleInputChange}
											className="py-3 border-2"
											style={{borderColor: '#e9ecef'}}
										/>
									</Form.Group>
								</Col>
							</Row>
							{cta && cta.title && (
								<div className="mt-4">
									<Button 
										type="submit" 
										disabled={isSubmitting}
										className="btn-primary guidedownload-cta-button w-100 px-3 py-3"
										style={{color: ctaButtonTextColour, background: ctaButtonColour}}
										
									>
										{isSubmitting ? 'Submitting...' : cta.title}
										</Button>
									</div>
								)}
							</Form>

							{disclaimer && (
								<div className="text-muted small text-center mt-3 mb-0">
									<SafeHtmlParser className="" htmlContent={disclaimer} style={{color: disclaimerTextColour}} />
								</div>
							)}
						</div>
					</Col>
					<Col xs={12} lg={6} xl={5} className="d-flex justify-content-center align-items-center align-items-xl-start justify-content-xl-start order-1 order-lg-2 pb-5">
						{guideImage && (
							<GatsbyImage
								image={guideImage}
								alt={image?.altText || "Guide preview"}
								style={{background: 'transparent'}}
								className="guidedownload-image h-100"
							/>
						)}
					</Col>
				</Row>
			</Container>
			<style>{`
				.guidedownload-cta-button:hover {
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

export default GuideDownloadSection;