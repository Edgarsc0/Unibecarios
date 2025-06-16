'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MoreHorizontal, ChevronDown } from 'lucide-react';
import '../styles/BarNav.css';
import useSession from '@/hooks/useSession';
import { logout } from '@/serverActions/logout';

export default function BarNav() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogOut = async () => {
    await logout();
    window.location.reload();
  }

  const { session, loading, isAuthenticated } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <header className="bar-nav">
      <button className="bar-menu-btn">
        <MoreHorizontal size={18} />
      </button>

      <div className="bar-right">
        {isMounted ? (
          <p className="bar-name">
            {loading ? 'Cargando...' : session?.userCompleteName || session?.adminCompleteName ? `Bienvenido(a) ${session.userCompleteName || session.adminCompleteName}` : 'Inicia Sesion'}
          </p>
        ) : (
          <p className="bar-name">
            Cargando sesion...
          </p>
        )}

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
            {session.isAdmin ? (null) : (
              <Link href={`/perfil/${session.userId}`} className="bar-dropdown-item">Perfil</Link>
            )}
            <button onClick={handleLogOut} className="bar-dropdown-item">Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
}

