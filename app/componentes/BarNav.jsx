'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MoreHorizontal, ChevronDown } from 'lucide-react';
import '../styles/BarNav.css';

export default function BarNav() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Solo en cliente, asigna el nombre dinámico
    setUserName('Bienvenido UserName');
  }, []);

  return (
    <header className="bar-nav">
      <button className="bar-menu-btn">
        <MoreHorizontal size={18} />
      </button>

      <div className="bar-right">
        <p className="bar-name">{userName || 'UserName'}</p>

        <div className="bar-user"
          onClick={() => setMenuAbierto(!menuAbierto)
          }>
          <img
            src="/perfil.png"
            alt="Usuario"
            className="bar-user-img"
          />
          <ChevronDown size={16} className={`bar-user-icon ${menuAbierto ? 'rotate' : ''}`} />
        </div>

        {menuAbierto && (
          <div className="bar-dropdown">
            <Link href="/perfil" className="bar-dropdown-item">Perfil</Link>
            <button className="bar-dropdown-item">Cerrar sesión</button>
          </div>
        )}

      </div>
    </header>
  );
}

