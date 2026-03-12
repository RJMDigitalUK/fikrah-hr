import React from "react";
import { CookieBanner } from "@connorrjm/rjm-cookie-banner";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Banner from "./Banner";
import WhatsAppIcon from "./WhatsAppIcon";
import DynamicTypography from "../utls/DynamicTypography";
import DynamicCtaStyles from "../utls/DynamicCtaStyles";
import GlobalCustomCss from "../utls/GlobalCustomCss";
import WpGtmHead from "../utls/WpGtmHead";
import WpGtmBody from "../utls/WpGtmBody";

const Layout = ({ children, hideNav = false, hideFooter = false }) => {

	return (
		<>
			<DynamicTypography />
			<DynamicCtaStyles />
			<GlobalCustomCss />
			<WpGtmHead />
			{/* The cookie banner remains at top if you want it. */}
			<CookieBanner url="/policies/information-about-the-use-of-our-cookies" />

			<WpGtmBody />

			{/* Banner */}
			<Banner />

			{/* Navigation */}
			<NavBar hideLinks={hideNav} />

			{/* Wrapper to prevent horizontal overflow without breaking sticky positioning */}
			<div style={{ overflowX: 'hidden' }}>
				{/* The rest of your site */}
				{children}
				{!hideFooter && <Footer />}
			</div>

			{/* WhatsApp Icon */}
			<WhatsAppIcon />
		</>
	);
};

export default Layout;
