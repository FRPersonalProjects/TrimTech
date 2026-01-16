"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, EyeClosed, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      router.refresh();
      router.push("/");
    } catch (err) {
      setEmail("");
      setPassword("");
      setError("Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <style jsx global>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #1e1e1e inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>

      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/logos2.svg"
              alt="Logo"
              width={500}
              height={160}
              priority
              className="mb-4"
            />
            <h1 className="text-xl font-bold text-primary">Login</h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`w-full max-w-[85%] sm:max-w-md flex flex-col mt-4 ${error ? "animate-shake" : ""}`}
          >
            <div className="space-y-4 w-full">
              <Input
                id="email"
                type="email"
                placeholder={error ? error : "Email"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                required={!error}
                className={`bg-muted/50 h-11 rounded-full px-6 transition-all ${
                  error
                    ? "border-destructive border-2 ring-destructive placeholder:text-destructive placeholder:font-bold"
                    : "border-none"
                }`}
              />

              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Senha"
                    required={!error}
                    className={`bg-muted/50 pr-12 h-11 rounded-full px-6 transition-all ${
                      error
                        ? "border-destructive border-2 ring-destructive"
                        : "border-none"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                  </button>
                </div>
                <div className="flex justify-end">
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary font-bold hover:text-white mt-2 mr-3"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary h-11 text-slate-200 font-semibold rounded-full border-2 border-primary mt-8 hover:bg-background transition-all group"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Entrar{" "}
                  <LogIn
                    className="group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </>
              )}
            </Button>
          </form>

          <div className="w-full max-w-[85%] sm:max-w-md mt-4">
            <div className="relative w-full flex items-center py-2">
              <div className="flex-grow border-t border-muted"></div>
              <span className="text-[12px] font-bold bg-background px-3 text-muted-foreground uppercase">
                ou
              </span>
              <div className="flex-grow border-t border-muted"></div>
            </div>

            <Button
              variant="outline"
              className="w-full h-11 font-semibold rounded-full border-2 border-primary text-slate-200 mt-4"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={18}
                height={18}
                className="mr-2"
              />
              Entrar com Google
            </Button>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem conta?{" "}
                <a
                  href="/register"
                  className="text-primary font-bold hover:text-white"
                >
                  Crie Aqui
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full py-6 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Desenvolvido por Felipe Ribeiro
        </p>
      </footer>
    </main>
  );
}
