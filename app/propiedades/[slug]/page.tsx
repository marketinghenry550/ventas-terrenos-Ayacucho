// app/proyectos/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Clock, Check } from "lucide-react";

import propiedadesdata from "@/app/data/propiedades.json";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import GaleriaTabs from "../galeria-tabs";
import SectionAnimation from "../section-animation";
import StickyContactoCardCentenario from "../sticky-contacto-card";
import EquipamientoGrid from "../equipamiento-grid";
import DescuentoBanner from "../descuento-banner";
import Navbar from "@/app/navbar";
import Footer from "@/app/footer";

type KV = { label: string; value: string };
type Promo = { titulo: string; detalle?: string };

type Proyecto = {
  slug: string;
  tipo: "proyecto" | "propiedad";
  titulo: string;
  subtitulo?: string;
  categoria?: string;

  ubicacion: string;

  precioDesdeSol: string;
  precioDesdeDolar?: string; // ✅ existe en JSON si quieres, pero NO se muestra
  pagoContado?: string;

  imagen: string;
  etiquetas?: string[];

  descripcion?: string;

  caracteristicas?: KV[];
  promociones?: Promo[];
  equipamiento?: string[];

  galeria: {
    fotos: string[];
    youtubeId?: string;
  };

  ubicacionImagen?: string;
  mapsUrl?: string;

  descuento?: {
    titulo: string;
    imagen: string;
  };

  contacto: {
    whatsapp: string;
    telefono: string;
    direccion: string;
    horario?: string;
  };
};

const data = propiedadesdata as unknown as Proyecto[];

function softReq(ok: boolean, msg: string) {
  if (!ok) throw new Error(msg);
}

