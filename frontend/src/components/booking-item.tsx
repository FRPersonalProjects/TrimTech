import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

// componente simples so pra mostrar o card na home e linkar pra pagina de bookings
export function BookingItem() {
  return (
    <>
      <h2 className="mb-3 uppercase text-xs font-bold text-gray-400 mt-6 ">
        Agendamentos
      </h2>
      <Link href="/bookings">
        <Card className="rounded-2xl hover:opacity-80 transition-opacity cursor-pointer">
          <CardContent className="flex justify-between p-0">
            {/* esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Ver todos</Badge>
              <h3 className="font-semibold">Meus agendamentos</h3>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Clique para ver</p>
              </div>
            </div>
            {/* direita */}
            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Seus</p>
              <p className="text-2xl">📅</p>
              <p className="text-sm">Cortes</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
