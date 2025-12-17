"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Send } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

function waLink(phone: string, text: string) {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

type Props = {
  proyecto: string;
  tipo?: "LOTES" | "DEPARTAMENTOS" | "CASAS" | "PROPIEDAD";
  whatsapp: string;
  telefono: string;
};

export default function StickyContactoCardCentenario({
  proyecto,
  tipo = "LOTES",
  whatsapp,
  telefono,
}: Props) {
  const [step, setStep] = useState<1 | 2>(1);

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [doc, setDoc] = useState("");
  const [pais, setPais] = useState("+51");
  const [telefonoForm, setTelefonoForm] = useState("");
  const [email, setEmail] = useState("");

  const [aceptaDatos, setAceptaDatos] = useState(true);
  const [aceptaCom, setAceptaCom] = useState(true);

  const msg = useMemo(() => {
    return `Hola, quiero información del proyecto: ${proyecto}
Nombre: ${nombre} ${apellidos}
Documento: ${doc}
Teléfono: ${pais} ${telefonoForm}
Email: ${email}`;
  }, [proyecto, nombre, apellidos, doc, pais, telefonoForm, email]);

  const canSend =
    nombre.trim().length >= 2 &&
    apellidos.trim().length >= 2 &&
    doc.trim().length >= 8 &&
    telefonoForm.trim().length >= 7 &&
    email.includes("@") &&
    aceptaDatos;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="lg:sticky lg:top-6"
    >
      <Card className="relative overflow-hidden rounded-3xl border-0 bg-[#0B6FB6] p-6 text-white shadow-[0_24px_70px_rgba(2,6,23,0.30)]">
        {/* label arriba derecha */}
        <div className="absolute right-4 top-4 text-xs font-extrabold tracking-wide text-white/90">
          {tipo}
        </div>

        {/* Steps (1 / 2) */}
        <div className="mx-auto mt-2 flex max-w-[260px] items-center justify-center gap-3">
          <button
            onClick={() => setStep(1)}
            className={[
              "grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold",
              step === 1 ? "bg-[#FFB200] text-slate-900" : "bg-white/20 text-white",
            ].join(" ")}
          >
            1
          </button>
          <div className="h-0.5 w-16 bg-white/25" />
          <button
            onClick={() => setStep(2)}
            className={[
              "grid h-8 w-8 place-items-center rounded-full text-xs font-extrabold",
              step === 2 ? "bg-[#FFB200] text-slate-900" : "bg-white/20 text-white",
            ].join(" ")}
          >
            2
          </button>
        </div>

        <h3 className="mt-4 text-center text-lg font-extrabold">
          Quiero recibir información
        </h3>

        {/* Form */}
        <div className="mt-5 rounded-2xl bg-white/10 p-4 backdrop-blur">
          {step === 1 ? (
            <div className="grid grid-cols-2 gap-3">
              <Input
                className="h-11 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
                placeholder="Nombre*"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Input
                className="h-11 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
                placeholder="Apellidos*"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
              <div className="col-span-2">
                <Input
                  className="h-11 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
                  placeholder="Nro. de documento*"
                  value={doc}
                  onChange={(e) => setDoc(e.target.value)}
                />
              </div>

              <div className="col-span-2 flex gap-3">
                <select
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  className="h-11 w-[92px] rounded-2xl bg-white px-3 text-sm font-bold text-slate-900 outline-none"
                >
                  <option value="+51">+51</option>
                  <option value="+54">+54</option>
                  <option value="+56">+56</option>
                  <option value="+57">+57</option>
                  <option value="+58">+58</option>
                </select>

                <Input
                  className="h-11 flex-1 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
                  placeholder="Teléfono*"
                  value={telefonoForm}
                  onChange={(e) => setTelefonoForm(e.target.value)}
                />
              </div>

              <div className="col-span-2 flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  className="h-10 rounded-full bg-white/15 text-white hover:bg-white/20"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Input
                className="h-11 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400"
                placeholder="Correo electrónico*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label className="flex items-start gap-3 text-xs text-white/90">
                <Checkbox checked={aceptaDatos} onCheckedChange={(v) => setAceptaDatos(Boolean(v))} />
                <span className="leading-relaxed">
                  He leído y acepto el{" "}
                  <Link className="underline underline-offset-2" href="/tratamiento-datos">
                    Tratamiento de mis datos personales
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-3 text-xs text-white/90">
                <Checkbox checked={aceptaCom} onCheckedChange={(v) => setAceptaCom(Boolean(v))} />
                <span className="leading-relaxed">
                  He leído y acepto la{" "}
                  <Link className="underline underline-offset-2" href="/politica-comunicaciones">
                    Política para envío de comunicaciones comerciales
                  </Link>
                  .
                </span>
              </label>

              <Button
                asChild
                disabled={!canSend}
                className="mt-2 h-12 w-full rounded-full bg-[#FFB200] text-slate-900 hover:bg-[#ffbf2e] disabled:opacity-50"
              >
                <Link href={waLink(whatsapp, msg)} target="_blank">
                  <Send className="mr-2 h-4 w-4" />
                  Solicitar información
                </Link>
              </Button>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 rounded-full bg-white text-slate-900 hover:bg-white/90"
                >
                  <Link href={`tel:${telefono.replace(/\s/g, "")}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Llamar
                  </Link>
                </Button>

                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-11 rounded-full bg-white/15 text-white hover:bg-white/20"
                >
                  Volver
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
