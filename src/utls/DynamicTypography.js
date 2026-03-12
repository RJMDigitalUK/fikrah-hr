import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

const DynamicTypography = () => {
  const data = useStaticQuery(graphql`
    query {
      themeSettings: wpComponent(slug: { eq: "theme-settings" }) {
        themeSettings {
          fontProvider
          googleFontsUrl
          adobeFontsUrl
          customFontUrl
          primaryFontFamily
          headingFontFamily
          fontWeights
          bodyFontSize
          lineHeight
          letterSpacing
          headingTextColour
          subheadingTextColour
          bodyTextColour
        }
      }
    }
  `);

  const settings = data?.themeSettings?.themeSettings;
  
  // If no settings, return null
  if (!settings) return null;

  const {
    fontProvider = "google",
    googleFontsUrl,
    adobeFontsUrl,
    customFontUrl,
    primaryFontFamily = "Comfortaa",
    headingFontFamily,
    bodyFontSize = 16,
    lineHeight = 1.5,
    letterSpacing = 0,
    headingTextColour = "#000000",
    subheadingTextColour = "#000000",
    bodyTextColour = "#000000",
  } = settings;

  // Determine which font URL to use based on provider
  let fontUrl = null;
  if (fontProvider === "google" && googleFontsUrl) {
    // Auto-append &display=swap if not present
    fontUrl = googleFontsUrl.includes("display=")
      ? googleFontsUrl
      : `${googleFontsUrl}${googleFontsUrl.includes("?") ? "&" : "?"}display=swap`;
  } else if (fontProvider === "adobe" && adobeFontsUrl) {
    fontUrl = adobeFontsUrl;
  } else if (fontProvider === "custom" && customFontUrl) {
    fontUrl = customFontUrl;
  }

  // Build CSS variables
  const systemFontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const primaryFont = primaryFontFamily ? `'${primaryFontFamily}', ${systemFontStack}` : systemFontStack;
  const headingFont = headingFontFamily ? `'${headingFontFamily}', ${systemFontStack}` : primaryFont;

  const cssVariables = `
    :root {
      --font-primary: ${primaryFont};
      --font-heading: ${headingFont};
      --body-font-size: ${bodyFontSize}px;
      --line-height: ${lineHeight};
      --letter-spacing: ${letterSpacing}px;
      --heading-text-colour: ${headingTextColour};
      --subheading-text-colour: ${subheadingTextColour};
      --body-text-colour: ${bodyTextColour};
    }
  `;

  return (
    <Helmet>
      {fontUrl && <link rel="stylesheet" href={fontUrl} />}
      <style>{cssVariables}</style>
    </Helmet>
  );
};

export default DynamicTypography;
