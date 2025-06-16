'use client';

import React from 'react';
import { Home, Briefcase, Search, Bookmark, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import '../styles/Sidebar.css';
import useSession from '@/hooks/useSession';
import LoadingOverlay from '../components/Loading';

export default function Sidebar() {

  const { session, loading } = useSession();
  const pathname = usePathname();

  if (loading) return <LoadingOverlay isActive={true} />
  let items;
  if (session) {

    session.isAdmin ? items = [

      { icon: <Briefcase size={20} />, label: 'Vacantes', href: `/admin/${session.enterpriseId}` },

    ] : items = [
      { icon: <Home size={20} />, label: 'Inicio', href: '/trayectoria' },
      { icon: <Briefcase size={20} />, label: 'Vacantes', href: '/vacantes' },
      { icon: <Bookmark size={20} />, label: 'Guardados', href: '/guardados' },
      { icon: <Bell size={20} />, label: 'Notificaciones', href: '/notificaciones' },
    ];
  } else {
    items = [
      { icon: <Home size={20} />, label: 'Inicio', href: '/trayectoria' },
      { icon: <Briefcase size={20} />, label: 'Vacantes', href: '/vacantes' },
      { icon: <Bookmark size={20} />, label: 'Guardados', href: '/guardados' },
      { icon: <Bell size={20} />, label: 'Notificaciones', href: '/notificaciones' },
    ];
  }

  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">UNIBECARIOS</h1>

      <nav className="sidebar-nav">
        {items.map(({ icon, label, href }) => (
          <NavItem
            key={label}
            icon={icon}
            label={label}
            href={href}
            active={pathname === href}
          />
        ))}
      </nav>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  href,
  active,
}) {
  return (
    <Link
      href={href}
      className={`nav-item${active ? ' active' : ''}`}
      aria-current={active ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
