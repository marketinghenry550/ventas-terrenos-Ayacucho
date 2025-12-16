"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/card";

function waLink(phone: string, text: string) {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export default function StickyContactoCard({
  titulo,
  proyecto,
  whatsapp,
  telefono,
  direccion,
}: {
  titulo: string;
  proyecto: string;
  whatsapp: string;
  telefono: string;
  direccion: string;
}) {
  const msg = `Hola, quiero información del proyecto: ${proyecto}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="lg:sticky lg:top-6"
    >
      <Card className="relative overflow-hidden rounded-3xl border-0 bg-[#0B6FB6] p-7 text-white shadow-[0_22px_60px_rgba(2,6,23,0.28)]">
        {/* glow suave */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />

        <div className="absolute -right-2 -top-3 rounded-bl-2xl rounded-tr-2xl bg-[#FFB200] px-4 py-2 text-xs font-extrabold text-slate-900">
          LOTES
        </div>

        <h3 className="mt-2 text-center text-lg font-extrabold">{titulo}</h3>

        {/* caja interna */}
        <div className="mt-6 rounded-2xl bg-white p-5 text-slate-900 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.35)]">
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold text-slate-500">WhatsApp</p>
              <p className="text-sm font-extrabold">{whatsapp}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold text-slate-500">Teléfono</p>
              <p className="text-sm font-extrabold">{telefono}</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold text-slate-500">Dirección</p>
              <p className="text-sm font-semibold leading-snug">{direccion}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex gap-2">
                <span>✓</span> Te enviamos precios y disponibilidad.
              </p>
              <p className="flex gap-2">
                <span>✓</span> Coordinamos visita guiada cuando quieras.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link
              href={waLink(whatsapp, msg)}
              target="_blank"
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#FFB200] text-sm font-extrabold text-slate-900 hover:opacity-95"
            >
              Solicitar información
            </Link>
          </motion.div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link
              href={`tel:${telefono.replace(/\s/g, "")}`}
              className="flex h-11 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-900 hover:opacity-95"
            >
              Llamar
            </Link>
            <Link
              href={waLink(whatsapp, `Quiero una visita del proyecto ${proyecto}`)}
              target="_blank"
              className="flex h-11 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white hover:bg-white/20"
            >
              Visita
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
