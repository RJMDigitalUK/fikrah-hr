import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";

const AnswerSection = ({ backgroundColour, questionTextColour, answerTextColour, question, answer, customCss }) => {
	return (
		<section 
			className="answer-section py-7"
			style={{ backgroundColor: backgroundColour }}
		>
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={8}>
						<div className="answer-content-container">
							{question && (
								<h4 className="answer-question mb-4" style={{ color: questionTextColour }}>{question}</h4>
							)}
							{answer && (
								<div className="answer-text" style={{ color: answerTextColour }}>
									<SafeHtmlParser htmlContent={answer} />
								</div>
							)}
						</div>
					</Col>
				</Row>
			</Container>

			{customCss && (
				<style>{`${customCss}`}</style>
			)}

		</section>
	);
};

export default AnswerSection;