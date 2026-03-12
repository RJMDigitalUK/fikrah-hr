import React, { useState, useEffect } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";


// Component to handle SVG vs image rendering
const SocialIcon = ({ sourceUrl, altText }) => {
	return (
		<img
			src={sourceUrl}
			alt={altText || "social icon"}
			style={{ width: "20px", height: "20px" }}
		/>
	);
};

const Footer = () => {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	// 1) Fetch data from WP
	const data = useStaticQuery(graphql`
		query {
			wpComponent(slug: { eq: "footer" }) {
				footerFields {
					backgroundColour
					textColour
					textHoverColour
					ctaButtonColour
					ctaButtonTextColour
					ctaButtonHoverColour
					ctaButtonTextHoverColour
					customCss
					copyrightText
					newsletterText
					newsletterCta {
						title
						url
						target
					}
					webhookUrl
					newsletterDisclaimerText
					pageLinks {
						link {
							title
							url
						}
					}
					leadMagnetLinks {
						link {
							title
							url
						}
					}
					socialLinks {
						url
						icon {
							altText
							sourceUrl
						}
					}
				}
			}
		}
	`);

	// 2) Extract the needed fields
	const footerFields = data?.wpComponent?.footerFields;
	if (!footerFields) return null;

	const { 
		backgroundColour, 
		textColour, 
		textHoverColour,
		ctaButtonColour,
		ctaButtonTextColour,
		ctaButtonHoverColour,
		ctaButtonTextHoverColour,
		customCss,
		pageLinks, 
		leadMagnetLinks, 
		socialLinks, 
		copyrightText,
		newsletterText,
		newsletterCta,
		webhookUrl,
		newsletterDisclaimerText
	} = footerFields;

	const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!email || !webhookUrl) return;

        setIsSubmitting(true);
        try {
            const res = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                const bodyText = await res.text();
                throw new Error(`Webhook responded ${res.status}: ${bodyText}`);
            }
            // success — clear the field (optionally show a message)
            setEmail('');
        } catch (error) {
            console.error('Newsletter submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

	return (
		<footer
			style={{
				backgroundColor: backgroundColour,
				color: textColour,
			}}
		>
			<Container className="py-5 px-4">
				{/* Social Icons Row (top) */}
				{socialLinks && socialLinks.length > 0 && (
					<Row className="justify-content-center mb-5">
						<Col xs={12} className="text-center">
							<ul className="list-inline mb-0">
								{socialLinks.map((item, index) => (
									<li key={index} className="list-inline-item mx-4 social-icons">
										<a
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											style={{ textDecoration: "none" }}
										>
											<div className="">
												<SocialIcon 
													sourceUrl={item.icon?.sourceUrl}
													altText={item.icon?.altText}
													
												/>
											</div>
										</a>
									</li>
								))}
							</ul>
						</Col>
					</Row>
				)}

				{/* Two-column Row: left=lead magnet + page links, right=newsletter */}
				<Row className="justify-content-between align-items-start align-items-md-center justify-content-md-center text-md-center mb-4">
					{/* Left column: split into two nested columns for lead magnet and page links */}
					<Col xs={12} xl={6} className="mb-3">
						<Row>
							{/* Lead Magnet Links (nested col) */}
							<Col xs={6} md={12} className="mb-3">
								{leadMagnetLinks && leadMagnetLinks.length > 0 && (
									<>
										<ul className="list-unstyled d-md-flex flex-md-row flex-md-wrap align-items-center justify-content-md-center">
											{leadMagnetLinks.map((item, idx) => (
												<li key={idx} className="mb-2 mb-md-0 me-md-4">
													<Link
														to={item.link.url}
														className="leadmagnet-link-footer"
														style={{ color: textColour }}
													>
														{item.link.title}
														</Link>
													</li>
												))}
											</ul>
									</>
								)}
							</Col>

							{/* Page Links (nested col) */}
							<Col xs={6} md={12} className="mb-5 ">
								{pageLinks && pageLinks.length > 0 && (
									<>
										<ul className="list-unstyled list-unstyled d-md-flex flex-md-row flex-md-wrap align-items-center justify-content-md-center">
											{pageLinks.map((item, idx) => (
												<li key={idx} className="mb-2 mb-md-0 me-md-4 pb-xl-4">
													<Link
														to={item.link.url || "/"}
														className="page-link-footer"
														style={{ color: textColour}}
													>
														{item.link.title}
														</Link>
													</li>
											))}
										</ul>
									</>
								)}
							</Col>
						</Row>
					</Col>
					<hr id="footer-hr" style={{ borderColor: textColour || "#FFFFFF", height: "2px" }} className="d-lg-none" />

					{/* Right column: Newsletter text + form + optional CTA */}
					<Col xs={12} xl={6} className="mb-3 footer-page-links ps-2 ps-xl-5" style={{ ['--footer-border-color']: textColour || '#FFFFFF' }}>
						{newsletterText && (
							<>
								<p className="text-center text-xl-start newsletter-text" style={{color: textColour}}>{newsletterText}</p>
								<Form onSubmit={handleNewsletterSubmit} className="mb-3">
									<Row className="g-2 align-items-center">
										<Col xs={12} sm={8}>
											<Form.Control
												type="email"
												placeholder="Email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
												className="w-100 py-3 px-3 footer-email-input"
												style={{ borderRadius: 0 }}
											/>
										</Col>
										<Col xs={12} sm={4} className="d-grid">
											<Button 
												type="submit" 
												variant="secondary-light"
												disabled={isSubmitting}
											className="footer-cta-button py-3"
											style={{
												backgroundColor: ctaButtonColour,
												borderColor: ctaButtonColour,
												color: ctaButtonTextColour
											}}
											>
												{isSubmitting ? 'Submitting...' : (newsletterCta?.title || 'Subscribe')}
											</Button>
										</Col>
									</Row>
								</Form>
								{newsletterDisclaimerText && (
									<small className="d-block text-center text-xl-start">
										<SafeHtmlParser htmlContent={newsletterDisclaimerText} className="text-decoration-none newsletter-disclaimer-text" style={{color: textColour}} />
									</small>
								)}
								
							</>
						)}
					</Col>
				</Row>

				{/* Copyright Row */}
				<Row>
					<Col xs={12} className="text-center">
						<small style={{ color: textColour }}>
							{copyrightText}
						</small>
					</Col>
				</Row>
			</Container>

			{/* Inline CSS for footer styling */}
			<style>{`
		.footer-cta-button:hover {
			background-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
			border-color: ${ctaButtonHoverColour || 'var(--primary-cta-hover-colour)'} !important;
			color: ${ctaButtonTextHoverColour || 'var(--primary-cta-hover-text-colour)'} !important;
		}
		
		.newsletter-disclaimer-text a:hover,
		.page-link-footer:hover,
		.leadmagnet-link-footer:hover {
			color: ${textHoverColour || textColour} !important;
		}

			.icon-container:hover {
				border-color: #FFFFFF;
			}

			@media (min-width: 1200px) {
				.footer-page-links { border-left: 1px solid var(--footer-border-color); padding-left: 1.25rem; }
			}		
				
				
      `}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</footer>
	);
};

export default Footer;
