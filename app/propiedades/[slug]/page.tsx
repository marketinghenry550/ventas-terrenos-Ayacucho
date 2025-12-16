import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Clock, Check, ChevronRight, Sparkles, Tag } from "lucide-react";

import propiedadesdata from "@/app/data/propiedades.json";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import StickyContactoCard from "../sticky-contacto-card";
import GaleriaTabs from "../galeria-tabs";
import AnimatedHero from "../animated-hero";
import SectionAnimation from "../section-animation";

type KV = { label: string; value: string };
type Promo = { titulo: string; detalle?: string };

type Proyecto = {
  slug: string;
  tipo: "proyecto" | "propiedad";
  titulo: string;
  subtitulo?: string;
  categoria?: string;

  ubicacion: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;

  precioDesdeSol: string;
  precioDesdeDolar?: string;
  pagoContado?: string;

  imagen: string;
  etiquetas?: string[];

  resumen?: string;
  descripcion?: string;

  caracteristicas?: KV[];

  // ✅ NUEVO: todo desde JSON
  promociones?: Promo[];
  beneficios?: string[];

  galeria?: {
    fotos: string[];
    youtubeId?: string;
  };

  ubicacionImagen?: string;

  // si quieres mantener esto opcional
  descuento?: {
    titulo: string;
    imagen: string;
  };

  contacto?: {
    whatsapp: string;
    telefono: string;
    direccion: string;
    horario?: string;
  };

  // fallback legacy
  detalles?: {
    area?: string;
    lotesDisponibles?: number;
    entrega?: string;
    financiamiento?: string;
  };

  monedaPrincipal?: string;
  tipoOperacion?: string;
  tipoInmueble?: string;
  areaM2?: number;
  dormitorios?: number;
  banos?: number;
  cocheras?: number;
};

const data = propiedadesdata as unknown as Proyecto[];

