"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Check, Shield, Home, Trees, Bike, PlayCircle } from "lucide-react";

export default function FeaturesAnimated({
  items,
}: {
  items: Array<{ titulo: string; icon?: string }>;
}) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Disfruta con todo equipado</h2>
        <p className="mt-2 text-slate-600">Infraestructura pensada para vivir o invertir.</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((it, idx) => (
          <motion.div key={`${it.titulo}-${idx}`} variants={item}>
            <Card className="group rounded-2xl border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-[#0B6FB6]/30 hover:shadow-[0_16px_44px_rgba(15,23,42,0.10)]">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0B6FB6]/10 text-[#0B6FB6] transition group-hover:bg-[#0B6FB6] group-hover:text-white">
                  {getIcon(it.icon)}
                </div>

                <div>
                  <p className="font-extrabold text-slate-900">{it.titulo}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {hint(it.icon)}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function getIcon(icon?: string) {
  switch (icon) {
    case "titulo": return <Shield className="h-6 w-6" />;
    case "servicios": return <Home className="h-6 w-6" />;
    case "parques": return <Trees className="h-6 w-6" />;
    case "juegos": return <PlayCircle className="h-6 w-6" />;
    case "ciclovia": return <Bike className="h-6 w-6" />;
    case "seguridad": return <Shield className="h-6 w-6" />;
    default: return <Check className="h-6 w-6" />;
  }
}

function hint(icon?: string) {
  switch (icon) {
    case "titulo": return "Documentación y respaldo para una compra segura.";
    case "servicios": return "Servicios básicos completos y listos para conexión.";
    case "parques": return "Áreas verdes y recreación para la familia.";
    case "juegos": return "Zonas infantiles para entretenimiento.";
    case "ciclovia": return "Circuitos deportivos y movilidad recreativa.";
    case "seguridad": return "Vigilancia y control para mayor tranquilidad.";
    default: return "Beneficio incluido dentro del proyecto.";
  }
}
