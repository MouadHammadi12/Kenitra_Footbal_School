import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section id="home" className="Hero2" aria-label="Hero">
      <div
        className="Hero2Bg"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        role="img"
        aria-label="Football training background"
      />
      <div className="Hero2Overlay" aria-hidden="true" />

      <div className="Hero2Inner">
        <div className="Hero2Content">
          <div className="Pill">Kenitra Football School</div>
          <h1 className="Hero2Title">Build Your Football Future ⚽</h1>
          <p className="Hero2Subtitle">
            Join Kenitra Football School and become a professional player
          </p>
          <div className="Hero2Ctas">
            <Link className="Button ButtonPrimary" to="/inscription">
              Join Now
            </Link>
            <Link className="Button ButtonGhost" to="/#about">
              Learn More
            </Link>
          </div>

          <div className="Hero2Badges" aria-label="Highlights">
            <div className="Badge">
              <div className="BadgeIcon" aria-hidden="true">
                🧑‍🏫
              </div>
              <div>
                <div className="BadgeTitle">Certified Coaches</div>
                <div className="BadgeText">Guidance + discipline</div>
              </div>
            </div>
            <div className="Badge">
              <div className="BadgeIcon" aria-hidden="true">
                🏟️
              </div>
              <div>
                <div className="BadgeTitle">Real Match Experience</div>
                <div className="BadgeText">Learn to compete</div>
              </div>
            </div>
            <div className="Badge">
              <div className="BadgeIcon" aria-hidden="true">
                📈
              </div>
              <div>
                <div className="BadgeTitle">Player Development</div>
                <div className="BadgeText">Step-by-step pathway</div>
              </div>
            </div>
          </div>
        </div>

        <div className="Hero2Side">
          <div className="Card CardGlow">
            <div className="CardTitle">Quick info</div>
            <div className="InfoList">
              <div className="InfoItem">
                <div className="InfoLabel">Teams</div>
                <div className="InfoValue">Kids • Youth • Pro</div>
              </div>
              <div className="InfoItem">
                <div className="InfoLabel">Trainings</div>
                <div className="InfoValue">Technique • Tactics</div>
              </div>
              <div className="InfoItem">
                <div className="InfoLabel">Start</div>
                <div className="InfoValue">Weekly sessions</div>
              </div>
            </div>
            <div className="Divider" />
            <Link className="Button ButtonPrimary ButtonFull" to="/inscription">
              Book a trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

