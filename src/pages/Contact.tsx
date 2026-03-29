import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="section__container">
      <h2 className="section__header">CONTACT US</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '2rem' }} className="contact-grid">
        <div>
          <h3>Get in Touch</h3>
          <p style={{ margin: '1rem 0', color: '#737373' }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem' }}>
              <i className="ri-mail-line" style={{ marginRight: '10px' }}></i>
              auraofgenzy@gmail.com
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <i className="ri-phone-line" style={{ marginRight: '10px' }}></i>
              +7725878970
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <i className="ri-whatsapp-line" style={{ marginRight: '10px' }}></i>
              Chat on WhatsApp
            </li>
          </ul>
        </div>
        <div>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }} 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }} 
            />
            <textarea 
              placeholder="Your Message" 
              rows={5} 
              style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '5px', fontFamily: 'inherit' }}
            ></textarea>
            <button className="btn" type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
