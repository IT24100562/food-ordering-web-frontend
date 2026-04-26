import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="top-bar">
      <div className="top-inner">
        <div className="top-left">
          <NavLink to="/" className="brand-wordmark">Dine n me</NavLink>
          <nav className="top-nav-links">
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive ? "top-link active" : "top-link"
              }
            >
              Menu
            </NavLink>
            <a href="/#reservations" className="top-link">Reservations</a>
            <a href="/#private-dining" className="top-link">Private Dining</a>
            <a href="/#story" className="top-link">Our Story</a>
          </nav>
        </div>

        <div className="top-right">
          <div className="top-search">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search menu..." aria-label="Search menu" />
          </div>
          <button type="button" className="icon-btn" aria-label="Cart">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button type="button" className="icon-btn" aria-label="Profile">
            <span className="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
