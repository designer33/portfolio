import React from 'react';
import ContactSection from '../components/ContactSection';

const Contact = () => {
    return (
        <div className="pt-8">
            <ContactSection />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="glass rounded-2xl overflow-hidden h-96 w-full mt-10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106364.6300185987!2d72.9372433!3d33.6063989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df948974419acb%3A0x984357e1632d30f!2sRawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1683058866179!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: "grayscale(20%) invert(90%) hue-rotate(180deg)" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="dark:opacity-80"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;
