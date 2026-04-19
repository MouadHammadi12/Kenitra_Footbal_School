import React from 'react';

export default function HomeSections() {
  return (
    <>


      <section id="gallery" className="Section">
        <div className="SectionHeader">
          <h2 className="SectionTitle">Gallery</h2>
          <p className="SectionSubtitle">Trainings • Matches • Players</p>
        </div>
        <div className="GalleryMarqueeWrap">
          <div className="GalleryMarqueeTrack">
            {/* Set 1 */}
            <figure className="GalleryMarqueeItem" aria-label="Coach">
              <img className="GalleryImg" src="/gallery/slider-1.jpg" alt="Coach on field" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Team 1">
              <img className="GalleryImg" src="/gallery/slider-2.jpg" alt="Team line-up red" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Team 2">
              <img className="GalleryImg" src="/gallery/slider-3.jpg" alt="Team line-up trees" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Kids Team">
              <img className="GalleryImg" src="/gallery/slider-4.jpg" alt="Kids team" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Youth Team">
              <img className="GalleryImg" src="/gallery/slider-5.jpg" alt="Youth team posing" />
            </figure>
            {/* Set 2 for infinite effect */}
            <figure className="GalleryMarqueeItem" aria-label="Coach">
              <img className="GalleryImg" src="/gallery/slider-1.jpg" alt="Coach on field" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Team 1">
              <img className="GalleryImg" src="/gallery/slider-2.jpg" alt="Team line-up red" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Team 2">
              <img className="GalleryImg" src="/gallery/slider-3.jpg" alt="Team line-up trees" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Kids Team">
              <img className="GalleryImg" src="/gallery/slider-4.jpg" alt="Kids team" />
            </figure>
            <figure className="GalleryMarqueeItem" aria-label="Youth Team">
              <img className="GalleryImg" src="/gallery/slider-5.jpg" alt="Youth team posing" />
            </figure>
          </div>
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


    </>
  );
}

