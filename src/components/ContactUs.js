import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";

const ContactUs = ({
	backgroundColour,
	headingColour,
	subheadingColour,
	descriptionTextColour,
	contactMethodsHeadingColour,
	contactMethodsTextColour,
	image,
	subheading,
	heading,
	description,
	contactMethods,
	cta,
	iframe,
	customCss,
	ctaTextColour
}) => {
	const contactImage = getImage(image?.localFile);

	return (
		<section 
			className="contact-us-section py-5"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row className="align-items-center">
					<Col xs={12} xl={6}>
						{contactImage && (
							<GatsbyImage
								image={contactImage}
								alt={image?.altText || "Contact us"}
								className="contact-us-image w-100"
								imgStyle={{ objectFit: 'contain' }}
							/>
						)}
					</Col>
					<Col xs={12} xl={6}>
						<div className="contactus-text-container ps-md-4">
							{subheading && (
								<p className="contact-us-subheading mb-2" style={{ color: subheadingColour }}>{subheading}</p>
							)}
							{heading && (
								<h2 className="contact-us-heading mb-4" style={{ color: headingColour }}>
									{heading}
								</h2>
							)}
							{description && (
							<SafeHtmlParser 
								className="contact-us-description mb-4"
								htmlContent={description}
								style={{ color: descriptionTextColour }}
							/>
							)}
							
							{contactMethods && contactMethods.length > 0 && (
								<Row className="contactus-contact-methods-container mb-4 g-3">
									{contactMethods.map((method, index) => {
										const methodIcon = getImage(method.icon?.localFile);
										// possible URL locations from WP/Gatsby
										const iconSrc = method.icon?.localFile?.publicURL || method.icon?.publicUrl || method.icon?.publicURL || method.icon?.sourceUrl || method.icon?.mediaItemUrl || null;

										return (
											<Col key={index} xs={12} md={6}>
												<div className="contactus-contact-method d-flex align-items-start">
													<div className="contactus-contact-method-icon-container flex-shrink-0 me-3">
														<div className="d-flex align-items-center justify-content-center" 
															style={{width: 50, height: 50}}>
															{methodIcon ? (
																<GatsbyImage
																	image={methodIcon}
																	alt={method.icon?.altText || "Contact method icon"}
																	style={{width: 32, height: 32}}
																/>
															) : iconSrc ? (
																<img
																	src={iconSrc}
																	alt={method.icon?.altText || 'Contact method icon'}
																	style={{width: 32, height: 32, objectFit: 'contain'}}
																/>
															) : (
																/* fallback: small placeholder circle */
																<div style={{width: 32, height: 32, borderRadius: 6, background: 'rgba(0,0,0,0.05)'}} />
															)}
														</div>
													</div>
													<div className="contactus-contact-method-content flex-grow-1">
														{method.heading && (
															<h5 className="contactus-contact-method-heading mb-1" style={{ color: contactMethodsHeadingColour }}>{method.heading}</h5>
														)}
														{method.text && (
															<div className="contactus-contact-method-text small" style={{ color: contactMethodsTextColour }}>
																<SafeHtmlParser  htmlContent={method.text} />
															</div>
														)}
													</div>
												</div>
											</Col>
										);
									})}
								</Row>
							)}
							
							{cta && cta.title && (
								<div className="contact-us-cta mt-4 d-flex justify-content-center">
									<Button 
										as={Link}
										to={cta.url}
                                        variant="btn-link"
										target={cta.target || "_self"}
										className="p-0 text-decoration-none d-flex align-items-center"
										style={{color: ctaTextColour}}
										
									>
										{cta.title}
										<svg 
											className="ms-2" 
											width="16" 
											height="16" 
											viewBox="0 0 24 24" 
											fill="currentColor"
											color={ctaTextColour}
										>
											<path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
										</svg>
									</Button>
								</div>
							)}
							{iframe && (
								<div
									className="contact-us-iframe-container mt-4"
									dangerouslySetInnerHTML={{ __html: iframe }}
								/>
							)}
						</div>
					</Col>
				</Row>
			</Container>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default ContactUs;