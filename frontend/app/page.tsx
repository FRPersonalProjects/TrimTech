import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import Header from "./_components/header";
import { Input } from "./_components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { request } from "./_lib/request";

async function Home() {
  // pega todos os cookies para repassar ao backend
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  let user = null;

  try {
    // chama a rota /me enviando os cookies para validar o token
    user = await request("/auth/me", {
      headers: {
        Cookie: cookieHeader, 
      },
      cache: "no-store",
    });
  } catch (err) {
    // token expirado ou inválido, redireciona para o login
    redirect("/login");
  }

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {user.name}!</h2>
        <p>Sexta feira, 09 de janeiro</p>
        <div className="flex items-center gap-2 mt-6 space-x-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Banner"
            src="/banner-01.png"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <h2 className="mb-3 uppercase text-xs font-bold text-gray-400 mt-6 ">
          Agendamentos
        </h2>
        <Card className="rounded-2xl">
          <CardContent className="flex justify-between p-0">
            {/* esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Nome da Barbearia</p>
              </div>
            </div>
            {/* direita */}
            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">08:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
