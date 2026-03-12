import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { navigate } from "gatsby";

const GuideBenefitsSection = ({
	backgroundColour,
	headingColour,
	subheadingColour,
	descriptionColour,
	benefitsTextColour,
	subheading,
	heading,
	description,
	redirectUrl,
	webhookUrl,
	cta,
	disclaimer,
	benefits,
	customCss,
	disclaimerTextColour,
	ctaButtonColour,
	ctaButtonTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour
}) => {
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
			className="guide-benefits-section py-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row>
					<Col xs={12} xl={6} className="mb-5 order-1">
						<div className="guidebenefits-text-container guide-benefits-header">
							{subheading && (
								<p className="guidebenefits-subheading" style={{color: subheadingColour}}>{subheading}</p>
							)}
							{heading && (
								<h2 className="guidebenefits-heading mb-5" style={{color: headingColour}}>{heading}</h2>
							)}
							{description && (
								<div className="guidebenefits-description">
									<SafeHtmlParser htmlContent={description} style={{color: descriptionColour}} />
								</div>
							)}
						</div>
                        <Form className="guide-benefits-form d-none d-xl-block" onSubmit={handleSubmit}>
							<Row>
								<Col xs={12}>
                            <Form.Group className="mb-3">
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
									
                                    	<Form.Group className="mb-3">
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
								<Button 
									type="submit" 
									disabled={isSubmitting}
									className="btn-primary guidebenefits-cta-button py-3 px-3 w-100"
									style={{color: ctaButtonTextColour, background: ctaButtonColour}}
								>
									{isSubmitting ? 'Submitting...' : cta.title}
								</Button>
							)}
                            {disclaimer && (
							<SafeHtmlParser className="guide-benefits-disclaimer text-center text-lg-start" htmlContent={disclaimer} style={{color: disclaimerTextColour}} />
						)}
						</Form>
					</Col>
				
				
			
					{/* Left: heading/text/form */}
					<Col xs={12} lg={6} className="mb-4 order-3 order-xl-2 d-xl-none">
						{/* keep header content above; render form here */}
						<Form className="guide-benefits-form" onSubmit={handleSubmit}>
							<Row>
								<Col xs={12}>
									<Form.Group className="mb-3">
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
									
                                    <Form.Group className="mb-3">
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
								<Button 
									type="submit" 
									disabled={isSubmitting}
									className="py-3 px-3 btn-primary guidebenefits-cta-button w-100"
									style={{
										...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
										...(ctaButtonTextColour && { color: ctaButtonTextColour })
									}}
								>
									{isSubmitting ? 'Submitting...' : cta.title}
								</Button>
							)}
						</Form>

						{disclaimer && (
							<SafeHtmlParser className="guide-benefits-disclaimer text-center text-lg-start mt-3" htmlContent={disclaimer} style={{color: disclaimerTextColour}} />
						)}
					</Col>

					{/* Right: benefits grid */}
					<Col xs={12} lg={6} className="guidebenefits-benefits-grid benefits-grid order-2 order-xl-3 ps-xl-3">
						{benefits && benefits.length > 0 && (
							<>
								{Array.from({ length: Math.ceil(benefits.length / 2) }).map((_, rowIndex) => {
									const start = rowIndex * 2;
									const pair = benefits.slice(start, start + 2);
									return (
										<Row key={rowIndex}>
											{pair.map((benefit, i) => {
												const idx = start + i;
												const localFile = benefit.icon?.localFile;
												const iconImage = localFile?.childImageSharp ? getImage(localFile) : null;
												const iconSrc = localFile?.publicURL || benefit.icon?.publicURL || benefit.icon?.sourceUrl || null;
												return (
													<Col xs={12} sm={6} key={idx} className="mb-4">
														<div className="guidebenefits-benefit-item d-flex flex-column flex-sm-row align-items-center align-items-sm-start text-center text-sm-start">
															{iconImage ? (
																<div className="me-sm-3 mb-2 mb-sm-0 d-flex align-items-center justify-content-center flex-shrink-0">
																	<GatsbyImage
																		image={iconImage}
																		alt={benefit.icon?.altText || "Benefit icon"}
																		className="benefit-icon"
																		style={{ width: 32, height: 32 }}
																		imgStyle={{ objectFit: 'contain' }}
																	/>
																</div>
															) : iconSrc ? (
																<div className="me-sm-3 mb-2 mb-sm-0 d-flex align-items-center justify-content-center flex-shrink-0">
																	<img
																		src={iconSrc}
																		alt={benefit.icon?.altText || 'Benefit icon'}
																		className="benefit-icon"
																		style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }}
																	/>
																</div>
															) : null}
															<div className="guidebenefits-benefit-text px-3">
																{benefit.text && (
																<div >															
																	<SafeHtmlParser className="py-3 py-md-0" htmlContent={benefit.text} style={{ color: benefitsTextColour }} />
																</div>
																)}
															</div>
														</div>
													</Col>
												);
											})}
										</Row>
									);
								})}
							</>
						)}
					</Col>
				</Row>
			</Container>
			<style>{`
				.guidebenefits-cta-button:hover {
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

export default GuideBenefitsSection;