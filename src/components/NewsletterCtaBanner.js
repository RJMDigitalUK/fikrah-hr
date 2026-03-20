import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";

const NewsletterCtaBanner = ({
	backgroundImage,
	heading,
	description,
	field1PlaceholderText,
	field2PlaceholderText,
	ctaButton,
	disclaimer,
	redirectUrl,
	webhookUrl,
	backgroundColour,
	headingTextColour,
	descriptionTextColour,
	disclaimerTextColour,
	ctaButtonColour,
	ctaTextColour,
	customCss
}) => {
	const [field1, setField1] = useState("");
	const [field2, setField2] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const isSvg = backgroundImage?.mimeType === "image/svg+xml";
	const bgImage = isSvg ? null : getImage(backgroundImage?.localFile);
	const svgUrl = isSvg ? (backgroundImage?.localFile?.publicURL || backgroundImage?.sourceUrl) : null;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!webhookUrl) return;
		setSubmitting(true);
		const payload = { field1 };
		if (field2PlaceholderText) payload.field2 = field2;
		try {
			await fetch(webhookUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (redirectUrl) {
				window.location.href = redirectUrl;
			}
		} catch (err) {
			console.error("Newsletter form submission error:", err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section
			className="newsletter-cta-banner-section py-7 position-relative"
			style={{ backgroundColor: backgroundColour }}
		>
			{bgImage && (
				<GatsbyImage
					image={bgImage}
					alt={backgroundImage?.altText || ""}
					className="position-absolute top-0 start-0 w-100 h-100"
					style={{ zIndex: 0 }}
					imgStyle={{ objectFit: "cover" }}
				/>
			)}
			{svgUrl && (
				<img
					src={svgUrl}
					alt={backgroundImage?.altText || ""}
					className="position-absolute top-0 start-0 w-100 h-100"
					style={{ objectFit: "cover", zIndex: 0 }}
				/>
			)}
			<Container className="position-relative" style={{ zIndex: 1 }}>
				<Row className="justify-content-center text-center">
					<Col xs={12} md={12}>
						<div className="">
							{heading && (
								<h2
									className="newsletter-cta-banner-heading"
									style={{ color: headingTextColour }}
								>
									{heading}
								</h2>
							)}
							<div className="pt-3">
								{description && (
									<p
										className="newsletter-cta-banner-description"
										style={{ color: descriptionTextColour }}
									>
										{description}
									</p>
								)}
								<Form className="newsletter-cta-banner-form py-3" onSubmit={handleSubmit}>
									<Row className="g-3 justify-content-center">
										{field1PlaceholderText && (
											<Col xs={12} md={4}>
												<Form.Control
													className="newsletter-cta-banner-field1"
													type="text"
													placeholder={field1PlaceholderText}
													value={field1}
													onChange={(e) => setField1(e.target.value)}
													required
												/>
											</Col>
										)}
										{field2PlaceholderText && (
											<Col xs={12} md={4}>
												<Form.Control
													className="newsletter-cta-banner-field2"
													type="email"
													placeholder={field2PlaceholderText}
													value={field2}
													onChange={(e) => setField2(e.target.value)}
													required
												/>
											</Col>
										)}
										{ctaButton && ctaButton.title && (
											<Col xs={12} md="auto">
												<Button
													type="submit"
													variant="primary"
													className="newsletter-cta-banner-cta-button btn-primary py-2 px-5 w-100"
													disabled={submitting}
													style={{
														...(ctaButtonColour && { backgroundColor: ctaButtonColour, borderColor: ctaButtonColour }),
														...(ctaTextColour && { color: ctaTextColour }),
													}}
												>
													{submitting ? "Submitting…" : ctaButton.title}
												</Button>
											</Col>
										)}
									</Row>
								</Form>
								{disclaimer && (
									<div
										className="newsletter-cta-banner-disclaimer mt-3 small"
										style={{ color: disclaimerTextColour }}
									>
										<SafeHtmlParser htmlContent={disclaimer} />
									</div>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
			<style>{`
				.newsletter-cta-banner-field1,
				.newsletter-cta-banner-field2 {
					background-color: #FFFFFFBF !important;
					border-radius: 100px !important;
					border: 1px solid #ffffff !important;
				}
			`}</style>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default NewsletterCtaBanner;
