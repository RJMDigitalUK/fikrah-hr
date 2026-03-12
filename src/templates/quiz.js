import { graphql } from "gatsby";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import QuizIntro from "../components/QuizIntro";
import QuizQuestion from "../components/QuizQuestion";
import QuizEmailCapture from "../components/QuizEmailCapture";
import QuizResults from "../components/QuizResults";

const QuizTemplate = ({ data: { wpQuiz, site } }) => {
	const siteUrl = site?.siteMetadata?.siteUrl;
	const { seoFields, quizFields } = wpQuiz;

	// State management
	const [currentStep, setCurrentStep] = useState('intro');
	const [answers, setAnswers] = useState({});
	const [score, setScore] = useState(0);

	const questions = quizFields?.questionsAndAnswers || [];
	const totalQuestions = questions.length;

	// Calculate maximum possible score
	const calculateMaxScore = () => {
		let maxTotal = 0;

		questions.forEach((question) => {
			let maxQuestionScore = 0;
			const weight = question.weight || 1;

			switch (quizFields?.quizAnswerType) {
				case 'multiple_choice':
					if (question.mcAllowMultiple) {
						// Sum all option scores for multiple selection
						question.options?.forEach(option => {
							maxQuestionScore += option?.score || 0;
						});
					} else {
						// Find highest score option for single selection
						const scores = question.options?.map(opt => opt?.score || 0) || [0];
						maxQuestionScore = Math.max(...scores);
					}
					break;

				case 'scale_0_10':
					// Check if value_score_map exists and find max
					if (question.valueScoreMap && question.valueScoreMap.length > 0) {
						const mapScores = question.valueScoreMap.map(map => map.score || 0);
						maxQuestionScore = Math.max(...mapScores);
					} else {
						// Use max value * points per unit
						const maxValue = question.maxValue || 10;
						maxQuestionScore = maxValue * (question.pointsPerUnit || 1);
					}
					break;

				case 'true_false':
					maxQuestionScore = Math.max(
						question.scoreIfTrue || 0,
						question.scoreIfFalse || 0
					);
					break;

				default:
					break;
			}

			maxTotal += maxQuestionScore * weight;
		});

		return maxTotal;
	};

	const maxPossibleScore = calculateMaxScore();

	// Calculate score whenever answers change
	useEffect(() => {
		const newScore = calculateScore();
		setScore(newScore);
	}, [answers, questions, quizFields?.quizAnswerType]);

	const calculateScore = () => {
		let total = 0;

		questions.forEach((question, index) => {
			const answer = answers[index];
			if (answer === undefined || answer === null) return;

			let questionScore = 0;
			const weight = question.weight || 1;

			switch (quizFields?.quizAnswerType) {
				case 'multiple_choice':
					if (question.mcAllowMultiple) {
						// Multiple selection: answer is array of indices
						if (Array.isArray(answer)) {
							answer.forEach(selectedIndex => {
								const option = question.options?.[selectedIndex];
								questionScore += option?.score || 0;
							});
						}
					} else {
						// Single selection: answer is single index
						const option = question.options?.[answer];
						questionScore = option?.score || 0;
					}
					break;

				case 'scale_0_10':
					// Check for value override in value_score_map
					const override = question.valueScoreMap?.find(
						map => map.value === answer
					);
					if (override) {
						questionScore = override.score;
					} else {
						questionScore = answer * (question.pointsPerUnit || 1);
					}
					break;

				case 'true_false':
					questionScore = answer === true
						? (question.scoreIfTrue || 0)
						: (question.scoreIfFalse || 0);
					break;

				default:
					break;
			}

			total += questionScore * weight;
		});

		return total;
	};

	const handleAnswerChange = (questionIndex, value) => {
		setAnswers(prev => ({
			...prev,
			[questionIndex]: value
		}));
	};

	const handleNext = (currentQuestionIndex) => {
		const question = questions[currentQuestionIndex];
		const answer = answers[currentQuestionIndex];

		// Validate required questions
		if (question?.isRequired && (answer === undefined || answer === null || answer === '')) {
			alert('This question is required');
			return;
		}

		// Move to next question or email form
		if (currentQuestionIndex < totalQuestions - 1) {
			setCurrentStep(`question-${currentQuestionIndex + 1}`);
		} else {
			setCurrentStep('email');
		}
	};

	const handleBack = (currentQuestionIndex) => {
		if (currentQuestionIndex === 0) {
			setCurrentStep('intro');
		} else {
			setCurrentStep(`question-${currentQuestionIndex - 1}`);
		}
	};

	const handleStart = () => {
		setCurrentStep('question-0');
	};

	const handleEmailSuccess = () => {
		setCurrentStep('results');
	};

	const handleEmailBack = () => {
		setCurrentStep(`question-${totalQuestions - 1}`);
	};

	// Breadcrumb schema
	const breadcrumb = {
		"@context": "http://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: "1",
				name: "Home",
				item: {
					url: `${siteUrl}`,
					id: `${siteUrl}`,
				},
			},
			{
				"@type": "ListItem",
				position: "2",
				name: "Quiz",
				item: {
					url: `${siteUrl}/quiz`,
					id: `${siteUrl}/quiz`,
				},
			},
			{
				"@type": "ListItem",
				position: "3",
				name: `${seoFields?.metaTitle || wpQuiz.title}`,
				item: {
					url: `${siteUrl}/quiz/${wpQuiz.slug}`,
					id: `${siteUrl}/quiz/${wpQuiz.slug}`,
				},
			},
		],
	};

	// Prepare answers array for webhook
	const answersArray = questions.map((question, index) => ({
		question: question.question,
		answer: answers[index],
		question_score: calculateQuestionScore(question, answers[index], index)
	}));

	function calculateQuestionScore(question, answer, index) {
		if (answer === undefined || answer === null) return 0;

		let questionScore = 0;
		const weight = question.weight || 1;

		switch (quizFields?.quizAnswerType) {
			case 'multiple_choice':
				if (question.mcAllowMultiple && Array.isArray(answer)) {
					answer.forEach(selectedIndex => {
						const option = question.options?.[selectedIndex];
						questionScore += option?.score || 0;
					});
				} else {
					const option = question.options?.[answer];
					questionScore = option?.score || 0;
				}
				break;

			case 'scale_0_10':
				const override = question.valueScoreMap?.find(map => map.value === answer);
				if (override) {
					questionScore = override.score;
				} else {
					questionScore = answer * (question.pointsPerUnit || 1);
				}
				break;

			case 'true_false':
				questionScore = answer === true
					? (question.scoreIfTrue || 0)
					: (question.scoreIfFalse || 0);
				break;

			default:
				break;
		}

		return questionScore * weight;
	}

	// Render current step
	const renderStep = () => {
		if (currentStep === 'intro') {
			return (
				<QuizIntro
					title={quizFields?.title}
					description={quizFields?.descriptionOfQuiz}
					benefits={quizFields?.benefitsOfQuiz}
					disclaimer={quizFields?.disclaimerText}
					cta={quizFields?.cta}
					onStart={handleStart}
					primaryColour={quizFields?.primaryColour}
					secondaryColour={quizFields?.secondaryColour}
					primaryTextColour={quizFields?.primaryTextColour}
					secondaryTextColour={quizFields?.secondaryTextColour}
					customCss={quizFields?.customCss}
				/>
			);
		}

		if (currentStep === 'email') {
			return (
				<QuizEmailCapture
					webhookUrl={quizFields?.webhookUrl}
					quizTitle={wpQuiz.title}
					quizSlug={wpQuiz.slug}
					score={score}
					answers={answersArray}
					totalQuestions={totalQuestions}
					onSuccess={handleEmailSuccess}
					onBack={handleEmailBack}
					primaryColour={quizFields?.primaryColour}
					secondaryColour={quizFields?.secondaryColour}
					primaryTextColour={quizFields?.primaryTextColour}
					secondaryTextColour={quizFields?.secondaryTextColour}
				/>
			);
		}

		if (currentStep === 'results') {
			return (
				<QuizResults
					resultsHeading={quizFields?.resultsHeading}
					resultsSubheading={quizFields?.resultsSubheading}
					score={score}
					maxPossibleScore={maxPossibleScore}
					totalQuestions={totalQuestions}
					scorecardAssessments={quizFields?.scorecardAssessments}
					discoveryCallIframe={quizFields?.discoveryCallIframe}
					primaryColour={quizFields?.primaryColour}
					secondaryColour={quizFields?.secondaryColour}
					primaryTextColour={quizFields?.primaryTextColour}
					secondaryTextColour={quizFields?.secondaryTextColour}
				/>
			);
		}

		// Question step
		const questionIndex = parseInt(currentStep.split('-')[1]);
		const question = questions[questionIndex];

		if (question) {
			return (
				<QuizQuestion
					quizAnswerType={quizFields?.quizAnswerType}
					question={question}
					answer={answers[questionIndex]}
					onChange={(value) => handleAnswerChange(questionIndex, value)}
					currentQuestion={questionIndex + 1}
					totalQuestions={totalQuestions}
					onNext={() => handleNext(questionIndex)}
					onBack={() => handleBack(questionIndex)}
					primaryColour={quizFields?.primaryColour}
					secondaryColour={quizFields?.secondaryColour}
					primaryTextColour={quizFields?.primaryTextColour}
					secondaryTextColour={quizFields?.secondaryTextColour}
				/>
			);
		}

		return null;
	};

	return (
		<Layout>
			<Helmet>
				<script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
			</Helmet>
			<GatsbySeo
				title={seoFields?.metaTitle || wpQuiz?.title}
				description={seoFields?.metaDescription}
				language="en"
				openGraph={{
					type: "website",
					url: `${siteUrl}/quiz/${wpQuiz.slug}`,
					title: `${seoFields?.opengraphTitle || wpQuiz?.title}`,
					description: `${seoFields?.opengraphDescription}`,
					images: [
						{
							url: `${seoFields?.image?.sourceUrl}`,
							width: `${seoFields?.image?.mediaDetails?.width}`,
							height: `${seoFields?.image?.mediaDetails?.height}`,
							alt: `${seoFields?.image?.altText}`,
						},
					],
				}}
			/>
			
			{renderStep()}
			<style>{`${quizFields?.customCss}`}</style>
		</Layout>
	);
};

