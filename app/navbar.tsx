/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";

import {
  LuMenu,
  LuX,
  LuChevronRight,
  LuMapPin,
  LuPlus,
  LuArrowRight,
} from "react-icons/lu";
import { IconType } from "react-icons";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

// -----------------------------
// TIPOS
// -----------------------------
interface NavLink {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  label: string;
  Icon: IconType;
}

interface ContactInfoItemProps {
  text: string;
  href: string;
}

type ProyectoDestacado = {
  id: number;
  tipo: string; // "LOTES" | "CASAS" | ...
  ciudad: string;
  nombre: string;
  descripcion: string;
  precioDesde: string;
  badgeColor: string;
  imagen: string;

  // ✅ CLAVE: link listo, NO se arma con slug en el componente
  href: string;
};

// -----------------------------
// LINKS TOP NAV
// -----------------------------
const navLinks: NavLink[] = [
  { href: "/inmuebles#proyectos", label: "Proyectos" },
  { href: "/inmuebles#propiedades", label: "Propiedades" },
  { href: "/nosotros", label: "Nosotros" },
];

// -----------------------------
// SOCIAL
// -----------------------------
const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/profile.php?id=100077864046528&locale=es_LA",
    label: "Facebook",
    Icon: FaFacebook,
  },
  {
    href: "https://www.linkedin.com/in/david-guerra-4a9b44385/",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "https://www.youtube.com/channel/UCIuOx9lfSBKoJ5QsRlQjA7Q",
    label: "YouTube",
    Icon: FaYoutube,
  },
  {
    href: "https://www.instagram.com/casagrandegeotecnia/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.tiktok.com/@casagrandegeotecnia?lang=es-419",
    label: "TikTok",
    Icon: FaTiktok,
  },
];

const contactInfo: ContactInfoItemProps[] = [
  { text: "Ubicacion", href: "#" },
  { text: "Llámanos: +51 945 513 323", href: "tel:+51916194372" },
];

// -----------------------------
// LISTA DE CIUDADES (LEFT COLUMN)
// -----------------------------
const ciudadesProyectos = [
  "Villa Sol 2",
  "Pampaqocha",
  "Cañete",
  "Carabayllo",
  "Chilca",
  "Pisco",
  "Ica",
  "Lima Este",
  "Lima Sur",
];

// -----------------------------
// PROYECTOS DESTACADOS (RIGHT COLUMN)
// ✅ IMPORTANTE: cada item trae su href listo
// -----------------------------
const proyectosDestacados: ProyectoDestacado[] = [
  {
    id: 1,
    tipo: "LOTES",
    ciudad: "Villa Sol 2",
    nombre: "Villa Sol 2",
    descripcion: "Naturaleza, aire puro y alta plusvalía en Qorihuillca.",
    precioDesde: "S/ 16,000",
    badgeColor: "bg-[#FFB200]",
    imagen: "/villasol01.webp",
    href: "/proyectos/villa-sol-2-qorihuillca",
  },
  {
    id: 2,
    tipo: "LOTES",
    ciudad: "Pampaqocha",
    nombre: "Pampaqocha",
    descripcion: "Proyecto consolidado en el km 61.5.",
    precioDesde: "S/ 31,900",
    badgeColor: "bg-[#00C389]",
    imagen: "/Pampaqocha01.webp",
    href: "/proyectos/pampaqocha-qorihuillca-170m2",
  },
  {
    id: 3,
    tipo: "CASAS",
    ciudad: "Asia",
    nombre: "Club Residencial Asia",
    descripcion: "Casas de campo cerca al boulevard.",
    precioDesde: "S/ 189,900",
    badgeColor: "bg-[#FF4B4B]",
    imagen: "/inmuebles/asia-casas.webp",
    href: "/propiedades/club-residencial-asia",
  },
  {
    id: 4,
    tipo: "LOTES",
    ciudad: "Chilca",
    nombre: "Vista Verde Chilca",
    descripcion: "Lotes ecológicos.",
    precioDesde: "S/ 28,000",
    badgeColor: "bg-[#01338C]",
    imagen: "/inmuebles/chilca-2.webp",
    href: "/proyectos/vista-verde-chilca",
  },
  {
    id: 5,
    tipo: "LOTES",
    ciudad: "Pisco",
    nombre: "Vista Verde Pisco",
    descripcion: "Lotes ecológicos cerca al mar.",
    precioDesde: "S/ 28,000",
    badgeColor: "bg-[#01338C]",
    imagen: "/inmuebles/chilca-2.webp",
    href: "/proyectos/vista-verde-pisco",
  },
];

