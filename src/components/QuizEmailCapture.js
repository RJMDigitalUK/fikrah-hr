import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const QuizEmailCapture = ({
	webhookUrl,
	quizTitle,
	quizSlug,
	score,
	answers,
	pillarScores,
	totalQuestions,
	onSuccess,
	onBack,
	primaryColour,
	secondaryColour,
	primaryTextColour,
	secondaryTextColour
}) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (!name || !email) {
			alert('Please fill in all fields');
			return;
		}

		setIsSubmitting(true);

		try {
			if (webhookUrl) {
				const response = await fetch(webhookUrl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						email,
						quiz_title: quizTitle,
						quiz_slug: quizSlug,
						score,
						total_questions: totalQuestions,
						answers,
						pillar_scores: pillarScores || []
					}),
				});

				if (!response.ok) {
					const errorText = await response.text();
					throw new Error(`Webhook responded ${response.status}: ${errorText}`);
				}
			}
		} catch (error) {
			console.error('Webhook submission error:', error);
			// Continue to results even if webhook fails
		} finally {
			setIsSubmitting(false);
			// Always proceed to results
			onSuccess();
		}
	};

	return (
		<section className="py-5">
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={8} lg={6}>
						<h1 className="text-center mb-4" style={{color: secondaryTextColour}}>Get Your Results</h1>
						<p className="text-center mb-4" style={{color: secondaryTextColour}}>
							Enter your details below to see your personalised quiz results.
						</p>

						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Label style={{color: secondaryTextColour}}>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Your name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="py-3"
								/>
							</Form.Group>

							<Form.Group className="mb-4">
								<Form.Label style={{color: secondaryTextColour}}>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="your@email.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="py-3"
								/>
							</Form.Group>

							<Row className="g-3">
								<Col xs={6}>
									<Button
										
										onClick={onBack}
										className="w-100 py-3"
										type="button"
										style={{background: secondaryColour, color: secondaryTextColour}}
									>
										Back
									</Button>
								</Col>
								<Col xs={6}>
									<Button
										variant="primary"
										type="submit"
										disabled={isSubmitting}
										className="w-100 py-3"
										style={{background: primaryColour, color: primaryTextColour}}
									>
										{isSubmitting ? 'Submitting...' : 'See Results'}
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default QuizEmailCapture;
