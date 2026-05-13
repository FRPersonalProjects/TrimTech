import { cookies } from "next/headers";
import { getMyBookings } from "@/services/booking";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export default async function BookingsPage() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const bookings = await getMyBookings(cookieHeader);

  const now = new Date();

  // separa os agendamentos em futuros e passados
  const upcoming = bookings.filter((b) => new Date(b.date) >= now);
  const past = bookings.filter((b) => new Date(b.date) < now);

  return (
    <div>
      <Header />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-6">
          <Button size="icon" variant="ghost" className="border border-primary" asChild>
            <Link href="/">
              <ChevronLeftIcon className="text-primary" size={20} />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Meus Agendamentos</h1>
        </div>

        {bookings.length === 0 && (
          <p className="text-sm text-gray-400 text-center mt-10">
            Nenhum agendamento ainda.
          </p>
        )}

        {upcoming.length > 0 && (
          <section className="mb-6">
            <h2 className="uppercase text-xs font-bold text-gray-400 mb-3">
              Próximos
            </h2>
            <div className="flex flex-col gap-3">
              {upcoming.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="uppercase text-xs font-bold text-gray-400 mb-3">
              Finalizados
            </h2>
            <div className="flex flex-col gap-3">
              {past.map((booking) => (
                <BookingCard key={booking.id} booking={booking} isPast />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function BookingCard({
  booking,
  isPast = false,
}: {
  booking: any;
  isPast?: boolean;
}) {
  const date = new Date(booking.date);

  return (
    <Card className="rounded-2xl">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-2 py-5 pl-5">
          <Badge variant={isPast ? "secondary" : "default"} className="w-fit">
            {isPast ? "Finalizado" : "Confirmado"}
          </Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
          <p className="text-sm">{MONTH_NAMES[date.getMonth()]}</p>
          <p className="text-2xl font-bold">{String(date.getDate()).padStart(2, "0")}</p>
          <p className="text-sm">
            {String(date.getHours()).padStart(2, "0")}:
            {String(date.getMinutes()).padStart(2, "0")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