// -----------------------------
// SUB COMPONENTES
// -----------------------------
const ContactInfoItem = ({ text, href }: ContactInfoItemProps) => (
  <a
    href={href}
    className="flex items-center gap-2 rounded text-[15px] font-semibold text-white hover:text-slate-400"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span>{text}</span>
  </a>
);

const SocialLinks = ({ className = "text-white" }: { className?: string }) => (
  <div className="flex items-center gap-4">
    {socialLinks.map(({ href, label, Icon }, index) => (
      <a
        key={`${href}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`transition-opacity hover:opacity-80 ${className}`}
      >
        <Icon className="h-5 w-5" />
      </a>
    ))}
  </div>
);

const TopBar = () => (
  <div className="hidden bg-[#01338C] text-white md:block">
    <div className="container mx-auto flex h-13 max-w-8xl items-center justify-between px-4">
      <SocialLinks />
      <div className="flex items-center gap-6">
        {contactInfo.map((item, index) => (
          <ContactInfoItem key={`${item.text}-${index}`} {...item} />
        ))}
      </div>
    </div>
  </div>
);

// -----------------------------
// MEGA MENU
// -----------------------------
const ProyectosMegaMenu = ({ onClose }: { onClose?: () => void }) => {
  const [activeCity, setActiveCity] = useState("Villa Sol 2");

  const filteredProjects = proyectosDestacados.filter(
    (p) => p.ciudad === activeCity
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-full z-50 hidden border-t border-slate-100 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] md:block"
      onMouseLeave={onClose}
    >
      <div className="mx-auto flex max-w-7xl gap-8 p-8">
        {/* Columna ciudades */}
        <div className="w-1/4 border-r pr-6">
          <h3 className="mb-4 text-lg font-bold text-[#01338C]">
            Selecciona tu
          </h3>

          <div className="max-h-80 space-y-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
            {ciudadesProyectos.map((city, index) => (
              <button
                key={`${city}-${index}`}
                onClick={() => setActiveCity(city)}
                onMouseEnter={() => setActiveCity(city)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                  activeCity === city
                    ? "bg-[#01338C] text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#01338C]"
                }`}
                type="button"
              >
                <span>{city}</span>
                {activeCity === city && <LuChevronRight />}
              </button>
            ))}
          </div>
        </div>

        {/* Columna proyectos */}
        <div className="w-3/4 space-y-4">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Mostrando proyectos en:
              </p>
              <h3 className="text-2xl font-bold text-[#01338C]">{activeCity}</h3>
            </div>

            <Link
              href="/inmuebles#proyectos"
              className="flex items-center gap-1 text-sm font-bold text-[#01338C] transition-colors hover:text-[#FFB200]"
              onClick={onClose}
            >
              Ver todos los proyectos <LuChevronRight />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((p, index) => (
                <Link
                  key={`${p.id}-${p.ciudad}-${index}`}
                  // ✅ CLAVE: usa el href ya listo
                  href={p.href}
                  onClick={onClose}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#01338C]/30 hover:shadow-xl"
                >
                  {/* Imagen */}
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={p.imagen}
                      alt={p.nombre}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span
                      className={`absolute right-0 top-0 rounded-bl-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white ${p.badgeColor}`}
                    >
                      {p.tipo}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-slate-400">
                        <LuMapPin size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">
                          {p.ciudad}
                        </span>
                      </div>
                    </div>

                    <h4 className="mb-1 text-lg font-extrabold leading-tight text-[#01338C] transition-colors group-hover:text-[#FFB200]">
                      {p.nombre}
                    </h4>

                    <p className="mb-4 line-clamp-2 text-xs font-medium text-slate-500">
                      {p.descripcion}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex w-fit items-center rounded-full bg-[#01338C] px-3 py-1.5 text-white transition-colors group-hover:bg-[#FFB200] group-hover:text-[#01338C]">
                        <span className="mr-1 text-[10px] font-medium opacity-80">
                          Desde
                        </span>
                        <span className="text-sm font-bold">{p.precioDesde}</span>
                      </div>

                      <div className="translate-x-[-10px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-[#01338C]">
                        <LuArrowRight />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-12">
                <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
                  <LuMapPin className="h-6 w-6 text-slate-400" />
                </div>
                <p className="font-medium text-slate-500">
                  Próximamente proyectos en {activeCity}
                </p>
                <Link
                  href="/inmuebles#proyectos"
                  className="mt-2 text-sm font-bold text-[#01338C] hover:underline"
                >
                  Ver catálogo completo
                </Link>
              </div>
            )}

            {/* Botón Ver Más */}
            {filteredProjects.length > 0 && filteredProjects.length < 3 && (
              <Link
                key="ver-mas-btn"
                href="/inmuebles#proyectos"
                onClick={onClose}
                className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 transition-colors hover:border-[#01338C] hover:text-[#01338C]"
              >
                <div className="mb-2 rounded-full bg-slate-50 p-3 transition-colors group-hover:bg-blue-50">
                  <LuPlus className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold">Ver más proyectos</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// -----------------------------
// NAV LINK ITEM (desktop)
// -----------------------------
const NavLinkItem = ({
  link,
  pathname,
  hoverVariants,
  onProyectosClick,
}: {
  link: NavLink;
  pathname: string;
  hoverVariants: Variants;
  onProyectosClick?: () => void;
}) => {
  const currentPathname = usePathname();

  const handleNavigation = (e: React.MouseEvent) => {
    if (link.label === "Proyectos" && onProyectosClick) {
      e.preventDefault();
      onProyectosClick();
      return;
    }

    if (
      currentPathname === "/inmuebles" &&
      link.href.startsWith("/inmuebles#")
    ) {
      e.preventDefault();
      const hash = link.href.split("#")[1];
      window.history.pushState({}, "", `/inmuebles#${hash}`);
      window.dispatchEvent(
        new CustomEvent("hashChangeFromNavbar", { detail: { hash } })
      );
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
  };

  return (
    <motion.div initial="initial" whileHover="hover" variants={hoverVariants}>
      <Link
        href={link.href}
        onClick={handleNavigation}
        className={`relative rounded-2xl px-4 py-2 font-semibold text-[#01338C] transition-colors duration-300 ${
          pathname === link.href
            ? "font-bold text-[#01338C]"
            : "hover:bg-[#01338C]/8"
        }`}
      >
        {link.label}
        {pathname === link.href && (
          <motion.span
            layoutId="nav-underline"
            className="absolute bottom-0 left-0 h-0.5 w-full bg-[#01338C]"
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

const DesktopMenu = ({
  pathname,
  hoverVariants,
  onProyectosClick,
}: {
  pathname: string;
  hoverVariants: Variants;
  onProyectosClick: () => void;
}) => (
  <nav className="hidden items-center gap-4 md:flex lg:flex">
    {navLinks.map((link, index) => (
      <NavLinkItem
        key={`${link.href}-${index}`}
        link={link}
        pathname={pathname}
        hoverVariants={hoverVariants}
        onProyectosClick={onProyectosClick}
      />
    ))}

    <div className="hidden items-center space-x-4 md:flex lg:flex">
      <a
        href="https://wa.me/51945513323?text=Hola,%20quiero%20una%20cotización"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          size="lg"
          className="cursor-pointer rounded-3xl border-2 border-[#FFB200] bg-[#FFB200] px-4 py-6 font-bold text-white shadow-md transition duration-300 ease-in-out hover:border-[#01338C] hover:bg-[#01338C] hover:text-white"
        >
          Conctactanos
        </Button>
      </a>
    </div>
  </nav>
);

// -----------------------------
// MOBILE
// -----------------------------
const MobileNavLinkItem = ({
  link,
  pathname,
}: {
  link: NavLink;
  pathname: string;
}) => {
  const currentPathname = usePathname();

  const handleMobileNavigation = (e: React.MouseEvent) => {
    if (
      currentPathname === "/inmuebles" &&
      link.href.startsWith("/inmuebles#")
    ) {
      e.preventDefault();
      const hash = link.href.split("#")[1];
      window.history.pushState({}, "", `/inmuebles#${hash}`);
      window.dispatchEvent(
        new CustomEvent("hashChangeFromNavbar", { detail: { hash } })
      );
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <Link
      href={link.href}
      onClick={handleMobileNavigation}
      className={`block rounded-lg px-4 py-3 text-base font-bold transition-colors ${
        pathname === link.href
          ? "bg-gray-300 text-black"
          : "text-[#01338C] hover:bg-gray-100"
      }`}
    >
      {link.label}
    </Link>
  );
};

const MobileMenuButton = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <motion.button
    className="z-100 rounded-md p-2 text-[#01338C] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-[#373737] md:hidden"
    onClick={toggle}
    whileTap={{ scale: 0.9 }}
  >
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={isOpen ? "x" : "menu"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <LuX className="h-7 w-7" /> : <LuMenu className="h-7 w-7" />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

// -----------------------------
// NAVBAR MAIN
// -----------------------------
const Navbar = () => {
  const pathname = usePathname() || "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobileMenuOpen) return;
    const isAtTop = latest < 50;
    const isScrollingUp = latest < prevScrollY;
    setIsVisible(isAtTop || isScrollingUp);
    setPrevScrollY(latest);
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || isProjectsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen, isProjectsOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsProjectsOpen(false);
  }, [pathname]);

  const navbarVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const mobileMenuContainerVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.08,
      },
    },
    closed: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const mobileMenuItemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const linkHoverVariants: Variants = {
    hover: { scale: 1.05 },
    initial: { scale: 1 },
  };

  const overlayVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const handleProyectosClick = () => {
    setIsProjectsOpen((prev) => !prev);
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-md"
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        initial="hidden"
      >
        <TopBar />

        <div className="relative z-50 bg-white">
          <div className="container mx-auto flex h-20 max-w-8xl items-center justify-between px-4 md:h-22">
            <Link href="/" className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src="/logo.svg"
                  alt="Logo de Casagrande Geotecnia"
                  width={100}
                  height={48}
                  className="h-11 w-auto max-md:px-2 md:h-17"
                />
              </motion.div>
            </Link>

            <DesktopMenu
              pathname={pathname}
              hoverVariants={linkHoverVariants}
              onProyectosClick={handleProyectosClick}
            />

            <MobileMenuButton
              isOpen={mobileMenuOpen}
              toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>

          <AnimatePresence>
            {isProjectsOpen && (
              <ProyectosMegaMenu onClose={() => setIsProjectsOpen(false)} />
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Overlay desktop mega menu */}
      <AnimatePresence>
        {isProjectsOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 hidden bg-black/40 md:block"
            onClick={() => setIsProjectsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              variants={mobileMenuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="font-bold text-[#01338C]">Menú</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-1 text-[#01338C]"
                >
                  <LuX className="h-6 w-6" />
                </button>
              </div>

              <nav className="grow space-y-2 overflow-y-auto p-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={`${link.href}-${index}`}
                    variants={mobileMenuItemVariants}
                  >
                    <MobileNavLinkItem link={link} pathname={pathname} />
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-4 border-t p-4 pb-20 text-sm">
                <motion.div
                  variants={mobileMenuItemVariants}
                  className="w-full space-y-2 text-4xl"
                >
                  <a href="https://wa.me/51916194372" target="_blank">
                    <Button className="w-full rounded-lg bg-[#01338C] font-semibold text-white hover:bg-[#373737]">
                      ¡COTIZAR AHORA!
                    </Button>
                  </a>
                </motion.div>

                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <a
                      key={`${item.text}-${index}`}
                      href={item.href}
                      className="flex items-center gap-3 text-[#01338C] hover:text-red-600"
                    >
                      <span>{item.text}</span>
                    </a>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <SocialLinks className="text-[#01338C]" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
