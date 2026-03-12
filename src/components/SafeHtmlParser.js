import React from "react";
import parse from "html-react-parser";

export const SafeHtmlParser = ({ htmlContent, className, style, ...otherProps }) => {
	// Ensure we always have a string
	let correctedHtml = typeof htmlContent === "string" ? htmlContent : "";

	// Replace className with class if we have a string
	correctedHtml = correctedHtml.replace(
		/className\s*=\s*(".?"|'.?'|[^"'\s>]+)/g,
		"class=$1"
	);

	// Sanitize only in browser (no SSR)
	if (typeof window !== "undefined") {
		const DOMPurify = require("dompurify");
		// Configure DOMPurify to allow iframe tags and necessary attributes
		const config = {
			ADD_TAGS: ["iframe"],
			ADD_ATTR: [
				"allow",
				"allowfullscreen",
				"frameborder",
				"referrerpolicy",
				"title",
				"width",
				"height",
				"src",
			],
		};
		correctedHtml = DOMPurify.sanitize(correctedHtml, config);
	}

	// Now parse the sanitized string
	const content = parse(correctedHtml || "");

	// Wrap content in a div with the passed props if any styling props are provided
	if (className || style || Object.keys(otherProps).length > 0) {
		return (
			<div className={className} style={style} {...otherProps}>
				{content}
			</div>
		);
	}

	return <>{content}</>;
};
