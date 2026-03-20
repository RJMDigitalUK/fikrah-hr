export default async function handler(req, res) {
	const { url } = req.query;

	if (!url || typeof url !== "string" || !url.startsWith("http")) {
		return res.status(400).json({ error: "A valid URL parameter is required." });
	}

	try {
		const upstream = await fetch(url, {
			headers: {
				// Some podcast hosts require a User-Agent header
				"User-Agent": "Mozilla/5.0 (compatible; RSSFetcher/1.0)",
			},
		});

		if (!upstream.ok) {
			return res.status(502).json({ error: `Upstream responded with ${upstream.status}` });
		}

		const xml = await upstream.text();

		res.setHeader("Content-Type", "application/xml; charset=utf-8");
		res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
		return res.status(200).send(xml);
	} catch (err) {
		return res.status(502).json({ error: "Failed to fetch the RSS feed." });
	}
}
