import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { SafeHtmlParser } from "./SafeHtmlParser";

const Banner = () => {
	const data = useStaticQuery(graphql`
		query {
			banner: wpComponent(slug: { eq: "banner" }) {
				bannerFields {
					colour
                    textColour
					showBanner
					text
					customCss
				}
			}
		}
	`);

	const banner = data?.banner?.bannerFields;

	if (!banner?.showBanner) return null;

	const { colour, text, customCss, textColour } = banner;

	return (
		<>
			<div 
				className="banner-container text-center py-2"
				style={{ backgroundColor: colour }}
			>
				<SafeHtmlParser className="banner-text" htmlContent={text} style={{color: textColour}} />
			</div>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</>
	);
};

export default Banner;
