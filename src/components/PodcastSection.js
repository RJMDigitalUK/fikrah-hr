import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaPlay, FaStop, FaClock } from "react-icons/fa";

const PodcastSection = ({
	headingColour,
	episodeTitleTextColour,
	dateAndTimeTextColour,
	bodyTextColour,
	playButtonColour,
	playButtonTextColour,
	rssFeed
}) => {
	const [episodes, setEpisodes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [currentPlaying, setCurrentPlaying] = useState(null);
	const audioRefs = useRef({});

	useEffect(() => {
		if (!rssFeed) return;

		let cancelled = false;

		const fetchRss = async () => {
			setLoading(true);
			setError(null);
			try {
				const proxyUrl = `/api/rss-proxy?url=${encodeURIComponent(rssFeed)}`;
				const res = await fetch(proxyUrl);
				if (!res.ok) throw new Error(`Failed to fetch RSS feed: ${res.status}`);
				const text = await res.text();
				const xml = new DOMParser().parseFromString(text, "text/xml");
				const items = Array.from(xml.querySelectorAll("item"));
				const parsed = items.map((item, idx) => ({
					id: item.querySelector("guid")?.textContent || String(idx),
					title: item.querySelector("title")?.textContent || "",
					description: item.querySelector("description")?.textContent || "",
					pubDate: item.querySelector("pubDate")?.textContent || "",
					duration: item.querySelector("itunes\\:duration, duration")?.textContent || "",
					audioUrl: item.querySelector("enclosure")?.getAttribute("url") || "",
					link: item.querySelector("link")?.textContent || "",
				}));
				if (!cancelled) setEpisodes(parsed);
			} catch (err) {
				if (!cancelled) setError(err.message);
			} finally {
				if (!cancelled) setLoading(false);
			}
		};

		fetchRss();

		return () => {
			cancelled = true;
			Object.values(audioRefs.current).forEach(audio => {
				audio.pause();
				audio.src = "";
			});
			audioRefs.current = {};
		};
	}, [rssFeed]);

	const togglePlay = (episodeId, audioUrl) => {
		if (!audioUrl) return;

		// Stop all other episodes
		Object.entries(audioRefs.current).forEach(([id, audio]) => {
			if (id !== episodeId) {
				audio.pause();
				audio.currentTime = 0;
			}
		});

		if (currentPlaying === episodeId) {
			audioRefs.current[episodeId]?.pause();
			if (audioRefs.current[episodeId]) audioRefs.current[episodeId].currentTime = 0;
			setCurrentPlaying(null);
		} else {
			if (!audioRefs.current[episodeId]) {
				const audio = new Audio(audioUrl);
				audio.addEventListener("ended", () => setCurrentPlaying(null));
				audio.addEventListener("error", () => setCurrentPlaying(null));
				audioRefs.current[episodeId] = audio;
			}
			audioRefs.current[episodeId].play().catch(() => setCurrentPlaying(null));
			setCurrentPlaying(episodeId);
		}
	};

	const formatDuration = (duration) => {
		if (!duration) return "";
		if (duration.includes(":")) return duration;
		const seconds = parseInt(duration);
		if (isNaN(seconds)) return duration;
		const m = Math.floor(seconds / 60);
		const s = seconds % 60;
		return `${m}:${s.toString().padStart(2, "0")}`;
	};

	const truncateDescription = (description, maxLength = 150) => {
		if (!description) return "";
		const text = description.replace(/<[^>]*>/g, "");
		return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
	};

	return (
		<section className="podcast-section py-5 py-lg-7">
			<Container className="podcast-section-content-container">
				{loading && (
					<div className="text-center py-5">
						<p style={{ color: bodyTextColour }}>Loading episodes...</p>
					</div>
				)}

				{error && (
					<div className="text-center py-5">
						<p style={{ color: bodyTextColour }}>Unable to load podcast episodes.</p>
					</div>
				)}

				{!loading && !error && !rssFeed && (
					<div className="text-center py-5">
						<p style={{ color: bodyTextColour }}>Podcast episodes will appear here.</p>
					</div>
				)}

				{!loading && !error && rssFeed && episodes.length === 0 && (
					<div className="text-center py-5">
						<p style={{ color: bodyTextColour }}>No episodes found.</p>
					</div>
				)}

				{episodes.map((episode) => (
					<Card key={episode.id} className="podcast-episode-card mb-4">
						<Card.Body>
							<Row className="align-items-start">
								<Col md={8}>
									<Card.Title className="podcast-section-episode-title h5 mb-2">
										{episode.title}
									</Card.Title>
									<div className="d-flex align-items-center podcast-section-episode-date mb-2 small">
										{episode.pubDate && (
											<span className="me-3">
												{new Date(episode.pubDate).toLocaleDateString()}
											</span>
										)}
										{episode.duration && (
											<span className="d-flex align-items-center">
												<FaClock className="me-1" size={12} />
												{formatDuration(episode.duration)}
											</span>
										)}
									</div>
									{episode.description && (
										<Card.Text className="podcast-section-episode-body">
											{truncateDescription(episode.description)}
										</Card.Text>
									)}
								</Col>
								<Col md={4} className="text-md-end">
									<Button
										size="sm"
										onClick={() => togglePlay(episode.id, episode.audioUrl)}
										disabled={!episode.audioUrl}
										className={`podcast-section-play-button d-inline-flex align-items-center mt-3${currentPlaying === episode.id ? ' playing' : ''}`}
									>
										{currentPlaying === episode.id ? (
											<><FaStop className="me-2" />Stop</>
										) : (
											<><FaPlay className="me-2" />Play</>
										)}
									</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				))}
			</Container>
			<style>{`
				.podcast-section-episode-title { color: ${episodeTitleTextColour || 'inherit'}; }
				.podcast-section-episode-date { color: ${dateAndTimeTextColour || 'inherit'}; }
				.podcast-section-episode-body { color: ${bodyTextColour || 'inherit'}; }
				.podcast-section-play-button {
					background-color: ${playButtonColour || 'var(--bs-primary)'} !important;
					color: ${playButtonTextColour || '#fff'} !important;
					border-color: ${playButtonColour || 'var(--bs-primary)'} !important;
				}
				.podcast-section-play-button.playing {
					background-color: #E83166 !important;
					border-color: #E83166 !important;
				}
				.podcast-episode-card {
					border: 1px solid rgba(0,0,0,0.1);
				}
			`}</style>
		</section>
	);
};

export default PodcastSection;
