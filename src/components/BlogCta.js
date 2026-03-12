import React from "react";
import { Form, Button } from "react-bootstrap";
import { SafeHtmlParser } from "../components/SafeHtmlParser"; // Adjust path if needed
import {Link} from "gatsby";

/**
 * BlogCta
 *
 * Displays:
 * - A heading (via SafeHtmlParser)
 * - A body text (via SafeHtmlParser)
 * - A single input field (Website URL)
 * - A "Continue" button
 * Uses Formspree to handle submission.
 */
const BlogCta = ({ 
	heading, 
	body, 
	primaryCta, 
	secondaryCta,
	backgroundColour,
	headingColour,
	bodyTextColour,
	primaryCtaColour,
	primaryCtaTextColour,
	primaryCtaHoverColour,
	primaryCtaTextHoverColour,
	secondaryCtaColour,
	secondaryCtaTextColour,
	secondaryCtaHoverColour,
	secondaryCtaTextHoverColour,
	customCss
}) => {

	return (
		<div className="mt-0">
			<div
				className="w-100"
				style={{
					borderRadius: "12px",
					backgroundColor: backgroundColour || "#fff",
					padding: "1.5rem",
					boxShadow: "0px 1px 13.4px 0px rgba(55, 73, 166, 0.06)",
				}}
			>
				{/* Heading */}
				{heading && (
					<h3 
						className="text-center pt-xl-3"
						style={headingColour ? { color: headingColour } : {}}
					>
						{heading}
					</h3>
				)}

				{/* Body */}
				{body && (
					<p style={{ 
						marginBottom: "1.25rem",
						...(bodyTextColour && { color: bodyTextColour })
					}}>
						{body}
					</p>
				)}

			
				<Button
					as={Link}
					variant="secondary"
					to={secondaryCta?.url}
					className="blogcta-secondary-cta secondary-cta w-100 mb-3 px-3 py-3"
					style={{
						...(secondaryCtaColour && { backgroundColor: secondaryCtaColour, borderColor: secondaryCtaColour }),
						...(secondaryCtaTextColour && { color: secondaryCtaTextColour })
					}}
				>
					{secondaryCta?.title}
				</Button>
				<Button
					as={Link}
					to={primaryCta?.url}
					variant="primary"
					className="blogcta-primary-cta primary-cta w-100 btn-primary px-3 py-3 mb-3"
					style={{
						...(primaryCtaColour && { backgroundColor: primaryCtaColour, borderColor: primaryCtaColour }),
						...(primaryCtaTextColour && { color: primaryCtaTextColour })
					}}
				>
					{primaryCta?.title}
				</Button>
			</div>
			<style>{`
				.blogcta-primary-cta:hover {
					background-color: ${primaryCtaHoverColour || 'var(--primary-cta-hover-colour)'} !important;
					border-color: ${primaryCtaHoverColour || 'var(--primary-cta-hover-colour)'} !important;
					color: ${primaryCtaTextHoverColour || 'var(--primary-cta-hover-text-colour)'} !important;
				}
				.blogcta-secondary-cta:hover {
					background-color: ${secondaryCtaHoverColour || 'var(--secondary-cta-hover-colour)'} !important;
					border-color: ${secondaryCtaHoverColour || 'var(--secondary-cta-hover-colour)'} !important;
					color: ${secondaryCtaTextHoverColour || 'var(--secondary-cta-hover-text-colour)'} !important;
				}
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</div>
	);
};

export default BlogCta;
