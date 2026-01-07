import type { MetadataRoute } from "next";

/**
 * Slugs sugeridos para SEO local:
 * - inmuebles: terrenos, casas, departamentos, locales, alquileres
 * - proyectos: villa-sol-2-qorihuillca, etc.
 *
 * Ajusta a tus rutas reales.
 */

const inmueblesSlugs = [
  "terrenos",
  "casas",
  "departamentos",
  "locales",
  "alquileres",
];

const proyectosSlugs = [
  "villa-sol-2-qorihuillca",
  // agrega más proyectos aquí
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.ayacuchoterrenos.com";
  const now = new Date();

  // URLs de categorías / filtros (si existen como páginas)
  const inmueblesUrls: MetadataRoute.Sitemap = inmueblesSlugs.map((slug) => ({
    url: `${baseUrl}/inmuebles/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // URLs de proyectos individuales
  const proyectosUrls: MetadataRoute.Sitemap = proyectosSlugs.map((slug) => ({
    url: `${baseUrl}/proyectos/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // URLs estáticas principales
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/inmuebles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      // Nota: no se usa #propiedades en sitemap
      url: `${baseUrl}/inmuebles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  return [...staticUrls, ...inmueblesUrls, ...proyectosUrls];
}
