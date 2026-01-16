"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export default function BarbershopNotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-sm flex flex-col items-center">
          <h2 className="text-2xl font-bold text-primary">
            Página não encontrada
          </h2>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Não conseguimos encontrar os detalhes desta página. <br />
            Ela pode ter sido removida ou o link está incorreto.
          </p>

          <Button
            asChild
            className="w-full h-11 bg-primary text-slate-200 font-semibold rounded-full border-2 border-primary mt-10 hover:bg-background transition-all group"
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <ChevronLeftIcon
                className="group-hover:-translate-x-1 transition-transform"
                size={18}
              />
              Voltar para o início
            </Link>
          </Button>
        </div>
      </div>

      <footer className="w-full py-6 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
          Desenvolvido por Felipe Ribeiro
        </p>
      </footer>
    </main>
  );
}
