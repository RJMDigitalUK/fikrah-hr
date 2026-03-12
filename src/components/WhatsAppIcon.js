import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const WhatsAppIcon = () => {
	const data = useStaticQuery(graphql`
		query {
			wicon: wpComponent(slug: { eq: "whatsapp-icon" }) {
				whatsappIconFields {
					backgroundColour
					enabled
					whatsappNumber
					customCss
					icon {
						altText
						sourceUrl
					}
				}
			}
		}
	`);

	const whatsappIcon = data?.wicon?.whatsappIconFields;

	if (!whatsappIcon?.enabled) return null;

	const { whatsappNumber, backgroundColour, icon, customCss } = whatsappIcon;

	return (
		<>
			<div 
				className="position-fixed whatsapp-icon"
				style={{
					bottom: '20px',
					right: '20px',
					zIndex: 1000,
					backgroundColor: backgroundColour || '#25D366',
					borderRadius: '50%',
					padding: '12px',
					cursor: 'pointer',
					boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
				}}
				onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
			>
				{icon?.sourceUrl ? (
					<img 
						src={icon.sourceUrl}
						alt={icon.altText || 'WhatsApp'}
						style={{ width: '24px', height: '24px' }}
                        className="whatsapp-icon-image"
					/>
				) : (
					<span style={{ color: 'white', fontSize: '20px' }}>💬</span>
				)}
			</div>
			{customCss && (
				<style>{`${customCss}`}</style>
			)}
		</>
	);
};

export default WhatsAppIcon;
