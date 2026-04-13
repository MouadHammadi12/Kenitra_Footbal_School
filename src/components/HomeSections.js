import React from 'react';

function IconBubble({ children, variant = 'brand' }) {
  return (
    <div className={`IconBubble ${variant}`} aria-hidden="true">
      {children}
    </div>
  );
}

export default function HomeSections() {
  return (
    <>
      <section id="about" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Who We Are</h2>
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
          <div
            className="Card AboutMedia"
            style={{ backgroundImage: "url('/about-bg.png')" }}
            aria-label="About image"
          >
            <div className="MediaFrame">
              <div className="MediaBadge">KFS • EST 2026</div>
              <div className="MediaTitle">Training culture</div>
              <div className="MediaSub">Discipline • Work • Identity</div>
            </div>
          </div>
        </div>
      </section>

      <section id="trainings" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Our Programs / Trainings</h2>
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

      <section id="teams" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Why Choose Us</h2>
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

      <section id="gallery" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Gallery</h2>
          <p className="SectionSubtitle">Trainings • Matches • Players</p>
        </div>
        <div className="GalleryGrid">
          <figure className="GalleryItem" aria-label="Trainings">
            <img className="GalleryImg" src="/gallery/training-1.png" alt="Training - stadium ball" />
            <figcaption className="GalleryLabel">Trainings</figcaption>
          </figure>
          <figure className="GalleryItem" aria-label="Matches">
            <img className="GalleryImg" src="/gallery/training-2.png" alt="Player training with ball" />
            <figcaption className="GalleryLabel">Matches</figcaption>
          </figure>
          <figure className="GalleryItem" aria-label="Players">
            <img className="GalleryImg" src="/gallery/training-3.png" alt="Player dribbling with ball" />
            <figcaption className="GalleryLabel">Players</figcaption>
          </figure>
          <figure className="GalleryItem" aria-label="Team Spirit">
            <img className="GalleryImg" src="/gallery/training-4.png" alt="Football action shot" />
            <figcaption className="GalleryLabel">Team Spirit</figcaption>
          </figure>
          <figure className="GalleryItem" aria-label="Highlights">
            <img className="GalleryImg" src="/gallery/training-5.png" alt="Football energy highlight" />
            <figcaption className="GalleryLabel">Highlights</figcaption>
          </figure>
        </div>
      </section>

      <section id="events" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Upcoming Matches / Events</h2>
          <p className="SectionSubtitle">Next schedule (example).</p>
        </div>
        <div className="Cards3">
          <div className="Card CardHover">
            <div className="EventTop">
              <div className="Chip">Match</div>
              <div className="EventDate">Sat • 18:30</div>
            </div>
            <div className="EventTitle">KFS vs Team X</div>
            <div className="EventMeta">Stadium: Kenitra • Friendly game</div>
          </div>
          <div className="Card CardHover">
            <div className="EventTop">
              <div className="Chip ChipAlt">Training</div>
              <div className="EventDate">Mon • 19:00</div>
            </div>
            <div className="EventTitle">Finishing session</div>
            <div className="EventMeta">Theme: first touch + shooting</div>
          </div>
          <div className="Card CardHover">
            <div className="EventTop">
              <div className="Chip">Meeting</div>
              <div className="EventDate">Fri • 20:00</div>
            </div>
            <div className="EventTitle">Parents & players talk</div>
            <div className="EventMeta">Objectives • rules • pathway</div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Testimonials</h2>
          <p className="SectionSubtitle">Players & parents feedback.</p>
        </div>
        <div className="Cards3">
          <blockquote className="Card Quote">
            <div className="QuoteText">“Best football school in Kenitra!”</div>
            <div className="QuoteMeta">— Parent</div>
          </blockquote>
          <blockquote className="Card Quote">
            <div className="QuoteText">“Training organized and coaches always help.”</div>
            <div className="QuoteMeta">— Player</div>
          </blockquote>
          <blockquote className="Card Quote">
            <div className="QuoteText">“My technique and confidence improved so fast.”</div>
            <div className="QuoteMeta">— Player</div>
          </blockquote>
        </div>
      </section>

      <section id="contact" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Contact</h2>
          <p className="SectionSubtitle">We reply quickly (demo content).</p>
        </div>
        <div className="Split">
          <div className="Card">
            <div className="InfoList">
              <div className="InfoItem">
                <div className="InfoLabel">Phone</div>
                <div className="InfoValue">+212 ...</div>
              </div>
              <div className="InfoItem">
                <div className="InfoLabel">Email</div>
                <div className="InfoValue">contact@kfs.ma</div>
              </div>
              <div className="InfoItem">
                <div className="InfoLabel">Location</div>
                <div className="InfoValue">Kénitra, Morocco</div>
              </div>
            </div>
            <div className="Divider" />
            <div className="Hint">We can connect this to WhatsApp or email later.</div>
          </div>
          <div className="Card">
            <div className="CardTitle">Send a message</div>
            <form className="Form" onSubmit={(e) => e.preventDefault()}>
              <label className="Field">
                <span>Name</span>
                <input placeholder="Your name" autoComplete="name" />
              </label>
              <label className="Field">
                <span>Message</span>
                <textarea placeholder="Write your message..." rows={5} />
              </label>
              <button className="Button ButtonPrimary ButtonFull" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

