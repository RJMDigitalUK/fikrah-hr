import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const WpGtmBody = () => {
  const data = useStaticQuery(graphql`
    query  {
     gtmBody: wpComponent(slug: { eq: "google-tag-manager" }) {
        googleTagManagerFields {
          bodyScript
          enableGtm
        }
      }
    }
  `);

  const fields = data?.gtmBody?.googleTagManagerFields;
  if (!fields?.enableGtm || !fields?.bodyScript) return null;

  // Render the exact HTML (e.g. the noscript iframe). This will render inside the
  // Gatsby root, not literally immediately after <body>.
  return <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: fields.bodyScript }} />;
};

export default WpGtmBody;