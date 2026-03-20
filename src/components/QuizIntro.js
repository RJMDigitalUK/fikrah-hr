import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useMediaQuery } from "react-responsive";

const QuizIntro = ({ title, description, benefits, disclaimer, cta, onStart, primaryColour, secondaryColour, primaryTextColour, secondaryTextColour }) => {
	const isDesktop = useMediaQuery({ minWidth: 768 });
	
	return (
		<section className="quiz-intro-section py-5">
			<Container className="">
			<div className="quiz-intro-card mx-3 mx-md-5 mx-lg-9 rounded-3 overflow-hidden">
					<Row className="justify-content-center py-4 py-lg-5 px-md-4" style={{background: primaryColour}}>
						<Col xs={12}>
							{title && (
								<h1 className="text-center quiz-title" style={{color:primaryTextColour}}>{title}</h1>
							)}
							
						</Col>
					</Row>

				{benefits && benefits.length > 0 && (
					<Row className="pb-5 quiz-benefits-row">
						<hr className="mt-2 mb-5 border-3 opacity-100" style={{borderColor: primaryColour}}/>
						{description && (
								<p className="text-center  mb-5 px-lg-9 pb-lg-5">{description}</p>
							)}
						{benefits.map((benefit, index) => {
    const icon = getImage(benefit?.icon?.localFile);
    return (
        <Col xs={12} md={4} key={index}>
            <div className="position-relative d-flex d-md-block align-items-center py-2 py-md-2 px-md-1 mb-3 rounded-start-3 rounded-top-3 h-md-100 w-lg-75 mx-lg-auto" style={{background: secondaryColour, color: secondaryTextColour}}>
                {icon && (
                    <div 
                        className="quiz-benefit-icon ms-3 me-3 d-flex justify-content-center align-items-center"
                        style={isDesktop ? {
                            position: 'absolute',
                            top: '0',
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-50%)'
                        } : {}}
                    >
                        <GatsbyImage
                            image={icon}
                            alt={benefit?.icon?.altText || "Benefit icon"}
                            className="mb-0"
							style={isDesktop ? {
								maxHeight: '60px',
								maxWidth: '60px'
							}: { maxHeight: '40px', maxWidth: '40px' }}
                        />
                    </div>
                )}
                {!icon && benefit?.icon?.sourceUrl && (
                    <div 
                        className="quiz-benefit-icon ms-3 me-3 d-flex justify-content-center align-items-center"
                        style={isDesktop ? {
                            position: 'absolute',
                            top: '0',
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                            maxWidth: '60px',
                            maxHeight: '60px'
                        } : { maxWidth: '60px', maxHeight: '60px' }}
                    >
                        <img
                            src={benefit.icon.sourceUrl}
                            alt={benefit?.icon?.altText || "Benefit icon"}
                            className="mb-0"
							style={isDesktop ? {
								maxHeight: '60px',
								maxWidth: '60px'
							}: { maxHeight: '40px', maxWidth: '40px' }}
                        />
                    </div>
                )}
                {benefit?.benefit && (
                    <p className="quiz-benefit-text mb-0 ms-3 ms-md-0 px-md-3 py-md-0 mt-md-4 text-md-center" style={{color: secondaryTextColour}}>{benefit.benefit}</p>
                )}
            </div>
        </Col>
    );
})}
					</Row>
				)}

				<Row className="justify-content-center bg-white pb-4 pt-lg-5">
					<Col xs={12} md={6} className="text-center">
						{cta && cta.title && (
							<Button
								variant="primary"
								size="lg"
								onClick={onStart}
								className="mb-3 rounded-1 py-3 px-4"
							>
								{cta.title}
							</Button>
						)}
						{disclaimer && (
							<small className="text-muted d-block">{disclaimer}</small>
						)}
					</Col>
				</Row>
			</div>
		</Container>			
		</section>
	);
};

export default QuizIntro;
