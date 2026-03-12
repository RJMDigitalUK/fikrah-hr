import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieBanner = () => {
	return (
		<CookieConsent
			flipButtons
			enableDeclineButton
			declineButtonText="Decline"
			location="bottom"
			buttonText="Accept"
			onAccept={() => {
				window.location.reload(false);
			}}
			style={{ background: "black" }}
			declineButtonStyle={{ backgroundColor: "black" }}
			buttonStyle={{
				color: "black",
				fontSize: "1rem",
				backgroundColor: "white",
			}}
			expires={365}
		>
			{" "}
			This website stores data such as cookies to enable site functionality
			including analytics and personalisation.
		</CookieConsent>
	);
};

export default CookieBanner;
