"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function GaleriaTabs({
  fotos,
  youtubeId,
  titulo,
}: {
  fotos: string[];
  youtubeId: string;
  titulo: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <Card className="rounded-3xl border-slate-200 p-5 shadow-sm">
      <Tabs defaultValue="fotos">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fotos">Fotos</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>

        <TabsContent value="fotos" className="mt-5">
          <div className="grid gap-4 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="relative h-[320px] w-full overflow-hidden rounded-2xl border border-slate-200 md:h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fotos[active] ?? fotos[0]}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.995 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={fotos[active] ?? fotos[0]}
                    alt={`Foto ${active + 1} - ${titulo}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-3 gap-3 lg:grid-cols-2">
              {fotos.slice(0, 6).map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  onClick={() => setActive(i)}
                  className={[
                    "relative h-24 overflow-hidden rounded-xl border md:h-28",
                    i === active ? "border-slate-900" : "border-slate-200",
                    "hover:opacity-90",
                  ].join(" ")}
                >
                  <Image src={src} alt={`Miniatura ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-5">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`Video - ${titulo}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
