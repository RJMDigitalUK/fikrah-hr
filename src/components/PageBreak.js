import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PageBreak = ({ keyBenefits, backgroundColour, keyBenefitsTextColour, customCss }) => {
	return (
		<section 
			className="pagebreak-section py-4 overflow-hidden d-flex align-items-center"
			style={{ backgroundColor: backgroundColour }}
		>
			<div className="pagebreak-content-container w-100">
				{keyBenefits && keyBenefits.length > 0 && (
					<div className="w-100">
						<div className="benefits-marquee d-flex">
							{keyBenefits.map((benefit, index) => (
								<p 
									key={index} 
									className="pagebreak-benefit-text benefit-item px-5 px-lg-5 px-xl-10 mb-0"
									style={{ color: keyBenefitsTextColour }}
								>
									{benefit.benefitText || benefit.benefit}
								</p>
							))}
							
						</div>
					</div>
				)}
			</div>
			
			<style>{`
				.benefits-marquee {
					animation: scroll-left 30s linear infinite;
					white-space: nowrap;
				}
				
				.benefit-item {
					white-space: nowrap;
				}
				
				@keyframes scroll-left {
					0% {
						transform: translateX(100%);
					}
					100% {
						transform: translateX(-100%);
					}
				}
				
				@media (min-width: 992px) {
					.benefits-marquee {
						animation: none;
						justify-content: center !important;
						align-items: center;
						min-height: 1.875rem;
					}
					
					.benefit-item {
						margin-right: 0 !important;
						font-size: 1.375rem;
						margin-top: 0;
						margin-bottom: 0;
						line-height: 1.2;
					}
				}
			`}</style>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</section>
	);
};

export default PageBreak;