import { api } from "./api";

export type Booking = {
  id: string;
  userId: string;
  serviceId: string;
  date: string;
  service: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    barbershop: {
      name: string;
      imageUrl: string;
    };
  };
};

// busca agendamentos do user logado
export async function getMyBookings(cookieHeader: string): Promise<Booking[]> {
  return await api("/bookings", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
}

export async function createBooking(
  serviceId: string,
  date: string,
  cookieHeader: string
): Promise<Booking> {
  return await api("/bookings", {
    method: "POST",
    headers: { cookie: cookieHeader },
    body: JSON.stringify({ serviceId, date }),
  });
}

export async function cancelBooking(
  id: string,
  cookieHeader: string
): Promise<void> {
  await api(`/bookings/${id}`, {
    method: "DELETE",
    headers: { cookie: cookieHeader },
  });
}
