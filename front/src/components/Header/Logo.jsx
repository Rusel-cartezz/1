import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

export const Logo = ({ closeMenu }) => (
  <div className="logo-container">
    <Link to="/" onClick={closeMenu}>
      <div className="logo">
        <svg className="logo-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10L25 15L20 20L15 15L20 10Z" stroke="url(#logo-gradient)" strokeWidth="2"/>
          <path d="M25 15L30 20L25 25L20 20L25 15Z" stroke="url(#logo-gradient)" strokeWidth="2"/>
          <path d="M15 15L20 20L15 25L10 20L15 15Z" stroke="url(#logo-gradient)" strokeWidth="2"/>
          <path d="M20 20L25 25L20 30L15 25L20 20Z" stroke="url(#logo-gradient)" strokeWidth="2"/>
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe"/>
              <stop offset="100%" stopColor="#9b22ff"/>
            </linearGradient>
          </defs>
        </svg>
        <h1 className="logo-text">
          <span className="cyber">CYBER</span>
          <span className="clinic">CLINIC</span>
        </h1>
      </div>
    </Link>
  </div>
);