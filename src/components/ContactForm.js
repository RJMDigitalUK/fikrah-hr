import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SafeHtmlParser } from "./SafeHtmlParser";

function ContactForm({ backgroundColour, headingTextColour, heading, description, iframe, redirectUrl, customCss, webhookUrl, submitButton, descriptionTextColour }) {
    const [cleanHtml, setCleanHtml] = useState(null);
    // Default demo embed (used for testing when no iframe prop is provided)
    const defaultIframe = `
<iframe
    src="https://hubapi.mativus.com/widget/form/jNQs4Nreib2RpiOyQqbJ"
    style="width:100%;height:100%;border:none;border-radius:3px"
    id="inline-jNQs4Nreib2RpiOyQqbJ"
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Demo contact form"
    data-height="742"
    data-layout-iframe-id="inline-jNQs4Nreib2RpiOyQqbJ"
    data-form-id="jNQs4Nreib2RpiOyQqbJ"
    title="Demo contact form"
>
</iframe>
<script src="https://hubapi.mativus.com/js/form_embed.js"></script>
`;
    
    useEffect(() => {
    const source = iframe || defaultIframe;
    if (!source || typeof window === 'undefined') return;

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(source, 'text/html');

            // Extract and remove any <script> tags from the provided HTML
            const scripts = Array.from(doc.querySelectorAll('script'));
            scripts.forEach(s => s.remove());

            const cleaned = doc.body.innerHTML;
            // Set cleaned HTML so it can be rendered (sanitized by SafeHtmlParser)
            setCleanHtml(cleaned);

            // Append external scripts (if any) after a short delay so the iframe is mounted
            const externalScripts = scripts.map(s => ({ src: s.src, inline: s.src ? null : s.textContent }));

            if (externalScripts.length) {
                // wait a tick to allow React to mount the iframe
                setTimeout(() => {
                    externalScripts.forEach(({ src, inline }) => {
                        if (src) {
                            // avoid duplicate script insertion
                            if (!document.querySelector(`script[src="${src}"]`)) {
                                const scr = document.createElement('script');
                                scr.src = src;
                                scr.async = true;
                                document.body.appendChild(scr);
                            }
                        } else if (inline) {
                            // inline scripts are rare for trusted providers; append as a new script
                            const scr = document.createElement('script');
                            scr.type = 'text/javascript';
                            scr.text = inline;
                            document.body.appendChild(scr);
                        }
                    });
                }, 50);
            }
        } catch (err) {
            // parsing failed — fall back to rendering raw iframe string (client-side only)
            console.error('Failed to parse iframe HTML:', err);
            setCleanHtml(source);
        }
    }, [iframe]);

    return (
        <section 
            className="py-5 contact-form-section"
            style={{ backgroundColor: backgroundColour }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col xl={6}>
                        {heading && (
                            <h2 
                                className="contact-form-heading text-center text-xl-start mb-3"
                                style={{ color: headingTextColour }}
                            >
                                {heading}
                            </h2>
                        )}
                        {description && (
                            <SafeHtmlParser 
                                className="contact-form-description text-center text-xl-start mb-4 " 
                                htmlContent={description} 
                                style={{color: descriptionTextColour}}
                            />
                        )}        
					            
                           
                        
                    </Col>
					<Col xl={6}>
					 {typeof window !== 'undefined' && cleanHtml && (
                                <SafeHtmlParser htmlContent={cleanHtml} />
                            )}
					</Col>
                </Row>
				
					
					
            </Container>
            {customCss && (
				<style>{`${customCss}`}</style>
			)}
        </section>
    );

}
export default ContactForm;
