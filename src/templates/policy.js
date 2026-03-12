import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import parse from "html-react-parser";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Layout from "../components/Layout";
import { SafeHtmlParser } from "../components/SafeHtmlParser";

const PolicyTemplate = ({ data }) => {
	const { wpPolicy } = data;
	const { siteUrl } = data.site.siteMetadata;

	return (
		<Layout>
			<GatsbySeo
				title={wpPolicy.title}
				description={wpPolicy.title}
				language="en"
				openGraph={{
					type: "website",
					url: `${siteUrl}/policies/${wpPolicy.slug}`,
					title: `${wpPolicy.title}`,
					description: `${wpPolicy.title}`,
				}}
			/>

			<Container className="my-6">
				<Row>
					<Col>
						<h1 className="text-center pb-5">{wpPolicy.title}</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="policy blog-content px-3 px-lg-0">
							<SafeHtmlParser className="" htmlContent={wpPolicy.content} />
						</div>
					</Col>
				</Row>
			</Container>
		</Layout>
	);
};

export default PolicyTemplate;

export const blogData = graphql`
	query ($id: String!) {
		wpPolicy(id: { eq: $id }) {
			title
			content
			uri
			slug
		}
		site {
			siteMetadata {
				siteUrl
			}
		}
	}
`;
