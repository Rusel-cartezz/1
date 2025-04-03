import React from 'react';
import { Link } from 'react-router-dom';
import './DesktopNav.css';

export const DesktopNav = ({ location }) => (
  <nav className="desktop-nav">
    <ul className="nav-list">
      <li>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          Главная
        </Link>
      </li>
      <li>
        <Link to="/reviews" className={`nav-link ${location.pathname === '/reviews' ? 'active' : ''}`}>
          Отзывы
        </Link>
      </li>
      <li>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
          О нас
        </Link>
      </li>
    </ul>
  </nav>
);