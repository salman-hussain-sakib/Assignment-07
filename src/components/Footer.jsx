import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* KeenKeeper Logo Image - 450px x 60px */}
        <img 
          src="/assets/logo-xl.png" 
          alt="" 
          className="footer-logo-img"
        />

        {/* Description */}
        <p className="footer-description">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links Heading */}
        <h4 className="social-heading">Social Links</h4>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="https://www.facebook.com/SAKIB.SALMAN.HUSSAIN" aria-label="Social 1" className="social-link">
            <img src="/assets/facebook.png" alt="Social" className="social-icon" />
          </a>
          <a href="https://x.com/sakibsalmanh" aria-label="Social 2" className="social-link">
            <img src="/assets/twitter.png" alt="Social" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/hussainsakib.dm" aria-label="Social 3" className="social-link">
            <img src="/assets/instagram.png" alt="Social" className="social-icon" />
          </a>
        </div>

        {/* Footer Bottom - Copyright Left, Legal Links Right */}
        <div className="footer-bottom">
          <p className="copyright">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms of Service</a>
            <span className="separator">|</span>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;