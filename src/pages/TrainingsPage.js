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

export default function TrainingsPage() {
  return (
    <div className="App">
      <div className="Shell">
        <Navbar />
        <main className="Main">
          <section className="Section">
            <div className="SectionHeader">
              <h1 className="SectionTitle">Our Programs / Trainings</h1>
              <p className="SectionSubtitle">Choose a program that matches your level.</p>
            </div>
            <div className="Cards4">
              <article className="Card CardHover">
                <div className="CardTop">
                  <IconBubble variant="brand">👶</IconBubble>
                  <div className="CardTitle">Kids Training</div>
                </div>
                <p className="CardText">Basics, coordination, fun sessions, and ball mastery.</p>
              </article>
              <article className="Card CardHover">
                <div className="CardTop">
                  <IconBubble variant="cyan">🧑</IconBubble>
                  <div className="CardTitle">Youth Training</div>
                </div>
                <p className="CardText">Technique under pressure + tactical understanding.</p>
              </article>
              <article className="Card CardHover">
                <div className="CardTop">
                  <IconBubble variant="gold">🏆</IconBubble>
                  <div className="CardTitle">Professional Training</div>
                </div>
                <p className="CardText">High intensity, competition prep, and individual plans.</p>
              </article>
              <article className="Card CardHover">
                <div className="CardTop">
                  <IconBubble variant="purple">🧤</IconBubble>
                  <div className="CardTitle">Goalkeeper Training</div>
                </div>
                <p className="CardText">Footwork, handling, positioning, and game situations.</p>
              </article>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