function cleanStr(v: unknown) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function buildCaracteristicas(p: Proyecto): KV[] {
  if (Array.isArray(p.caracteristicas) && p.caracteristicas.length) {
    return p.caracteristicas
      .map((it) => ({ label: cleanStr(it.label), value: cleanStr(it.value) }))
      .filter((it) => it.label && it.value);
  }

  // fallback (si aún no migras todo al JSON)
  const items: KV[] = [];

  if (p.tipo === "proyecto") {
    if (p.detalles?.area) items.push({ label: "Área desde", value: cleanStr(p.detalles.area) });
    if (p.detalles?.lotesDisponibles)
      items.push({ label: "Lotes disponibles", value: cleanStr(p.detalles.lotesDisponibles) });
    if (p.detalles?.entrega) items.push({ label: "Entrega", value: cleanStr(p.detalles.entrega) });
    if (p.detalles?.financiamiento)
      items.push({ label: "Financiamiento", value: cleanStr(p.detalles.financiamiento) });
  }

  if (p.tipo === "propiedad") {
    if (p.tipoOperacion) items.push({ label: "Operación", value: cleanStr(p.tipoOperacion) });
    if (p.tipoInmueble) items.push({ label: "Tipo", value: cleanStr(p.tipoInmueble) });
    if (p.areaM2) items.push({ label: "Área", value: `${cleanStr(p.areaM2)} m²` });
    if (p.dormitorios) items.push({ label: "Dormitorios", value: cleanStr(p.dormitorios) });
    if (p.banos) items.push({ label: "Baños", value: cleanStr(p.banos) });
    if (p.cocheras) items.push({ label: "Cocheras", value: cleanStr(p.cocheras) });
  }

  return items;
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proyecto = data.find((p) => p.slug === slug);
  if (!proyecto) notFound();

  const contacto = proyecto.contacto ?? {
    whatsapp: "51970993246",
    telefono: "+51 970 993 246",
    direccion: "Jr. Quinua N° 570, Ayacucho",
    horario: "Lun–Sáb 9:00 AM – 7:00 PM",
  };

  const caracteristicas = buildCaracteristicas(proyecto);

  const fotos = proyecto.galeria?.fotos?.length
    ? proyecto.galeria.fotos
    : ["/proyecto1.webp", "/proyecto2.webp", "/proyecto3.webp", "/proyecto4.webp"];

  const youtubeId = proyecto.galeria?.youtubeId ?? "dQw4w9WgXcQ";

  const promociones = Array.isArray(proyecto.promociones) ? proyecto.promociones : [];
  const beneficios = Array.isArray(proyecto.beneficios) ? proyecto.beneficios : [];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO PORTAL */}
      <section className="relative">
        <div className="relative h-[320px] w-full md:h-[360px] lg:h-[390px]">
          <Image
            src={proyecto.imagen}
            alt={proyecto.titulo}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          <div className="absolute inset-0">
            <div className="mx-auto h-full max-w-7xl px-4">
              <div className="flex h-full flex-col justify-end pb-24 md:pb-16">
                <AnimatedHero>
                  {/* Breadcrumb */}
                  <div className="mb-3 flex items-center gap-2 text-xs text-white/85">
                    <span className="rounded-md bg-white/10 px-2 py-1 backdrop-blur">Inicio</span>
                    <span>›</span>
                    <span className="rounded-md bg-white/10 px-2 py-1 backdrop-blur">Proyectos</span>
                    <span>›</span>
                    <span className="rounded-md bg-white/10 px-2 py-1 backdrop-blur">
                      {proyecto.subtitulo ?? "Detalle"}
                    </span>
                  </div>

                  <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                    {proyecto.subtitulo ?? proyecto.titulo}
                  </h1>
                  <p className="mt-1 text-base font-medium text-white/85 md:text-lg">
                    {proyecto.subtitulo ? proyecto.titulo : "Inversión inteligente en crecimiento"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-extrabold text-slate-900 hover:bg-yellow-400">
                      {proyecto.tipo === "proyecto" ? "LOTES" : "PROPIEDAD"}
                    </Badge>
                    {proyecto.etiquetas?.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-full bg-white/15 text-white backdrop-blur"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </AnimatedHero>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL FLOTANTE (portal) */}
        <div className="relative -mt-12 md:-mt-14">
          <div className="mx-auto max-w-7xl px-4">
            <SectionAnimation>
              <Card className="rounded-3xl border border-slate-200/70 bg-white/95 p-5 shadow-[0_18px_55px_rgba(2,6,23,0.10)] backdrop-blur md:p-6">
                <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                  {/* Ubicación / horario */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="h-4 w-4 text-slate-500" />
                      <span className="font-semibold">{proyecto.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>{contacto.horario ?? "Lun–Dom 9:00 AM – 6:00 PM"}</span>
                    </div>
                  </div>

                  {/* Precios */}
                  <div className="flex flex-wrap items-stretch gap-3 md:justify-end">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-[11px] font-semibold text-slate-500">
                        {proyecto.tipo === "proyecto" ? "Cuota desde" : "Precio desde"}
                      </p>
                      <p className="text-xl font-extrabold text-slate-900">{proyecto.precioDesdeSol}</p>
                      {proyecto.precioDesdeDolar && (
                        <p className="text-xs font-medium text-slate-600">{proyecto.precioDesdeDolar}</p>
                      )}
                    </div>

                    {proyecto.pagoContado && (
                      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3">
                        <p className="text-[11px] font-semibold text-yellow-900/70">Pago al contado</p>
                        <p className="text-xl font-extrabold text-yellow-900">{proyecto.pagoContado}</p>
                        <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-green-700">
                          <Check className="h-4 w-4" /> Promos disponibles
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Banda inferior: promos rápidas (si existen) */}
                {promociones.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-4">
                    <div className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700">
                      <Sparkles className="h-4 w-4" />
                      Promociones:
                    </div>
                    {promociones.slice(0, 3).map((p, i) => (
                      <span
                        key={`${p.titulo}-${i}`}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        <Tag className="h-3.5 w-3.5 text-slate-500" />
                        {p.titulo}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </SectionAnimation>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* IZQUIERDA */}
          <div className="space-y-12">
            {/* PROMOCIONES (SECCIÓN) */}
            {promociones.length > 0 && (
              <SectionAnimation>
                <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(2,6,23,0.08)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900">Promociones</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Beneficios vigentes (extraídos del JSON).
                      </p>
                    </div>
                    <Badge className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-extrabold text-slate-900">
                      Tiempo limitado
                    </Badge>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {promociones.map((p, i) => (
                      <div
                        key={`${p.titulo}-${i}`}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl bg-white shadow-sm">
                            <Sparkles className="h-4 w-4 text-slate-700" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-extrabold text-slate-900">{p.titulo}</p>
                            {p.detalle && (
                              <p className="mt-1 text-sm text-slate-600">{p.detalle}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      Las promociones pueden variar según disponibilidad.
                    </p>
                    <Button className="bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                      Solicitar promociones
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </SectionAnimation>
            )}

            {/* CARACTERÍSTICAS (tabla premium) */}
            {caracteristicas.length > 0 && (
              <SectionAnimation>
                <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(2,6,23,0.08)]">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">Características</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Información clave del {proyecto.tipo === "proyecto" ? "proyecto" : "inmueble"}.
                    </p>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="divide-y divide-slate-200 md:grid md:grid-cols-2 md:divide-y-0">
                      {caracteristicas.map((it, i) => (
                        <div
                          key={`${it.label}-${i}`}
                          className="flex items-center justify-between gap-6 px-5 py-4 hover:bg-slate-50/70 transition-colors md:border-b md:border-slate-200 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-slate-200"
                        >
                          <span className="text-sm font-semibold text-slate-600">{it.label}</span>
                          <span className="text-sm font-extrabold text-slate-900">{it.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </SectionAnimation>
            )}

            {/* BENEFICIOS (solo texto, desde JSON) */}
            {beneficios.length > 0 && (
              <SectionAnimation>
                <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(2,6,23,0.08)]">
                  <h2 className="text-2xl font-extrabold text-slate-900">Beneficios</h2>
                  <p className="mt-1 text-sm text-slate-600">Lo que incluye tu compra / inversión.</p>

                  <ul className="mt-6 space-y-3">
                    {beneficios.map((b, i) => (
                      <li key={`${b}-${i}`} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-green-700">
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-sm leading-relaxed text-slate-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </SectionAnimation>
            )}

            <Separator className="bg-slate-200/70" />

            {/* DESCRIPCIÓN */}
            <SectionAnimation>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">Sobre el proyecto</h2>
                <div className="mt-5 space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    {proyecto.descripcion ??
                      proyecto.resumen ??
                      "Solicita la información completa del proyecto: precios, disponibilidad y financiamiento."}
                  </p>
                </div>
              </div>
            </SectionAnimation>

            {/* GALERÍA */}
            <SectionAnimation>
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900">Galería de fotos y videos</h2>
                <p className="mt-2 text-slate-600">
                  Explora el proyecto y conoce cada detalle antes de tu visita.
                </p>
              </div>
              <GaleriaTabs fotos={fotos} youtubeId={youtubeId} titulo={proyecto.titulo} />
            </SectionAnimation>

            {/* UBICACIÓN */}
            <SectionAnimation>
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900">Ubicación</h2>
                <p className="mt-2 text-slate-600">Accesos, referencia y entorno.</p>
              </div>

              <Card className="overflow-hidden rounded-3xl border border-slate-200 shadow-[0_16px_45px_rgba(2,6,23,0.08)]">
                <div className="grid md:grid-cols-2">
                  <div className="p-7 md:p-8">
                    <h3 className="text-xl font-extrabold text-slate-900">¿Por qué esta ubicación?</h3>
                    <ul className="mt-6 space-y-3 text-slate-700">
                      <li className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>Acceso a vías principales y zonas en crecimiento.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>Entorno con proyección de valorización.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>Servicios y comercios cercanos (según proyecto).</span>
                      </li>
                    </ul>

                    <Button className="mt-7" variant="outline">
                      <MapPin className="mr-2 h-4 w-4" />
                      Ver en Google Maps
                    </Button>
                  </div>

                  <div className="relative h-[260px] md:h-full">
                    <Image
                      src={proyecto.ubicacionImagen ?? proyecto.imagen}
                      alt={`Ubicación - ${proyecto.titulo}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent" />
                  </div>
                </div>
              </Card>
            </SectionAnimation>
          </div>

          {/* DERECHA */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <StickyContactoCard
              titulo="Solicita información"
              proyecto={proyecto.titulo}
              whatsapp={contacto.whatsapp}
              telefono={contacto.telefono}
              direccion={contacto.direccion}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  return data.map((p) => ({ slug: p.slug }));
}
