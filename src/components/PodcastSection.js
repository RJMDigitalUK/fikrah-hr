import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PodcastSection = ({
	headingColour,
	episodeTitleTextColour,
	dateAndTimeTextColour,
	bodyTextColour,
	playButtonColour,
	playButtonTextColour
}) => {
	return (
		<section className="podcast-section py-5 py-lg-7">
			<Container className="podcast-section-content-container">
				<Row className="justify-content-center">
					<Col xs={12}>
						<div className="podcast-section-player-placeholder text-center py-5">
							{/* Podcast episodes are auto-fetched from the podcast post type */}
							<p className="podcast-section-placeholder-text" style={{ color: bodyTextColour }}>
								Podcast episodes will appear here.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
			<style>{`
				.podcast-section-heading { color: ${headingColour || 'inherit'}; }
				.podcast-section-episode-title { color: ${episodeTitleTextColour || 'inherit'}; }
				.podcast-section-episode-date { color: ${dateAndTimeTextColour || 'inherit'}; }
				.podcast-section-episode-body { color: ${bodyTextColour || 'inherit'}; }
				.podcast-section-play-button {
					background-color: ${playButtonColour || 'var(--bs-primary)'} !important;
					color: ${playButtonTextColour || '#fff'} !important;
					border-color: ${playButtonColour || 'var(--bs-primary)'} !important;
				}
			`}</style>
		</section>
	);
};

export default PodcastSection;
