import { api } from "./api";

export type Barbershop = {
  id: string;
  name: string;
  address?: string | null;
  phone?: string[];
  description?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

// buscar todas as barbearias
export async function getBarbershops(
  cookieHeader: string
): Promise<Barbershop[]> {
  return await api("/barbershops", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
}

// ordena as barbearias pelo nome
export async function getBarbershopsSortedByName(
  cookieHeader: string
): Promise<Barbershop[]> {
  const barbershops = await getBarbershops(cookieHeader);
  if (!Array.isArray(barbershops)) {
    return [];
  }
  // copia e ordena
  return [...barbershops].sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
  );
}

// buscar uma barbearia pelo ID
export async function getBarbershopById(
  id: string,
  cookieHeader: string
): Promise<Barbershop | null> {
  try {
    const response = await api(`/barbershops/${id}`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    return response;
  } catch (error) {
    const e = error as { status?: number; message?: string };
    if (e.status === 404 || e.message?.includes("not found")) {
      return null;
    }

    throw error;
  }
}
