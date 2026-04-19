import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function IconBubble({ children, variant = 'brand' }) {
  return (
    <div className={`IconBubble ${variant}`} aria-hidden="true">
      {children}
    </div>
  );
}

export default function TeamsPage() {
  return (
    <div className="App">
      <div className="Shell">
        <Navbar />
        <main className="Main">
          <section className="Section">
            <div className="SectionHeader">
              <h1 className="SectionTitle">Why Choose Us</h1>
              <p className="SectionSubtitle">Strong points that make the difference.</p>
            </div>
            <div className="WhyGrid">
              <div className="WhyItem">
                <IconBubble variant="brand">🧑‍🏫</IconBubble>
                <div>
                  <div className="WhyTitle">Certified Coaches</div>
                  <div className="WhyText">Modern coaching with personalized follow-up.</div>
                </div>
              </div>
              <div className="WhyItem">
                <IconBubble variant="cyan">⚽</IconBubble>
                <div>
                  <div className="WhyTitle">Modern Training</div>
                  <div className="WhyText">Structured sessions with targets for each player.</div>
                </div>
              </div>
              <div className="WhyItem">
                <IconBubble variant="purple">🏟️</IconBubble>
                <div>
                  <div className="WhyTitle">Real Matches Experience</div>
                  <div className="WhyText">Friendly games + tournaments</div>
                </div>
              </div>
              <div className="WhyItem">
                <IconBubble variant="gold">📈</IconBubble>
                <div>
                  <div className="WhyTitle">Player Development</div>
                  <div className="WhyText">Progress tracking with continuous feedback.</div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
