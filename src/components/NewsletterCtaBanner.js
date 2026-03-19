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

	const bgImage = getImage(backgroundImage?.localFile);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!webhookUrl) return;
		setSubmitting(true);
		try {
			await fetch(webhookUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ field1, field2 }),
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
			className="newsletter-cta-banner-section py-5 position-relative"
			style={{ backgroundColor: backgroundColour }}
		>
			{bgImage && (
				<GatsbyImage
					image={bgImage}
					alt={backgroundImage?.altText || "Banner background"}
					className="newsletter-cta-banner-background-image"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: 0,
					}}
					imgStyle={{ objectFit: "cover" }}
				/>
			)}
			<Container className="newsletter-cta-banner-content-container position-relative" style={{ zIndex: 1 }}>
				<Row className="justify-content-center">
					<Col xs={12} lg={8} className="text-center">
						{heading && (
							<h2
								className="newsletter-cta-banner-heading mb-3"
								style={{ color: headingTextColour }}
							>
								{heading}
							</h2>
						)}
						{description && (
							<p
								className="newsletter-cta-banner-description mb-4"
								style={{ color: descriptionTextColour }}
							>
								{description}
							</p>
						)}

						<Form className="newsletter-cta-banner-form" onSubmit={handleSubmit}>
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
											className="newsletter-cta-banner-cta-button btn-primary py-2 px-4 w-100"
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
					</Col>
				</Row>
			</Container>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default NewsletterCtaBanner;
