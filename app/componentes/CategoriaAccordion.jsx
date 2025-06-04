'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../styles/CategoriaAccordion.css';
import Link from "next/link";

export default function CategoriaAccordion({ titulo, opciones }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="categoria-acordeon">
      <div className="categoria-titulo" onClick={() => setOpen(!open)}>
        <span>{titulo}</span>
        <ChevronDown
          size={20}
          className={`categoria-icono ${open ? 'rotate' : ''}`}
        />
      </div>

      {open && (
        <div className="categoria-contenido">
          <ul>
            {opciones.map(({ texto, valor }) => (
              <li key={valor}>
                <Link href={`/trayectoria/${valor}`} className="categoria-link">
                  {texto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

