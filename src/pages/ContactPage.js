import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="App">
      <div className="Shell">
        <Navbar />
        <main className="Main">
          <section className="Section ContactSection">
            <div className="ContactHeaderWrap">
              <h1 className="ContactTitle">Get in Touch</h1>
              <p className="ContactSubtitle">We would love to hear from you. We generally reply within 24 hours.</p>
            </div>
            
            <div className="ContactSplit">
              <div className="ContactCard ContactInfoCard">
                <div className="ContactInfoTitle">Contact Information</div>
                <div className="ContactInfoList">
                  <div className="ContactItem">
                    <div className="ContactIcon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="ContactItemLabel">Phone</div>
                      <div className="ContactItemValue">0752070189</div>
                    </div>
                  </div>
                  <div className="ContactItem">
                    <div className="ContactIcon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="ContactItemLabel">Email</div>
                      <div className="ContactItemValue">driss.raaidi@gmail.com</div>
                    </div>
                  </div>
                  <div className="ContactItem">
                    <div className="ContactIcon">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="ContactItemLabel">Location</div>
                      <div className="ContactItemValue">Kénitra, Morocco</div>
                    </div>
                  </div>
                </div>
                
                <div className="ContactHintBox">
                  Prefer a full registration? <Link to="/inscription" className="ContactHintLink">Open form &rarr;</Link>
                </div>
              </div>
              
              <div className="ContactCard ContactFormCard">
                <div className="ContactFormTitle">Send a message</div>
                <form className="Form ContactForm" onSubmit={(e) => e.preventDefault()}>
                  <label className="PremiumField">
                    <span>Full Name</span>
                    <input placeholder="John Doe" autoComplete="name" />
                  </label>
                  <label className="PremiumField">
                    <span>Email Address</span>
                    <input type="email" placeholder="john@example.com" autoComplete="email" />
                  </label>
                  <label className="PremiumField">
                    <span>Message</span>
                    <textarea placeholder="How can we help you?" rows={4} />
                  </label>
                  <button className="Button ButtonPrimary ButtonFull ContactSubmit" type="submit">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
