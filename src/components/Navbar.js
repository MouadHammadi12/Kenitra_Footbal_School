import React from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#teams', label: 'Teams' },
  { href: '#trainings', label: 'Trainings' },
  { href: '#contact', label: 'Contact' },
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
      <div className="Brand" aria-label="Kenitra Football School">
        <div className="BrandLogoWrap" aria-hidden="true">
          <img className="BrandLogo" src="/logo.png" alt="" />
        </div>
        <div className="BrandText">
          <div className="BrandName">Kenitra Football School</div>
          <div className="BrandTag">Académie • Formation • Performance</div>
        </div>
      </div>

      <nav className="NavLinks" aria-label="Navigation">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="NavActions">
        <a className="Button ButtonPrimary" href="#contact">
          Join Now
        </a>
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
              <a key={l.href} href={l.href} onClick={() => setIsOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="MobileCta">
            <a className="Button ButtonPrimary ButtonFull" href="#contact" onClick={() => setIsOpen(false)}>
              Join Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

