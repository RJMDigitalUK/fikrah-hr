import React, { useState } from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { GatsbySeo } from "gatsby-plugin-next-seo";

// Updated component imports for new ACF layouts
import Hero from "../components/Hero";
import PageBreak from "../components/PageBreak";
import Header1 from "../components/Header1";
import LeadMagnetBanner1 from "../components/LeadMagnetBanner1";
import LeadMagnetBanner2 from "../components/LeadMagnetBanner2";
import CtaBanner from "../components/CtaBanner";
import HighlightsSection from "../components/HighlightsSection";
import CoachBioSection from "../components/CoachBioSection";
import ProgramSummary from "../components/ProgramSummary";
import EmotionalHookSection from "../components/EmotionalHookSection";
import ProgramStorySection from "../components/ProgramStorySection";
import BlogCarousel from "../components/BlogCarousel";
import ContactUs from "../components/ContactUs";
import GuideDownloadSection from "../components/GuideDownloadSection";
import GuideBenefitsSection from "../components/GuideBenefitsSection";
import FaqSection from "../components/FaqSection";
import AnswerSection from "../components/AnswerSection";
import Testimonial from "../components/Testimonial";
import ContactForm from "../components/ContactForm";
import DiscoveryCallBooking from "../components/DiscoveryCallBooking";
import GoogleReview from "../components/GoogleReview";
import NewsletterCtaBanner from "../components/NewsletterCtaBanner";
import CirclesSection from "../components/CirclesSection";
import CardsSection from "../components/CardsSection";
import EventSection from "../components/EventSection";
import TeamSection from "../components/TeamSection";
import AsSeenIn from "../components/AsSeenIn";
import PodcastSection from "../components/PodcastSection";

const IndexPage = ({ data: { wpPage, site } }) => {
	const siteUrl = site?.siteMetadata?.siteUrl;
	const { seoFields, pageFields } = wpPage;

	// Map each ACF flexible component layout to its corresponding component
	const componentMap = {
		hero: (data) => <Hero {...data} />,
		pagebreak: (data) => <PageBreak {...data} />,
		header1: (data) => <Header1 {...data} />,
		leadmagnetbanner1: (data) => <LeadMagnetBanner1 {...data} />,
		leadmagnetbanner2: (data) => <LeadMagnetBanner2 {...data} />,
		ctabanner: (data) => <CtaBanner {...data} />,
		highlightssection: (data) => <HighlightsSection {...data} />,
		coachbiosection: (data) => <CoachBioSection {...data} />,
		programsummary: (data) => <ProgramSummary {...data} />,
		emotionalhooksection: (data) => <EmotionalHookSection {...data} />,
		programstorysection: (data) => <ProgramStorySection {...data} />,
		blogcarousel: (data) => <BlogCarousel {...data} />,
		contactus: (data) => <ContactUs {...data} />,
		guidedownloadsection: (data) => <GuideDownloadSection {...data} />,
		guidebenefitssection: (data) => <GuideBenefitsSection {...data} />,
		faqsection: (data) => <FaqSection {...data} />,
		answersection: (data) => <AnswerSection {...data} />,
		testimonial: (data) => <Testimonial {...data} />,
		contactform: (data) => <ContactForm {...data} />,
		discoverycallbooking: (data) => <DiscoveryCallBooking {...data} />,
		googlereview: (data) => <GoogleReview {...data} />,
		newsletterctabanner: (data) => <NewsletterCtaBanner {...data} />,
		circlessection: (data) => <CirclesSection {...data} />,
		cardssection: (data) => <CardsSection {...data} />,
		eventsection: (data) => <EventSection {...data} />,
		teamsection: (data) => <TeamSection {...data} />,
		asseenin: (data) => <AsSeenIn {...data} />,
		podcastsection: (data) => <PodcastSection {...data} />,
	};

	const breadcrumb = {
		"@context": "http://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: siteUrl,
			},
		],
	};

	return (
		<Layout>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
			</Helmet>
			<GatsbySeo
				title={seoFields?.metaTitle || wpPage?.title}
				description={seoFields?.metaDescription}
				language="en"
				openGraph={{
					type: "website",
					url: siteUrl,
					title: seoFields?.opengraphTitle,
					description: seoFields?.opengraphDescription,
					images: [
						{
							url: seoFields?.image?.sourceUrl,
							width: seoFields?.image?.mediaDetails?.width,
							height: seoFields?.image?.mediaDetails?.height,
							alt: seoFields?.image?.altText,
						},
					],
				}}
			/>
			{pageFields.components.map((component, index) => {
				// Extract layout name from __typename (e.g., "WpPage_Pagefields_Components_Hero" -> "hero")
				const layoutName = component.__typename?.split('_').pop()?.toLowerCase();
				const renderComponent = componentMap[layoutName];
				return renderComponent ? (
					<div key={index}>{renderComponent(component)}</div>
				) : null;
			})}
		</Layout>
	);
};

