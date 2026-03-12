import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

const DynamicCtaStyles = () => {
	const data = useStaticQuery(graphql`
		query {
			themeSettings: wpComponent(slug: { eq: "theme-settings" }) {
				themeSettings {
				primaryCtaColour
				primaryCtaTextColour
				primaryCtaHoverColour
				primaryCtaHoverTextColour
				secondaryCtaColour
				secondaryCtaTextColour
				secondaryCtaHoverColour
				secondaryCtaHoverTextColour
				}
			}
		}
	`);

	const {
		primaryCtaColour,
		primaryCtaTextColour,
		primaryCtaHoverColour,
		primaryCtaHoverTextColour,
		secondaryCtaColour,
		secondaryCtaTextColour,
		secondaryCtaHoverColour,
		secondaryCtaHoverTextColour
	} = data?.themeSettings?.themeSettings || {};

	// Only inject styles if at least one CTA color is defined
	if (!primaryCtaColour && !secondaryCtaColour) {
		return null;
	}

	// CSS Variables
	const cssVariables = `
		:root {
			${primaryCtaColour ? `--primary-cta-colour: ${primaryCtaColour};` : ''}
			${primaryCtaTextColour ? `--primary-cta-text-colour: ${primaryCtaTextColour};` : ''}
			${primaryCtaHoverColour ? `--primary-cta-hover-colour: ${primaryCtaHoverColour};` : ''}
			${primaryCtaHoverTextColour ? `--primary-cta-hover-text-colour: ${primaryCtaHoverTextColour};` : ''}
			${secondaryCtaColour ? `--secondary-cta-colour: ${secondaryCtaColour};` : ''}
			${secondaryCtaTextColour ? `--secondary-cta-text-colour: ${secondaryCtaTextColour};` : ''}
			${secondaryCtaHoverColour ? `--secondary-cta-hover-colour: ${secondaryCtaHoverColour};` : ''}
			${secondaryCtaHoverTextColour ? `--secondary-cta-hover-text-colour: ${secondaryCtaHoverTextColour};` : ''}
		}
	`;

	// Bootstrap Button Overrides - Override .btn-primary and .btn-secondary
	const bootstrapOverrides = `
		${primaryCtaColour ? `
			.btn-primary {
				background-color: ${primaryCtaColour};
				border-color: ${primaryCtaColour};
				${primaryCtaTextColour ? `color: ${primaryCtaTextColour};` : ''}
			}
			
			.btn-primary:hover,
			.btn-primary:focus,
			.btn-primary:active {
				background-color: ${primaryCtaHoverColour};
				border-color: ${primaryCtaHoverTextColour};
				color: ${primaryCtaHoverTextColour};
		}

			.btn-primary:disabled,
			.btn-primary.disabled {
				background-color: ${primaryCtaColour};
				border-color: ${primaryCtaColour};
				opacity: 0.65;
			}
		` : ''}

		${secondaryCtaColour ? `
			.btn-secondary {
				background-color: ${secondaryCtaColour};
				border-color: ${secondaryCtaColour};
				${secondaryCtaTextColour ? `color: ${secondaryCtaTextColour};` : ''}
			}
			
			.btn-secondary:hover,
			.btn-secondary:focus,
			.btn-secondary:active {
				background-color: ${secondaryCtaHoverColour || secondaryCtaColour};
				border-color: ${secondaryCtaHoverColour || secondaryCtaColour};
				${secondaryCtaHoverTextColour || secondaryCtaTextColour ? `color: ${secondaryCtaHoverTextColour || secondaryCtaTextColour};` : ''}
			}

			.btn-secondary:disabled,
			.btn-secondary.disabled {
				background-color: ${secondaryCtaColour};
				border-color: ${secondaryCtaColour};
				opacity: 0.65;
			}
		` : ''}
	`;

	return (
 <Helmet>
			<style type="text/css">{`
				${cssVariables}
				${bootstrapOverrides} 
				
			`}</style>
		</Helmet>
	);
};

export default DynamicCtaStyles;
