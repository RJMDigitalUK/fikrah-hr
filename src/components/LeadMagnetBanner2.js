import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";

const LeadMagnetBanner2 = ({
	backgroundColour,
	headingTextColour,
	heading,
	description,
	cta,
	redirectUrl,
	webhookUrl,
	field1PlaceholderText,
	field2PlaceholderText,
	disclaimer,
	descriptionTextColour,
	customCss,
	disclaimerTextColour,
	ctaButtonColour,
	ctaButtonTextColour,
	ctaButtonHoverColour,
	ctaButtonTextHoverColour
}) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !email || !webhookUrl) return;

		setIsSubmitting(true);
		try {
			const res = await fetch(webhookUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					[field1PlaceholderText || "Name"]: name, 
					[field2PlaceholderText || "Email"]: email 
				}),
			});
			if (!res.ok) {
				const bodyText = await res.text();
				throw new Error(`Webhook responded ${res.status}: ${bodyText}`);
			}
			// success — clear fields and optionally redirect
			setName('');
			setEmail('');
			if (redirectUrl) {
				window.open(redirectUrl, '_blank');
			}
		} catch (error) {
			console.error('Form submission error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section 
			className="leadmagnet2-section py-5"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="leadmagnet2-content-container">
				<Row className="justify-content-center align-items-lg-center min-vh-50">
					<Col xs={12} md={10} lg={6} className="">
						<div className="leadmagnet2-text-container text-center">
							{heading && (
								<h2 className="leadmagnet2-heading mb-4" style={{color: headingTextColour}}>
									{heading}
								</h2>
							)}
							{description && (
								<div className="leadmagnet2-description mb-4  px-md-7">
									<SafeHtmlParser className="leadmagnet2-description-html" style={{color: descriptionTextColour}} htmlContent={description} />
								</div>
							)}
                            </div>
						</Col>	
                        <Col xs={12} md={10} lg={6}>
                        	<Form className="leadmagnet2-form pb-4" onSubmit={handleSubmit}>
								<Row className="g-3 justify-content-center align-items-end">
									<Col xs={12} xl={6}>
										<Form.Control
											type="text"
											placeholder={field1PlaceholderText || "Name"}
											required
											className="text-center py-3"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</Col>
									<Col xs={12} xl={6}>
										<Form.Control
											type="email"
											placeholder={field2PlaceholderText || "Email"}
											required
											className="text-center py-3"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Col>
									<Col xs={12}>
										{cta && cta.title && (
											<Button 
												type="submit" 
											className="w-100 btn-primary leadmagnet2-cta-button py-3 px-3"
												disabled={isSubmitting}	
												style={{color: ctaButtonTextColour, background: ctaButtonColour}}											
											>
												{isSubmitting ? 'Submitting...' : (cta?.title || 'Submit')}
											</Button>
										)}
									</Col>
								</Row>
							</Form>

							{disclaimer && (
								<div className="text-center">
									<small>
										<SafeHtmlParser className="" htmlContent={disclaimer} style={{color: disclaimerTextColour}} />
									</small>
								</div>
							)}
						
					</Col>
				</Row>
			</Container>
			<style>{`
				.leadmagnet2-cta-button:hover {
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

export default LeadMagnetBanner2;