export default IndexPage;

export const query = graphql`
	query Homepage {
		site {
			siteMetadata {
				siteUrl
			}
		}
		wpPage(slug: { eq: "home" }) {
			title
			slug
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
			pageFields {
				components {
					__typename
					... on WpPage_Pagefields_Components_Hero {
						backgroundImage {
							altText
							sourceUrl
							mimeType
							localFile {
								publicURL
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						subheading
						heading
						body
						primaryCtaButton {
							title
							url
							target
						}
						secondaryCtaButton {
							title
							url
							target
						}
						backgroundColour
						headingTextColour
						subheadingTextColour
						bodyTextColour
						primaryCtaButtonColour
						primaryCtaTextColour
						secondaryCtaButtonColour
						secondaryCtaTextColour
						textAlignment
						css
					}
					... on WpPage_Pagefields_Components_PageBreak {
						keyBenefits {
							benefitText
						}
						backgroundColour
						customCss
						keyBenefitsTextColour
					}
					... on WpPage_Pagefields_Components_Header1 {
						backgroundImage {
							altText
							sourceUrl
							mimeType
							localFile {
								publicURL
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						subheadingAbove
						subheadingAboveColour
						heading
						description
						primaryCtaButton {
							title
							url
							target
						}
						secondaryCtaButton {
							title
							url
							target
						}
						frameFullHeight
						backgroundColour
						headingTextColour
						customCss
						descriptionTextColour
						primaryCtaButtonColour
						primaryCtaTextColour
						secondaryCtaButtonColour
						secondaryCtaTextColour
					}
					... on WpPage_Pagefields_Components_LeadMagnetBanner1 {
						backgroundColour
						sectionLayout
						image {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						heading
						field1PlaceholderText
						field2PlaceholderText
						description
						cta {
							title
							url
							target
						}
						disclaimer
						redirectUrl
						webhookUrl
						hideInputFields
						customCss
						headingTextColour
						descriptionTextColour
						disclaimerTextColour
						ctaButtonColour
						ctaButtonTextColour
					}
					... on WpPage_Pagefields_Components_LeadMagnetBanner2 {
						heading
						description
						cta {
							title
							url
							target
						}
						redirectUrl
						field1PlaceholderText
						field2PlaceholderText
						webhookUrl
						disclaimer
						customCss
						backgroundColour
						headingTextColour
						descriptionTextColour
						disclaimerTextColour
						ctaButtonColour
						ctaButtonTextColour
					}
					... on WpPage_Pagefields_Components_CtaBanner {
						backgroundImage {
							altText
							sourceUrl
							mimeType
							localFile {
								publicURL
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						heading
						description
						secondaryCta {
							title
							url
							target
						}
						primaryCta {
							title
							url
							target
						}
						backgroundColour
						headingTextColour
						descriptionTextColour
						customCss
						primaryCtaButtonColour
						primaryCtaButtonTextColour
						secondaryCtaButtonColour
						secondaryCtaButtonTextColour
					}
					... on WpPage_Pagefields_Components_HighlightsSection {
						backgroundColour
						subheadingAbove
						subheadingColour
						heading
						description
						highlights {
							icon {
								altText
								sourceUrl
								mimeType
								localFile {
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							heading
							description
							headingColour
							descriptionColour
							ctaText {
								title
								url
								target
							}
							ctaTextColour
							ctaChevronColour
						}
						primaryCtaButton {
							title
							url
							target
						}
						secondaryCta {
							title
							url
							target
						}
						customCss
						headingTextColour
						descriptionTextColour
						primaryCtaButtonColour
						primaryCtaTextColour
						secondaryCtaTextColour
						secondaryCtaChevronColour
					}
					... on WpPage_Pagefields_Components_CoachBioSection {
						backgroundColour
						sectionLayout
						image {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						subheadingAbove
						subheadingAboveColour
						heading
						subheading
						description
						primaryCtaButton {
							title
							url
							target
						}
						secondaryCta {
							title
							url
							target
						}
						headingColour
						subheadingColour
						descriptionTextColour
						primaryCtaButtonColour
						primaryCtaTextColour
						secondaryCtaTextColour
						secondaryCtaChevronColour
						customCss
					}
					... on WpPage_Pagefields_Components_ProgramSummary {
						heading
						subheading
						description
						cta {
							title
							url
							target
						}
						bulletPoints {
							icon {
								altText
								sourceUrl
								mimeType
								localFile {
									extension
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							text
						}
						backgroundColour
						headingTextColour
						subheadingTextColour
						descriptionTextColour
						bulletPointsTextColour
						ctaButtonColour
						ctaButtonTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_EmotionalHookSection {
						backgroundImage {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						subheadingAbove
						subheadingAboveColour
						heading
						subheading
						description
						ctaButton {
							title
							url
							target
						}
						headingColour
						subheadingColour
						descriptionColour
						ctaButtonColour
						ctaTextColour
						customCss
						backgroundColour
					}
					... on WpPage_Pagefields_Components_ProgramStorySection {
						heading
						headingColour
						subheading
						descriptionText1
						bulletPoints {
							icon {
								altText
								sourceUrl
								mimeType
								localFile {
									extension
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							text
							
						}
						descriptionText2
						cta {
							title
							url
							target
						}
						subheadingColour
						descriptionText1Colour
						descriptionText2Colour
						bulletPointTextColour
						backgroundColour
						ctaButtonColour
						ctaButtonTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_BlogCarousel {
						fieldGroupName
						customCss
					}
					... on WpPage_Pagefields_Components_ContactUs {
						image {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						subheading
						heading
						description
						contactMethods {
							icon {
								altText
								sourceUrl
								publicUrl
								mimeType
								localFile {
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							heading
							text
						}
						cta {
							title
							url
							target
						}
						iframe
						backgroundColour
						headingColour
						subheadingColour
						descriptionTextColour
						contactMethodsHeadingColour
						contactMethodsTextColour
						ctaTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_GuideDownloadSection {
						heading
						description
						bulletPoints {
							icon {
								altText
								sourceUrl
								mimeType
								localFile {
									extension
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							text
						}
						redirectUrl
						webhookUrl
						cta {
							title
							url
							target
						}
						disclaimer
						image {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						backgroundColour
						headingTextColour
						descriptionTextColour
						bulletPointsTextColour
						disclaimerTextColour
						ctaButtonColour
						ctaButtonTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_GuideBenefitsSection {
						subheading
						heading
						description
						redirectUrl
						webhookUrl
						cta {
							title
							url
							target
						}
						disclaimer
						benefits {
							text	
							icon {
								altText
								sourceUrl
								localFile {
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
						}
						backgroundColour
						headingColour
						subheadingColour
						descriptionColour
						benefitsTextColour
						disclaimerTextColour
						ctaButtonColour
						ctaButtonTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_FaqSection {
						heading
						headingColour
						subheading
						subheadingDescription
						subheadingDescriptionColour
						questions {
							... on WpFaq {
								id
								slug
								faqFields {
									answer
									question
									questionTextColour
									answerTextColour
								}
							}
						}
						description
						ctaButton {
							title
							url
							target
						}
						backgroundColour
						subheadingColour
						descriptionColour
						customCss
						ctaButtonColour
						ctaTextColour
					}
					... on WpPage_Pagefields_Components_AnswerSection {
						question
						answer
						backgroundColour
						questionTextColour
						answerTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_Testimonial {
						backgroundImage {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						customers {
							... on WpTestimonial {
								id
								title
								testimonialFields {
									review
									name
									profilePicture {
										altText
										sourceUrl
										localFile {
											childImageSharp {
												gatsbyImageData(
													formats: [WEBP, AUTO]
													quality: 100
													transformOptions: { cropFocus: CENTER, fit: COVER }
													layout: CONSTRAINED
													placeholder: BLURRED
												)
											}
										}
									}
								}
							}
						}
						backgroundColour
						quoteTextColour
						nameTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_ContactForm {
						heading
						description
						iframe
						redirectUrl
						webhookUrl
						submitButton {
							title
							url
							target
						}
						backgroundColour
						headingTextColour
						descriptionTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_DiscoveryCallBooking {
						heading
						subheading
						description
						bulletPoints {
							icon {
								altText
								sourceUrl
								mimeType
								localFile {
									extension
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							text
						}
						iframe
						redirectUrl
						webhookUrl
						backgroundColour
						headingTextColour
						subheadingTextColour
						descriptionTextColour
						bulletPointsTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_GoogleReview {
						heading
						iframe
						backgroundColour
						headingTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_NewsletterCtaBanner {
						backgroundImage {
							altText
							mimeType
							sourceUrl
							localFile {
								publicURL
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						heading
						description
						field1PlaceholderText
						field2PlaceholderText
						ctaButton {
							title
							url
							target
						}
						disclaimer
						redirectUrl
						webhookUrl
						backgroundColour
						headingTextColour
						descriptionTextColour
						disclaimerTextColour
						ctaButtonColour
						ctaTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_CirclesSection {
						subheading
						heading
						image {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						service {
							icon {
								altText
								sourceUrl
								mimeType
								localFile {
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							iconHoverState {
								altText
								sourceUrl
								mimeType
								localFile {
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							heading
							description
							hoverColour
							serviceLandingPage {
								url
								target
							}
						}
						primaryCtaButton {
							title
							url
							target
						}
						secondaryCtaButton {
							title
							url
							target
						}
						backgroundColour
						subheadingColour
						headingColour
						primaryCtaButtonColour
						primaryCtaTextColour
						secondaryCtaTextColour
						secondaryCtaChevronColour
						customCss
					}
					... on WpPage_Pagefields_Components_CardsSection {
						heading
						description
						card {
							icon {
								altText
								sourceUrl
								mimeType
								localFile {
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							heading
							description
							outlineColour
							headingColour
							descriptionColour
							hoverColour
						}
						primaryCtaButton {
							title
							url
							target
						}
						secondaryCta {
							title
							url
							target
						}
						headingColour
						descriptionColour
						primaryCtaButtonColour
						primaryCtaTextColour
						secondaryCtaTextColour
						secondaryCtaChevronColour
						customCss
					}
					... on WpPage_Pagefields_Components_EventSection {
						backgroundImage {
							altText
							sourceUrl
							localFile {
								childImageSharp {
									gatsbyImageData(
										formats: [WEBP, AUTO]
										quality: 100
										transformOptions: { cropFocus: CENTER, fit: COVER }
										layout: CONSTRAINED
										placeholder: BLURRED
									)
								}
							}
						}
						subheading
						heading
						description
						ctaButton {
							title
							url
							target
						}
						backgroundColour
						subheadingColour
						headingColour
						descriptionColour
						ctaButtonColour
						ctaButtonTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_TeamSection {
						heading
						description
						teamMember {
							image {
								altText
								sourceUrl
								localFile {
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							name
							role
							bio
							socials {
								socialsIcon {
									altText
									sourceUrl
									mimeType
									localFile {
										publicURL
										childImageSharp {
											gatsbyImageData(
												formats: [WEBP, AUTO]
												quality: 100
												transformOptions: { cropFocus: CENTER, fit: COVER }
												layout: CONSTRAINED
												placeholder: BLURRED
											)
										}
									}
								}
								socialsIconLink {
									title
									url
									target
								}
							}
							nameTextColour
							roleTextColour
							bioTextColour
						}
						headingBelow
						descriptionBelow
						ctaButton {
							title
							url
							target
						}
						backgroundColour
						headingColour
						descriptionColour
						headingBelowColour
						descriptionBelowColour
						ctaButtonColour
						ctaTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_AsSeenIn {
						subheading
						heading
						bodyText
						logos {
							companyLogo {
								altText
								sourceUrl
								mimeType
								localFile {
									publicURL
									childImageSharp {
										gatsbyImageData(
											formats: [WEBP, AUTO]
											quality: 100
											transformOptions: { cropFocus: CENTER, fit: COVER }
											layout: CONSTRAINED
											placeholder: BLURRED
										)
									}
								}
							}
							companyUrl {
								title
								url
								target
							}
						}
						backgroundColour
						subheadingColour
						headingColour
						bodyTextColour
						customCss
					}
					... on WpPage_Pagefields_Components_PodcastSection {
						headingColour
						episodeTitleTextColour
						dateAndTimeTextColour
						bodyTextColour
						playButtonColour
						playButtonTextColour
						rssFeed
					}
				}
			}
		}
	}
`;