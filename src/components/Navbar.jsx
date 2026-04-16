import { useState, useEffect } from 'react';

const NAV_SECTIONS = ['skills', 'projects', 'experience', 'contact'];

export default function Navbar({ profile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Scroll handler for translucent to solid background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlight nav item based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${menuOpen ? 'nav-open' : ''} ${scrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
        <div className="nav-container-centered">
          <div className="nav-links">
            {NAV_SECTIONS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <button
              data-cal-link="vijay-sundar-nagumalla"
              data-cal-config='{"layout":"month_view"}'
              className="nav-hire"
            >
              Grab a Slot
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            id="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        {NAV_SECTIONS.map((id) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
        <button 
          data-cal-link="vijay-sundar-nagumalla" 
          className="nav-hire" 
          onClick={closeMenu}
        >
          Grab a Slot
        </button>
      </div>
    </>
  );
}
