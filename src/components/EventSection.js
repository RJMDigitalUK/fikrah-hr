import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaCalendarDays, FaLocationDot, FaChevronRight } from "react-icons/fa6";
import { SafeHtmlParser } from "./SafeHtmlParser";

const renderEventImage = (image, className, style) => {
	if (!image) return null;
	const isSvg = image.mimeType === "image/svg+xml";
	const gatsbyImage = getImage(image.localFile);

	if (isSvg) {
		return (
			<img
				src={image.localFile?.publicURL || image.sourceUrl}
				alt={image.altText || "Event image"}
				className={className}
				style={style}
			/>
		);
	}
	if (gatsbyImage) {
		return (
			<GatsbyImage
				image={gatsbyImage}
				alt={image.altText || "Event image"}
				className={className}
			/>
		);
	}
	return (
		<img
			src={image.sourceUrl}
			alt={image.altText || "Event image"}
			className={className}
			style={style}
		/>
	);
};

const FeaturedEventCard = ({ event }) => {
	if (!event) return null;
	const { title, eventFields, featuredImage } = event;
	const image = featuredImage?.node;
	const isExternal = eventFields?.ctaUrl?.target === "_blank";

	return (
		<div className="event-card events-featured-event-card h-100 d-flex flex-column">
			{image && (
				<div className="events-featured-image-wrapper">
					{renderEventImage(
						image,
						"events-featured-image w-100",
						{ objectFit: "cover", width: "100%" }
					)}
				</div>
			)}
			<div className="events-featured-event-body p-3 p-md-4 d-flex flex-column flex-grow-1">
				{(eventFields?.dateAndTime || eventFields?.location) && (
					<div className="event-meta d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 gap-md-3 mb-3">
						{eventFields.dateAndTime && (
							<span className="event-meta-item d-flex align-items-center gap-2">
								<FaCalendarDays className="event-meta-icon" />
								{eventFields.dateAndTime}
							</span>
						)}
						{eventFields.location && (
							<span className="event-meta-item d-flex align-items-center gap-2">
								<FaLocationDot className="event-meta-icon" />
								{eventFields.location}
							</span>
						)}
					</div>
				)}
				{title && <h3 className="event-title mb-3">{title}</h3>}
				{eventFields?.description && (
					<div className="event-description mb-4 flex-grow-1">
						<SafeHtmlParser htmlContent={eventFields.description} />
					</div>
				)}
				{eventFields?.ctaUrl?.url && (
					<Button
						variant="primary"
						href={eventFields.ctaUrl.url}
						target={eventFields.ctaUrl.target || "_self"}
						rel={isExternal ? "noopener noreferrer" : undefined}
						className="event-cta event-cta-button w-100"
					>
						{eventFields.ctaUrl.title || "Book now"}
					</Button>
				)}
			</div>
		</div>
	);
};

const EventListCard = ({ event }) => {
	if (!event) return null;
	const { title, eventFields, featuredImage } = event;
	const image = featuredImage?.node;
	const isExternal = eventFields?.ctaUrl?.target === "_blank";

	return (
		<Row className="events-list-event-card align-items-center g-3">
			{image && (
				<Col xs={12} sm={4} lg={5}>
					<div className="events-list-thumbnail">
						{renderEventImage(
							image,
							"events-list-thumbnail-image"
						)}
					</div>
				</Col>
			)}
			<Col xs={12} sm={image ? 8 : 12} lg={image ? 7 : 12}>
				<div className="events-list-event-body">
					{title && <h4 className="event-title mb-1">{title}</h4>}
					{(eventFields?.dateAndTime || eventFields?.location) && (
						<p className="event-meta mb-2">
							{[eventFields.dateAndTime, eventFields.location].filter(Boolean).join(" · ")}
						</p>
					)}
					{eventFields?.description && (
						<div className="event-description mb-2">
							<SafeHtmlParser htmlContent={eventFields.description} />
						</div>
					)}
					{eventFields?.ctaUrl?.url && (
						<a
							href={eventFields.ctaUrl.url}
							target={eventFields.ctaUrl.target || "_self"}
							rel={isExternal ? "noopener noreferrer" : undefined}
							className="event-cta d-inline-flex align-items-center gap-2 text-decoration-none"
						>
							{eventFields.ctaUrl.title || "Book now"}
							<FaChevronRight className="event-cta-chevron" />
						</a>
					)}
				</div>
			</Col>
		</Row>
	);
};

const EventSection = ({
	subheading,
	subheadingCopy,
	bodyText,
	featuredEvent,
	events,
	backgroundColour,
	subheadingColour,
	headingColour,
	customCss,
}) => {
	const featured = featuredEvent && featuredEvent.length > 0 ? featuredEvent[0] : null;
	const eventList = events || [];

	return (
		<section
			className="events-section py-7"
			id="events"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container className="events-content-container">
				{(subheading || subheadingCopy || bodyText) && (
					<Row className="justify-content-center mb-5">
						<Col xs={12} className="text-start">
							{subheading && (
								<p
									className="events-subheading mb-2"
									style={{ color: subheadingColour }}
								>
									{subheading}
								</p>
							)}
							{subheadingCopy && (
								<h2
									className="events-heading mb-3"
									style={{ color: headingColour }}
								>
									{subheadingCopy}
								</h2>
							)}
							{bodyText && (
								<div
									className="events-body-text"
									style={{ maxWidth: "700px" }}
								>
									<SafeHtmlParser htmlContent={bodyText} />
								</div>
							)}
						</Col>
					</Row>
				)}

				{(featured || eventList.length > 0) && (
					<Row className="g-4 align-items-start">
						{featured && (
							<Col xs={12} lg={6}>
								<FeaturedEventCard event={featured} />
							</Col>
						)}
						{eventList.length > 0 && (
							<Col xs={12} lg={6}>
								<div className={`events-list-scroll-wrapper${eventList.length > 3 ? " events-list-scroll-active" : ""}`}>
									{eventList.map((event, index) => (
										<React.Fragment key={event.id || index}>
											<EventListCard event={event} />
											{index < eventList.length - 1 && (
												<hr className="events-list-divider" />
											)}
										</React.Fragment>
									))}
								</div>
							</Col>
						)}
					</Row>
				)}
			</Container>

			{customCss && <style>{`${customCss}`}</style>}
		</section>
	);
};

export default EventSection;