export default QuizTemplate;

export const pageQuery = graphql`
	query QuizById($id: String!) {
		site {
			siteMetadata {
				siteUrl
			}
		}

        wpQuiz: wpQuiz(id: { eq: $id }) {
			id
			title
			slug
			seoFields {
				opengraphTitle
				opengraphDescription
				metaTitle
				metaDescription
				fieldGroupName
				productSchema
				image {
					altText
					sourceUrl
					mediaDetails {
						height
						width
					}
				}
			}
			quizFields {
			primaryColour	
			secondaryColour
			primaryTextColour
			secondaryTextColour
			customCss
				quizAnswerType
				title
				descriptionOfQuiz
                webhookUrl
				cta {
					title
					url
					target
				}
				benefitsOfQuiz {
					icon {
						altText
						sourceUrl
						localFile {
							childImageSharp {
								gatsbyImageData(
									formats: [WEBP, AUTO]
									quality: 100
									transformOptions: { cropFocus: CENTER, fit: COVER }
									layout: CONSTRAINED
									placeholder: BLURRED
								)
							}
						}
					}
					benefit
				}
				disclaimerText
				questionsAndAnswers {
					question
					isRequired
					helpText
					weight
					mcAllowMultiple
					options {
						optionLabel
                        optionValue
						score
					}
					minValue
					maxValue
					step
					pointsPerUnit
					valueScoreMap {
						value
						score
					}
					labelTrue
					labelFalse
					scoreIfTrue
					scoreIfFalse
				}
				resultsHeading
				resultsSubheading
				scorecardAssessments {
					scoreRangeLow
					scoreRangeHigh
					insightName
					insight
					nextSteps
				}
				discoveryCallIframe
				
			}
		}
	}
`;
