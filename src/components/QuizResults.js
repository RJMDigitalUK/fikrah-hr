import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuizResults = ({
	resultsHeading,
	resultsSubheading,
	score,
	maxPossibleScore,
	totalQuestions,
	scorecardAssessments,
	discoveryCallIframe,
	primaryColour,
	secondaryColour,
	primaryTextColour,
	secondaryTextColour
}) => {
	// Find matching assessment based on score
	const matchedAssessment = scorecardAssessments?.find(
		assessment =>
			score >= assessment.scoreRangeLow &&
			score <= assessment.scoreRangeHigh
	);

	return (
		<section className="pb-5 ">
			
				<Row className="justify-content-center py-5 px-4 px-md-7" style={{backgroundColor: primaryColour}}>
					<Col xs={12} lg={10}>
						{resultsHeading && (
							<h1 className="text-center mb-3" style={{color: primaryTextColour}}>{resultsHeading}</h1>
						)}
						
						{resultsSubheading && (
							<p className="text-center mb-4" style={{color: primaryTextColour}}><strong>{resultsSubheading}</strong></p>
						)}					

					</Col>
					
				</Row>
			
			
			<hr className="mt-2" style={{borderTopWidth: '3px', borderColor: primaryColour}}/>
			<Container className="mt-5">
				<Row className="justify-content-center">
					<Col xs={12} lg={10} className="rounded py-4 py-md-5 px-4 px-md-5">
						<div style={{ width: '200px', maxWidth: '100%', margin: '0 auto 2rem' }}>
							<CircularProgressbar
								value={score}
								maxValue={maxPossibleScore}
								text={`${Math.round((score / maxPossibleScore) * 100)}%`}
								styles={buildStyles({
									textSize: '20px',
									textColor: primaryColour,
									pathColor: primaryColour,
									trailColor: '#d6d6d6'
								})}
							/>
							<p className="text-center mt-3 mb-2" style={{color: primaryColour }}>
								<strong>{score} out of {maxPossibleScore}</strong>
							</p>
						</div>
						{matchedAssessment?.insightName && (
							<h3 className="text-center" style={{color: primaryColour}} mb-0>
								{matchedAssessment.insightName}
							</h3>
						)}
					</Col>
				</Row>
				<Row className="justify-content-center mt-4">
					<Col xs={12} lg={10} className=" border-2 rounded py-4 py-md-5 px-md-5">

						{matchedAssessment ? (
							<>
								
								
							<h3 className="mb-md-4" style={{color: secondaryTextColour}}>Your Score: {score}</h3>
					

								{matchedAssessment.insight && (
									<div className="mb-4">
										<h4 className="">Insight:</h4>
										<SafeHtmlParser htmlContent={matchedAssessment.insight} />
									</div>
								)}

								{matchedAssessment.nextSteps && (
									<div className="mb-4">
										<h4 className="mb-3">Next Steps:</h4>
										<SafeHtmlParser htmlContent={matchedAssessment.nextSteps} />
									</div>
								)}
							</>
						) : (
							<div className="alert alert-info">
								<p className="mb-0">
									Thank you for completing the quiz! We're processing your results.
								</p>
							</div>
						)}
						</Col>
						<Col xs={12} lg={10} className="mt-4 mt-md-5">
						<h2 className="text-center text-primary">LET'S TALK ABOUT YOUR RESULTS</h2>
						<p className="text-center mb-md-4"><strong>Book your time slot below</strong></p>

						{discoveryCallIframe && (
							<div className="mt-4 iframe-container">
								<div dangerouslySetInnerHTML={{ __html: discoveryCallIframe }} />
							</div>
						)}
					</Col>
				</Row>
			</Container>
			<style>{`
				.iframe-container {
					position: relative;
					width: 100%;
					overflow: hidden;
				}
				
				.iframe-container iframe {
					width: 100% !important;
					min-height: 1000px;
					height: auto;
					border: none;
				}
				
				@media (max-width: 768px) {
					.iframe-container iframe {
						min-height: 900px;
					}
				}
			`}</style>
		</section>
	);
};

export default QuizResults;
