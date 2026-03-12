import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const GoogleReview = ({
	backgroundColour,
	headingTextColour,
	heading,
	iframe,
	customCss
}) => {
	const iframeRef = useRef(null);

	useEffect(() => {
		const container = iframeRef.current;
		if (!container) return;

		// clear previous content
		container.innerHTML = "";

		if (!iframe) return;

		// Parse the incoming HTML string
		const parser = new DOMParser();
		const doc = parser.parseFromString(iframe, "text/html");

		// Append non-script nodes (iframe element etc.)
		Array.from(doc.body.childNodes).forEach((node) => {
			if (node.nodeName.toLowerCase() === "script") return;
			container.appendChild(document.importNode(node, true));
		});

		// Handle scripts separately so they execute
		const scripts = Array.from(doc.querySelectorAll("script"));
		const appendedScripts = [];

		scripts.forEach((oldScript) => {
			const newScript = document.createElement("script");

			// copy attributes like src, type, async, defer
			for (let i = 0; i < oldScript.attributes.length; i++) {
				const attr = oldScript.attributes[i];
				newScript.setAttribute(attr.name, attr.value);
			}

			// inline script content
			if (oldScript.textContent) {
				newScript.text = oldScript.textContent;
			}

			// append to body so external scripts load/execute
			document.body.appendChild(newScript);
			appendedScripts.push(newScript);
		});

		// cleanup on unmount or iframe change
		return () => {
			appendedScripts.forEach((s) => {
				if (s.parentNode) s.parentNode.removeChild(s);
			});
			if (container) container.innerHTML = "";
		};
	}, [iframe]);

	return (
		<section 
			className="google-review-section py-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={8} lg={6} className="text-center">
						<div className="googlereview-text-container google-review-content">
							{heading && (
							<h2 
								className="googlereview-heading mb-4"
								style={{ color: headingTextColour }}
							>
								{heading}
							</h2>
							)}
						</div>
							
					</Col>
				</Row>

				{/* iframe / widget container */}
				<Row className="justify-content-center">
					<Col>
						<div
							ref={iframeRef}
							className="google-review-iframe"
							aria-hidden={!iframe}
						/>
					</Col>
				</Row>

			</Container>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default GoogleReview;