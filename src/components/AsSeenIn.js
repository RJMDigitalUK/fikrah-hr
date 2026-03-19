import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { SafeHtmlParser } from "./SafeHtmlParser";

const AsSeenIn = ({
	subheading,
	heading,
	bodyText,
	logos,
	backgroundColour,
	subheadingColour,
	headingColour,
	bodyTextColour,
	customCss
}) => {
	return (
		<section
			className="as-seen-in-section py-5 py-lg-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="as-seen-in-content-container">
				<Row className="justify-content-center text-center mb-5">
					<Col xs={12} lg={8}>
						{subheading && (
							<p
								className="as-seen-in-subheading mb-2"
								style={{ color: subheadingColour }}
							>
								{subheading}
							</p>
						)}
						{heading && (
							<h2
								className="as-seen-in-heading mb-3"
								style={{ color: headingColour }}
							>
								{heading}
							</h2>
						)}
						{bodyText && (
							<div
								className="as-seen-in-body-text"
								style={{ color: bodyTextColour }}
							>
								<SafeHtmlParser htmlContent={bodyText} />
							</div>
						)}
					</Col>
				</Row>

				{logos && logos.length > 0 && (
					<Row className="as-seen-in-logos g-4 justify-content-center align-items-center">
						{logos.map((logoItem, index) => {
							const logoImage = getImage(logoItem.companyLogo?.localFile);
							const isSvg = logoItem.companyLogo?.mimeType === "image/svg+xml";
							const logoSrc = logoItem.companyLogo?.localFile?.publicURL || logoItem.companyLogo?.sourceUrl;
							const logoUrl = logoItem.companyUrl?.url;
							const logoAlt = logoItem.companyLogo?.altText || "Company logo";

							const logoElement = (
								<div className="as-seen-in-logo-wrapper d-flex justify-content-center align-items-center">
									{isSvg && logoSrc ? (
										<img
											src={logoSrc}
											alt={logoAlt}
											className="as-seen-in-logo"
											style={{ maxHeight: "60px", maxWidth: "160px", objectFit: "contain" }}
										/>
									) : logoImage ? (
										<GatsbyImage
											image={logoImage}
											alt={logoAlt}
											className="as-seen-in-logo"
											imgStyle={{ objectFit: "contain" }}
											style={{ maxHeight: "60px" }}
										/>
									) : logoSrc ? (
										<img
											src={logoSrc}
											alt={logoAlt}
											className="as-seen-in-logo"
											style={{ maxHeight: "60px", maxWidth: "160px", objectFit: "contain" }}
										/>
									) : null}
								</div>
							);

							return (
								<Col xs={6} sm={4} md={3} lg={2} key={index} className="text-center">
									{logoUrl ? (
										<a
											href={logoUrl}
											target={logoItem.companyUrl?.target || "_blank"}
											rel="noopener noreferrer"
											className="as-seen-in-logo-link d-block"
										>
											{logoElement}
										</a>
									) : (
										logoElement
									)}
								</Col>
							);
						})}
					</Row>
				)}
			</Container>
			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default AsSeenIn;
