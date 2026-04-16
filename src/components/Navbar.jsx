import { Link, useLocation } from 'react-router-dom';
import '../Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <Link to="/" className="navbar-logo">
          <img src="/assets/logo.png" alt="logo" className="logo-img" />
        </Link>

        {/* NAV LINKS */}
        <div className="navbar-links">
          {/* Home Link */}
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <img src="/assets/Vector.png" alt="Home" className="nav-icon" />
            <span>Home</span>
          </Link>

          {/* Timeline Link */}
          <Link
            to="/timeline"
            className={`nav-link ${isActive('/timeline') ? 'active' : ''}`}
          >
            <img src="/assets/Timeline.png" alt="Timeline" className="nav-icon" />
            <span>Timeline</span>
          </Link>

          {/* Stats Link */}
          <Link
            to="/stats"
            className={`nav-link ${isActive('/stats') ? 'active' : ''}`}
          >
            <img src="/assets/Stats.png" alt="Stats" className="nav-icon" />
            <span>Stats</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;