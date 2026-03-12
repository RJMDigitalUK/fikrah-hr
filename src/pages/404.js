import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

// styles
const pageStyles = {
	color: "#232129",
	padding: "96px",
	fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
	marginTop: 0,
	marginBottom: 64,
	maxWidth: 320,
};

const paragraphStyles = {
	marginBottom: 48,
};
const codeStyles = {
	color: "#8A6534",
	padding: 4,
	backgroundColor: "#FFF4DB",
	fontSize: "1.25rem",
	borderRadius: 4,
};

// markup
const NotFoundPage = () => {
	return (
		<Layout>
			<div
				style={{
					background: "linear-gradient(180deg, #123E72 0%, #012A59 100%)",
				}}
			>
			</div>
			<main style={pageStyles}>
				<title>Not found</title>
				<h1 style={headingStyles}>Page not found</h1>
				<p style={paragraphStyles}>
					Sorry{" "}
					<span role="img" aria-label="Pensive emoji">
						😔
					</span>{" "}
					we couldn’t find what you were looking for.
					<br />
					{process.env.NODE_ENV === "development" ? (
						<>
							<br />
							Try creating a page in <code style={codeStyles}>src/pages/</code>.
							<br />
						</>
					) : null}
					<br />
					<Link to="/">Go home</Link>.
				</p>
			</main>
		</Layout>
	);
};

export default NotFoundPage;
