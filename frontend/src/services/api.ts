// server components usam a url interna do docker, browser usa a publica
const API_URL =
  typeof window === "undefined"
    ? (process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL)
    : process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function api(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include", // para o backend separado receber cookies
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });
  const text = await res.text();

  // tenta converter para JSON, se falhar ou estiver vazio, retorna o texto puro
  const body = (() => {
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return text;
    }
  })();

  if (!res.ok) {
    const err = Object.assign(
      new Error(body?.message || res.statusText || "Request failed"),
      { status: res.status, body }
    );
    throw err;
  }
  return body;
}
