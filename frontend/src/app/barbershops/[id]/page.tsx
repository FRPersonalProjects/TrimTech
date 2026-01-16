import { cookies } from "next/headers";
import { getBarbershopById } from "@/services/barbershop";
import { getUserMe } from "@/services/user";
import Image from "next/image";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: { id: string };
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const [barbershop, user] = await Promise.all([
    getBarbershopById(params.id, cookieHeader),
    getUserMe(cookieHeader),
  ]);

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="ghost"
          className="border border-primary absolute top-4 left-4"
        >
          <Link href="/">
            <ChevronLeftIcon className="text-primary" size={28}/>
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="p-5 border-b border-solid">
        <h1 className="font-bold text-xl mb-3">{barbershop.name}</h1>
        <div className="flex items-center gap-2 mb-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (888 avaliações)</p>
        </div>
      </div>

      <div className="p-5 space-y-2 border-b border-solid">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
        <p className="text-sm text-justify">{barbershop.description}</p>
      </div>
    </div>
  );
}
