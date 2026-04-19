import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="FooterInner">
        <div className="FooterLeft">
          <div className="FooterBrandRow">
            <img className="FooterLogo" src="/logo.png" alt="Kenitra Football School logo" />
            <div>
              <div className="BrandName">Kenitra Football School</div>
              <div className="FooterMeta">© 2026 KFS</div>
            </div>
          </div>
          <div className="FooterDesc">
            Football academy focused on technique, discipline, and player development.
          </div>
        </div>
        <div className="FooterRight">
          <Link to="/#home">Home</Link>
          <Link to="/#about">About</Link>
          <Link to="/inscription">Registration</Link>
          <Link to="/#contact">Contact</Link>
        </div>
        <div className="FooterSocial" aria-label="Social media">
          <a
            className="SocialLink"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Facebook
          </a>
          <a
            className="SocialLink"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

