import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* KeenKeeper Heading */}
        <h1 className="footer-heading">KeenKeeper</h1>

        {/* Description */}
        <p className="footer-description">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links Heading */}
        <h4 className="social-heading">Social Links</h4>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="#" aria-label="Social 1" className="social-link">
            <img src="/assets/social-icon-1.png" alt="Social" className="social-icon" />
          </a>
          <a href="#" aria-label="Social 2" className="social-link">
            <img src="/assets/social-icon-2.png" alt="Social" className="social-icon" />
          </a>
          <a href="#" aria-label="Social 3" className="social-link">
            <img src="/assets/social-icon-3.png" alt="Social" className="social-icon" />
          </a>
        </div>

        {/* Copyright */}
        <p className="copyright">© 2026 KeenKeeper. All rights reserved.</p>

        {/* Legal Links */}
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="#">Terms of Service</a>
          <span className="separator">|</span>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;