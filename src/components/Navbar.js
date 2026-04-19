import React from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/#home', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/#teams', label: 'Teams' },
  { to: '/#trainings', label: 'Trainings' },
  { to: '/inscription', label: 'Registration' },
  { to: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="TopNav">
      <Link className="Brand" aria-label="Kenitra Football School" to="/">
        <div className="BrandLogoWrap" aria-hidden="true">
          <img className="BrandLogo" src="/logo.png" alt="" />
        </div>
        <div className="BrandText">
          <div className="BrandName">Kenitra Football School</div>
          <div className="BrandTag">Académie • Formation • Performance</div>
        </div>
      </Link>

      <nav className="NavLinks" aria-label="Navigation">
        {NAV_LINKS.map((l) => (
          <Link key={l.to} to={l.to}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="NavActions">
        <Link className="Button ButtonPrimary" to="/inscription">
          Join Now
        </Link>
        <button
          type="button"
          className="Hamburger"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="HamburgerLines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className={`MobileMenu ${isOpen ? 'isOpen' : ''}`} id="mobile-menu" aria-hidden={!isOpen}>
        <button type="button" className="MobileBackdrop" onClick={() => setIsOpen(false)} aria-label="Close menu" />
        <div className="MobilePanel" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="MobileHeader">
            <div className="MobileBrand">
              <img className="MobileLogo" src="/logo.png" alt="Kenitra Football School logo" />
              <div>
                <div className="BrandName">KFS</div>
                <div className="BrandTag">Kenitra Football School</div>
              </div>
            </div>
            <button type="button" className="MobileClose" onClick={() => setIsOpen(false)} aria-label="Close">
              ✕
            </button>
          </div>

          <nav className="MobileLinks" aria-label="Mobile navigation">
            {NAV_LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setIsOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="MobileCta">
            <Link className="Button ButtonPrimary ButtonFull" to="/inscription" onClick={() => setIsOpen(false)}>
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

