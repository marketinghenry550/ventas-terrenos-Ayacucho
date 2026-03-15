// app/layout.tsx
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import FloatingButtons from "./floating-buttons";
import "./globals.css";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const siteInfo = {
  description:
    "Venta de terrenos en Ayacucho Huamanga. Compra lotes, terrenos y casas en Ayacucho con proyectos en Ccorihuillca y zonas de alta valorización. Terrenos ideales para vivienda, casa de campo o inversión.",

  url: "https://www.casagrande-inmobiliaria.com",

  logoPath: "/logo.svg",
  ogImagePath: "/hero01.webp",

  phone: "+51916194372",
  email: "u19217724@gmail.com",

  address: {
    street: "Jr. Quinua N° 570",
    city: "Huamanga",
    region: "Ayacucho",
    postalCode: "05003",
    country: "PE",
  },

  coordinates: {
    latitude: -13.155749,
    longitude: -74.220991,
  },

  pages: {
    home: "/",
    inmuebles: "/inmuebles",
    proyectos: "/proyectos",
    propiedades: "/propiedades",
    ventaTerreno: "/venta-terreno",
    contacto: "/contacto",
  },
};

const abs = (path: string) =>
  `${siteInfo.url}${path.startsWith("/") ? path : `/${path}`}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",

  name: "Venta de terrenos en Ayacucho",
  description: siteInfo.description,
  url: siteInfo.url,

  image: [abs(siteInfo.logoPath), abs(siteInfo.ogImagePath)],

  telephone: siteInfo.phone,
  email: siteInfo.email,

  address: {
    "@type": "PostalAddress",
    streetAddress: siteInfo.address.street,
    addressLocality: siteInfo.address.city,
    addressRegion: siteInfo.address.region,
    postalCode: siteInfo.address.postalCode,
    addressCountry: siteInfo.address.country,
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: siteInfo.coordinates.latitude,
    longitude: siteInfo.coordinates.longitude,
  },

  areaServed: [
    { "@type": "AdministrativeArea", name: "Ayacucho" },
    { "@type": "City", name: "Huamanga" },
  ],

  knowsAbout: [
    "venta de terrenos en ayacucho",
    "comprar terrenos en ayacucho",
    "lotes en ayacucho",
    "terrenos en huamanga",
    "casas en ayacucho",
    "proyectos de lotes en ayacucho",
    "lotes en ccorihuillca",
    "terrenos en ccorihuillca",
    "inversion en terrenos ayacucho",
    "comprar lote en ayacucho",
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Terrenos y propiedades en Ayacucho",

    itemListElement: [
      {
        "@type": "Offer",
        url: abs(siteInfo.pages.ventaTerreno),
        itemOffered: {
          "@type": "Service",
          name: "Venta de terrenos en Ayacucho",
          description:
            "Compra terrenos y lotes en Ayacucho Huamanga con asesoría y proyectos inmobiliarios.",
        },
      },
      {
        "@type": "Offer",
        url: abs(siteInfo.pages.proyectos),
        itemOffered: {
          "@type": "Service",
          name: "Proyectos de lotes en Ayacucho",
          description:
            "Proyectos inmobiliarios con lotes y terrenos en Ayacucho.",
        },
      },
      {
        "@type": "Offer",
        url: abs(siteInfo.pages.propiedades),
        itemOffered: {
          "@type": "Service",
          name: "Casas y terrenos en Ayacucho",
          description:
            "Listado de casas, lotes y terrenos disponibles en Ayacucho.",
        },
      },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),

  title: {
    default:
      "Venta de Terrenos en Ayacucho Huamanga | Comprar Lotes y Casas",
    template: "%s | Terrenos en Ayacucho",
  },

  description: siteInfo.description,

  keywords: [
    "venta de terrenos en ayacucho",
    "comprar terrenos en ayacucho",
    "lotes en ayacucho",
    "terrenos en huamanga",
    "casas en ayacucho",
    "comprar lote en ayacucho",
    "terrenos baratos en ayacucho",
    "proyectos inmobiliarios ayacucho",
    "lotes en ccorihuillca",
    "terrenos en ccorihuillca",
    "terrenos en ayacucho huamanga",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: siteInfo.url,
  },

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteInfo.url,
    title:
      "Venta de Terrenos en Ayacucho Huamanga | Lotes y Casas",
    description:
      "Compra terrenos, lotes y casas en Ayacucho Huamanga con alta valorización.",
    images: [
      {
        url: siteInfo.ogImagePath,
        width: 1200,
        height: 630,
        alt: "Venta de terrenos en Ayacucho",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Venta de Terrenos en Ayacucho Huamanga",
    description:
      "Compra terrenos, lotes y casas en Ayacucho.",
    images: [siteInfo.ogImagePath],
  },
};

function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" suppressHydrationWarning className={font.variable}>
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>

      <body className={`${font.className} antialiased`}>
        {children}

        <FloatingButtons />

        <GoogleAnalytics gaId="G-9GG0X367Q4" />
      </body>
    </html>
  );
}