function onlyNumber(v: string) {
  return String(v ?? "")
    .replace(/s\/|S\/|\s/gi, "")
    .trim();
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = data.find((p) => p.slug === slug);
  if (!proyecto) notFound();

  // ✅ HARD REQUIREMENTS: 100% JSON
  softReq(!!proyecto.imagen, `Falta imagen (hero) en JSON: ${proyecto.slug}`);
  softReq(!!proyecto.ubicacion, `Falta ubicacion en JSON: ${proyecto.slug}`);
  softReq(
    !!proyecto.precioDesdeSol,
    `Falta precioDesdeSol en JSON: ${proyecto.slug}`
  );
  softReq(
    !!proyecto.galeria?.fotos?.length,
    `Faltan fotos en galeria: ${proyecto.slug}`
  );
  softReq(
    !!proyecto.contacto?.whatsapp &&
      !!proyecto.contacto?.telefono &&
      !!proyecto.contacto?.direccion,
    `Falta contacto (whatsapp/telefono/direccion) en JSON: ${proyecto.slug}`
  );

  const fotos = proyecto.galeria.fotos;
  const youtubeId = proyecto.galeria.youtubeId;
  const equipamiento = proyecto.equipamiento ?? [];
  const promos = proyecto.promociones ?? [];
  const precioNum = onlyNumber(proyecto.precioDesdeSol);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white pt-20 lg:pt-[140px]">
        {/* =========================
            HERO (imagen + overlay)
        ========================= */}
        <section className="relative">
          <div className="relative h-80 w-full md:h-[400px] lg:h-[555px]">
            <Image
              src={proyecto.imagen}
              alt={`${proyecto.titulo} ${proyecto.subtitulo ?? ""}`.trim()}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 " />
            <div className="absolute inset-0 bg-linear-to-t bg-black/5 to-transparent" />

            <div className="absolute inset-0">
              <div className="mx-auto h-full max-w-7xl px-4">
                <div className="flex h-full flex-col justify-end pb-10 md:pb-12">
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-[#FFB200] px-4 py-2 text-xs font-extrabold text-slate-900 hover:bg-[#ffbf2e]">
                      {proyecto.tipo === "proyecto" ? "LOTES" : "PROPIEDAD"}
                    </Badge>

                    {proyecto.etiquetas?.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full bg-[#FFB200] text-slate-900 font-bold backdrop-blur"
                      >
                        {t}
                      </Badge>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              BANDA AMARILLA (PORTAL)
              ✅ precio limpio (sin blur/mancha y sin dólar)
          ========================= */}
          <div className="relative bg-[#FFB200]">
            {/* textura suave (NO afecta al precio) */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
              <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-white blur-3xl" />
              <div className="absolute -right-40 -bottom-56 h-[520px] w-[520px] rounded-full bg-black blur-3xl" />
            </div>

            <div className="relative  mx-auto max-w-7xl px-4 py-10">
              <div className="flex items-start gap-10 justify-between">
                {/* IZQUIERDA */}
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-slate-900/80">
                    {proyecto.subtitulo}
                  </p>

                  <h2 className="mt-1 text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
                    {proyecto.titulo ?? ""}
                  </h2>

                  <div className="mt-5 flex flex-col gap-3 text-sm text-slate-900 sm:flex-row sm:items-center sm:gap-8">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-bold">{proyecto.ubicacion}</span>
                    </div>

                    {proyecto.contacto.horario ? (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className="font-bold">
                          {proyecto.contacto.horario}
                        </span>
                      </div>
                    ) : null}
                  </div>

               
                </div>

                {/* PRECIO – HORIZONTAL GRANDE (CONTADO / CRÉDITO) */}
                <div className="">
                  <div className="flex w-full max-w-[520px] gap-3 rounded-3xl bg-[#0B6FB6] px-6 py-5 text-white shadow-[0_26px_70px_rgba(2,6,23,0.35)] ring-1 ring-white/10">
                    {/* CONTADO */}
                    <div className="flex flex-1 flex-col justify-center rounded-2xl bg-white/15 px-5 py-4 ring-1 ring-white/10">
                      <p className="text-xs font-extrabold uppercase text-white/80">
                        Contado
                      </p>

                      <div className="mt-1 flex items-end gap-2">
                        <span className="text-2xl font-black leading-none">
                          S/
                        </span>
                        <span className="text-5xl font-black leading-none tracking-tight">
                          {precioNum}
                        </span>
                      </div>
                    </div>

                    {/* CRÉDITO */}
                    {proyecto.pagoContado ? (
                      <div className="flex flex-1 flex-col justify-center rounded-2xl bg-white/20 px-5 py-4 ring-1 ring-white/10">
                        <p className="text-xs font-extrabold uppercase text-white/80">
                          Crédito
                        </p>

                        <p className="mt-1 text-2xl font-black leading-none">
                          {proyecto.pagoContado}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* reserva del form */}
                <div className="hidden lg:block" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            CONTENIDO + FORM (sticky bien)
        ========================= */}
        <section className="mx-auto max-w-7xl px-4 pb-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            {/* IZQUIERDA */}
            <div className="pt-10 lg:pt-12">
              {proyecto.descripcion ? (
                <SectionAnimation>
                  <Card className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_16px_45px_rgba(2,6,23,0.06)]">
                    <h2 className="text-3xl font-extrabold text-[#0B6FB6]">
                      Descripción
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-700">
                      {proyecto.descripcion}
                    </p>
                  </Card>
                </SectionAnimation>
              ) : null}

              {equipamiento.length > 0 ? (
                <SectionAnimation>
                  <div className="mt-10">
                    <EquipamientoGrid items={equipamiento} />
                  </div>
                </SectionAnimation>
              ) : null}

              {promos.length ? (
                <SectionAnimation>
                  <div className="pt-10">
                    <h2 className="text-3xl font-extrabold text-[#0B6FB6]">
                      Promociones
                    </h2>
                    <div className="mt-6 grid gap-4">
                      {promos.map((p, i) => (
                        <Card
                          key={`${p.titulo}-${i}`}
                          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(2,6,23,0.05)]"
                        >
                          <p className="text-base font-black text-slate-900">
                            {p.titulo}
                          </p>
                          {p.detalle ? (
                            <p className="mt-1 text-sm text-slate-600">
                              {p.detalle}
                            </p>
                          ) : null}
                        </Card>
                      ))}
                    </div>
                  </div>
                </SectionAnimation>
              ) : null}

              {proyecto.caracteristicas?.length ? (
                <SectionAnimation>
                  <div className="pt-10">
                    <h2 className="text-3xl font-extrabold text-[#0B6FB6]">
                      Características
                    </h2>
                    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_45px_rgba(2,6,23,0.06)]">
                      <div className="divide-y divide-slate-200 md:grid md:grid-cols-2 md:divide-y-0">
                        {proyecto.caracteristicas.map((it, i) => (
                          <div
                            key={`${it.label}-${i}`}
                            className="flex items-center justify-between gap-6 px-6 py-5 transition-colors hover:bg-slate-50/70 md:border-b md:border-slate-200 md:odd:border-r md:[&:nth-child(odd)]:border-slate-200"
                          >
                            <span className="text-sm font-bold text-slate-600">
                              {it.label}
                            </span>
                            <span className="text-sm font-black text-slate-900">
                              {it.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionAnimation>
              ) : null}

              {proyecto.descuento?.imagen ? (
                <SectionAnimation>
                  <div className="pt-10">
                    <DescuentoBanner
                      titulo={proyecto.descuento.titulo}
                      imagen={proyecto.descuento.imagen}
                    />
                  </div>
                </SectionAnimation>
              ) : null}

              <SectionAnimation>
                <div className="pt-10">
                  <h2 className="text-3xl font-extrabold text-[#0B6FB6]">
                    Galería de Fotos y Videos
                  </h2>
                  <div className="mt-6">
                    <GaleriaTabs
                      fotos={fotos}
                      youtubeId={youtubeId}
                      titulo={proyecto.titulo}
                    />
                  </div>
                </div>
              </SectionAnimation>

              <SectionAnimation>
                <div className="pt-10">
                  <h2 className="text-3xl font-extrabold text-[#0B6FB6]">
                    Ubicación Perfecta
                  </h2>
                  <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F7FB] shadow-[0_16px_45px_rgba(2,6,23,0.06)]">
                    <div className="relative aspect-16/8 w-full">
                      <Image
                        src={proyecto.ubicacionImagen ?? proyecto.imagen}
                        alt={`Mapa - ${proyecto.titulo}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>
                    <div className="px-6 py-5 text-sm text-slate-800">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#0B6FB6]" />
                        <span className="font-extrabold">
                          {proyecto.ubicacion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionAnimation>
            </div>

            {/* FORM sticky: ✅ NO se corta, top correcto */}
            <div className="lg:sticky lg:top-[120px] pt-72 lg:self-start">
              {/* sube (pero ya no invade el precio) */}
              <div className="-mt-10 md:-mt-16 lg:-mt-[250px]">
                <StickyContactoCardCentenario
                  proyecto={`${proyecto.titulo} ${
                    proyecto.subtitulo ?? ""
                  }`.trim()}
                  tipo={proyecto.tipo === "proyecto" ? "LOTES" : "PROPIEDAD"}
                  whatsapp={proyecto.contacto.whatsapp}
                  telefono={proyecto.contacto.telefono}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  return data.map((p) => ({ slug: p.slug }));
}
