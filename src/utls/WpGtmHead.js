import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

const stripScriptTag = (html = "") => {
  const m = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
  return m ? m[1] : html;
};

const WpGtmHead = () => {
  const data = useStaticQuery(graphql`
    query {
      gtmHead: wpComponent(slug: { eq: "google-tag-manager" }) {
        googleTagManagerFields {
          headScript
          enableGtm
        }
      }
    }
  `);

  const fields = data?.gtmHead?.googleTagManagerFields;
  if (!fields?.enableGtm || !fields?.headScript) return null;

  // Allow users to paste either the full <script>...</script> snippet or just the JS.
  const innerJs = stripScriptTag(fields.headScript);

  return (
    <Helmet>
      <script>{innerJs}</script>
      <meta name="test" content={innerJs} />
      
    </Helmet>
  );
};

export default WpGtmHead;