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

export default function AboutPage() {
  return (
    <div className="App">
      <div className="Shell">
        <Navbar />
        <main className="Main">
          <section className="Section">
            <div className="SectionHeader">
              <h1 className="SectionTitle">Who We Are</h1>
              <p className="SectionSubtitle">A football school built for progress.</p>
            </div>
            <div className="Split AboutSplit">
              <div className="Card">
                <p className="CardText Lead">
                  Kenitra Football School is a modern football academy focused on player development: technique, tactical understanding,
                  physical conditioning, and mindset. Our goal is to build a clear pathway from fundamentals to competitive performance.
                </p>
                <div className="AboutPoints">
                  <div className="Point">
                    <IconBubble variant="brand">⚽</IconBubble>
                    <div>
                      <div className="PointTitle">Training methodology</div>
                      <div className="PointText">Clear objectives + quality repetition</div>
                    </div>
                  </div>
                  <div className="Point">
                    <IconBubble variant="cyan">🧠</IconBubble>
                    <div>
                      <div className="PointTitle">Game intelligence</div>
                      <div className="PointText">Faster decisions on the pitch</div>
                    </div>
                  </div>
                  <div className="Point">
                    <IconBubble variant="purple">🏆</IconBubble>
                    <div>
                      <div className="PointTitle">Pathway</div>
                      <div className="PointText">From foundation to performance</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Card AboutMedia" style={{ backgroundImage: "url('/about-bg.png')" }} aria-label="About image">
                <div className="MediaFrame">
                  <div className="MediaBadge">KFS • EST 2026</div>
                  <div className="MediaTitle">Training culture</div>
                  <div className="MediaSub">Discipline • Work • Identity</div>
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
