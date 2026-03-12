import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import BlogContentSection from "../components/BlogContentSection";
import Layout from "../components/Layout";
import { Col, Container, Row } from "react-bootstrap";
import { StickyContainer, Sticky } from "react-sticky";
import { useMediaQuery } from "react-responsive";
import AnswerSection from "../components/AnswerSection";

const AnswerTemplate = ({ data: { wpFaq, site, wpComponent } }) => {
  const siteUrl = site?.siteMetadata?.siteUrl;
  const [activeRole, setActiveRole] = useState(null);




  const { seoFields } = wpFaq || {};

  // Prioritize individual FAQ colors over theme defaults
  const questionColour = wpFaq?.faqFields?.questionTextColour || wpComponent?.themeSettings?.faqQuestionColour;
  const answerColour = wpFaq?.faqFields?.answerTextColour || wpComponent?.themeSettings?.faqAnswerTextColour;

  const breadcrumb = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: "1",
        name: "Home",
        item: {
          url: `${siteUrl}`,
          id: `${siteUrl}`,
        },
      },
      {
        "@type": "ListItem",
        position: "2",
        name: `Your Questions`,
        item: {
          url: `${siteUrl}/your-questions`,
          id: `${siteUrl}/your-questions`,
        },
      },
      {
        "@type": "ListItem",
        position: "3",
        name: `${seoFields?.metaTitle || wpFaq?.title}`,
        item: {
          url: `${siteUrl}/your-questions/${wpFaq?.slug}`,
          id: `${siteUrl}/your-questions/${wpFaq?.slug}`,
        },
      },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
      <GatsbySeo
        title={seoFields?.metaTitle || wpFaq?.title}
        description={seoFields?.metaDescription}
        language="en"
        openGraph={{
          type: "website",
          url: `${siteUrl}/your-questions/${wpFaq?.slug}`,
          title: `${seoFields?.opengraphTitle || wpFaq?.title}`,
          description: `${seoFields?.opengraphDescription}`,
          images: [
            {
              url: `${seoFields?.image?.sourceUrl}`,
              width: `${seoFields?.image?.mediaDetails?.width}`,
              height: `${seoFields?.image?.mediaDetails?.height}`,
              alt: `${seoFields?.image?.altText}`,
            },
          ],
        }}
      />

      <AnswerSection 
        question={wpFaq?.faqFields?.question} 
        answer={wpFaq?.faqFields?.answer} 
        backgroundColour={wpComponent?.themeSettings?.faqBackgroundColour}
        questionTextColour={questionColour}
        answerTextColour={answerColour}
        customCss={wpComponent?.themeSettings?.faqCustomCss}
      />

    </Layout>
  );
};

export default AnswerTemplate;

export const pageQuery = graphql`
  query AnswerById($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }

    wpComponent: wpComponent(slug: { eq: "theme-settings" }) {
      themeSettings {
        faqBackgroundColour
        faqQuestionColour
        faqAnswerTextColour
        faqCustomCss
      }
    }

    wpFaq: wpFaq(id: { eq: $id }) {
      faqFields {
        question
        answer
        questionTextColour
      answerTextColour  
      }      
      title
      slug
      id
      seoFields {
        opengraphTitle
        opengraphDescription
        metaTitle
        metaDescription
        fieldGroupName
        productSchema
        image {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;
