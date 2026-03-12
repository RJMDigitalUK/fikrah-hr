import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

const GlobalCustomCss = () => {
  const data = useStaticQuery(graphql`
    query {
      themeSettings: wpComponent(slug: { eq: "theme-settings" }) {
        themeSettings {
          globalCustomCss
        }
      }
    }
  `);

  const globalCustomCss = data?.themeSettings?.themeSettings?.globalCustomCss;

  // If no custom CSS, return null
  if (!globalCustomCss) return null;

  return (
    <Helmet>
      <style>{globalCustomCss}</style>
    </Helmet>
  );
};

export default GlobalCustomCss;
