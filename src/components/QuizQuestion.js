import React from "react";
import { Container, Row, Col, Button, Form, ProgressBar } from "react-bootstrap";

const QuizQuestion = ({
	quizAnswerType,
	question,
	answer,
	onChange,
	currentQuestion,
	totalQuestions,
	onNext,
	onBack,
	primaryColour,
	secondaryColour,
	primaryTextColour,
	secondaryTextColour
}) => {
	const handleMultipleChoiceChange = (optionIndex) => {
		if (question.mcAllowMultiple) {
			// Checkbox: toggle option in array
			const currentAnswers = Array.isArray(answer) ? answer : [];
			if (currentAnswers.includes(optionIndex)) {
				onChange(currentAnswers.filter(idx => idx !== optionIndex));
			} else {
				onChange([...currentAnswers, optionIndex]);
			}
		} else {
			// Radio: set single value
			onChange(optionIndex);
		}
	};

	const renderQuestion = () => {
		switch (quizAnswerType) {
			case 'multiple_choice':
				return (
					<div>
						{question.options && question.options.map((option, index) => (
							<Form.Check
								key={index}
								type={question.mcAllowMultiple ? "checkbox" : "radio"}
								id={`option-${index}`}
								label={option.text}
								name={`question-${currentQuestion}`}
								checked={
									question.mcAllowMultiple
										? (Array.isArray(answer) && answer.includes(index))
										: answer === index
								}
								onChange={() => handleMultipleChoiceChange(index)}
								className="mb-3 py-3"
							/>
						))}
					</div>
				);

			case 'scale_0_10':
				return (
					<div>
						<Form.Group>
							<Form.Label>
								Selected value: {answer !== undefined ? answer : question.minValue || 0}
							</Form.Label>
							<Form.Range
								min={question.minValue || 0}
								max={question.maxValue || 10}
								step={question.step || 1}
								value={answer !== undefined ? answer : question.minValue || 0}
								onChange={(e) => onChange(parseFloat(e.target.value))}
							/>
						</Form.Group>
						{(question.minLabel || question.maxLabel) && (
							<div className="d-flex justify-content-between mt-1">
								<small className="text-muted" style={{ maxWidth: '45%' }}>{question.minLabel}</small>
								<small className="text-muted text-end" style={{ maxWidth: '45%' }}>{question.maxLabel}</small>
							</div>
						)}
					</div>
				);

			case 'true_false':
				return (
					<div className="d-grid gap-3">
						<Button
							variant={answer === true ? "primary" : "outline-primary"}
							onClick={() => onChange(true)}
							className="py-3 rounded-5"
							style={answer === true ? {
								background: primaryColour,
								color: primaryTextColour,
								borderColor: primaryColour
							} : {}}
						>
							{question.labelTrue || "True"}
						</Button>
						<Button
							variant={answer === false ? "primary" : "outline-primary"}
							onClick={() => onChange(false)}
							className="py-3 rounded-5"
							style={answer === false ? {
								background: primaryColour,
								color: primaryTextColour,
								borderColor: primaryColour
							} : {}}
						>
							{question.labelFalse || "False"}
						</Button>
					</div>
				);			default:
				return <p>Unknown question type</p>;
		}
	};

	const isAnswered = answer !== undefined && answer !== null && answer !== '';
	const canProceed = !question.isRequired || isAnswered;
	const progress = (currentQuestion / totalQuestions) * 100;

	return (
		<section className="quiz-question-section py-5">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} lg={8} className="mb-3 py-3 px-4 rounded">
					<p className="mb-2 quiz-progress-text">
						Question {currentQuestion} of {totalQuestions}
					</p>
					<ProgressBar 
						now={progress} 

						className="mb-0"
					/>
				</Col>
					<Col xs={12} lg={8} className="px-1 px-md-0">
						<div className="question-box py-5 px-5 rounded-top" style={{ borderBottomLeftRadius: '50% 20px', borderBottomRightRadius: '50% 20px', backgroundColor: secondaryColour, color: secondaryTextColour }}>
							<h3 className="text-center">{question.question}</h3>							
						</div>

						{question.helpText && (
							<p className="text-muted mb-4">{question.helpText}</p>
						)}

						<div className="py-6 pt-md-5">
							{renderQuestion()}
						</div>

						<Row className="g-3  pt-4">
							<Col xs={6}>
								<Button
									variant="secondary"
									onClick={onBack}
									disabled={currentQuestion === 1}
									className="w-100 py-3 w-xl-75"
									style={{background: secondaryColour, color: secondaryTextColour, borderColor: secondaryColour}}
								>
									Previous
								</Button>
							</Col>
							<Col xs={6} className="d-xl-flex justify-content-xl-end">
								<Button
									variant="primary"
									onClick={onNext}
									disabled={!canProceed}
									className="w-100 py-3 w-xl-75"
									style={{background: primaryColour, color: primaryTextColour}}
								>
									{currentQuestion === totalQuestions ? "Continue" : "Next"}
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default QuizQuestion;
