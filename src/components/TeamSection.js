import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { Link } from "gatsby";

const TeamSection = ({
	heading,
	description,
	teamMember,
	headingBelow,
	descriptionBelow,
	ctaButton,
	backgroundColour,
	headingColour,
	descriptionColour,
	headingBelowColour,
	descriptionBelowColour,
	ctaButtonColour,
	ctaTextColour,
	customCss
}) => {
	return (
		<section
			className="team-section py-5 py-lg-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="team-section-content-container">
				{(heading || description) && (
					<Row className="justify-content-center text-center mb-5">
						<Col xs={12} lg={8}>
							{heading && (
								<h2
									className="team-section-heading mb-3"
									style={{ color: headingColour }}
								>
									{heading}
								</h2>
							)}
							{description && (
								<div
									className="team-section-description"
									style={{ color: descriptionColour }}
								>
									<SafeHtmlParser htmlContent={description} />
								</div>
							)}
						</Col>
					</Row>
				)}

				{teamMember && teamMember.length > 0 && (
					<Row className="team-section-members g-4">
						{teamMember.map((member, index) => {
							const memberImage = getImage(member.image?.localFile);

							return (
								<Col xs={12} sm={6} lg={4} key={index}>
									<div className="team-section-member h-100 text-center">
										{memberImage && (
											<div className="team-section-member-image-container mb-3">
												<GatsbyImage
													image={memberImage}
													alt={member.image?.altText || member.name || "Team member"}
													className="team-section-member-image"
												/>
											</div>
										)}
										{member.name && (
											<h3
												className="team-section-member-name mb-1"
												style={{ color: member.nameTextColour }}
											>
												{member.name}
											</h3>
										)}
										{member.role && (
											<p
												className="team-section-member-role mb-2"
												style={{ color: member.roleTextColour }}
											>
												{member.role}
											</p>
										)}
										{member.bio && (
											<div
												className="team-section-member-bio mb-3"
												style={{ color: member.bioTextColour }}
											>
												<SafeHtmlParser htmlContent={member.bio} />
											</div>
										)}
										{member.socials && member.socials.length > 0 && (
											<div className="team-section-member-socials d-flex justify-content-center gap-2">
												{member.socials.map((social, sIdx) => {
													const socialIconImage = getImage(social.socialsIcon?.localFile);
													const socialIconSrc = social.socialsIcon?.localFile?.publicURL || social.socialsIcon?.sourceUrl;
													const socialUrl = social.socialsIconLink?.url;

													return socialUrl ? (
														<a
															key={sIdx}
															href={socialUrl}
															target={social.socialsIconLink?.target || "_blank"}
															rel="noopener noreferrer"
															className="team-section-member-social-link"
														>
															{socialIconImage ? (
																<GatsbyImage
																	image={socialIconImage}
																	alt={social.socialsIcon?.altText || "Social icon"}
																	className="team-section-member-social-icon"
																	style={{ width: "24px", height: "24px" }}
																/>
															) : socialIconSrc ? (
																<img
																	src={socialIconSrc}
																	alt={social.socialsIcon?.altText || "Social icon"}
																	className="team-section-member-social-icon"
																	style={{ width: "24px", height: "24px", objectFit: "contain" }}
																/>
															) : null}
														</a>
													) : null;
												})}
											</div>
										)}
									</div>
								</Col>
							);
						})}
					</Row>
				)}

				{(headingBelow || descriptionBelow || ctaButton?.title) && (
					<Row className="justify-content-center text-center mt-5">
						<Col xs={12} lg={8}>
							{headingBelow && (
								<h2
									className="team-section-heading-below mb-3"
									style={{ color: headingBelowColour }}
								>
									{headingBelow}
								</h2>
							)}
							{descriptionBelow && (
								<div
									className="team-section-description-below mb-4"
									style={{ color: descriptionBelowColour }}
								>
									<SafeHtmlParser htmlContent={descriptionBelow} />
								</div>
							)}
							{ctaButton && ctaButton.url && (
								<Button
									as={ctaButton.url.startsWith('/') ? Link : 'a'}
									to={ctaButton.url.startsWith('/') ? ctaButton.url : undefined}
									href={!ctaButton.url.startsWith('/') ? ctaButton.url : undefined}
									target={ctaButton.target || '_self'}
									variant="primary"
									className="team-section-cta-button btn-primary py-3 px-4"
									style={{
										...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
										...(ctaTextColour && { color: ctaTextColour }),
									}}
								>
									{ctaButton.title}
								</Button>
							)}
						</Col>
					</Row>
				)}
			</Container>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default TeamSection;
