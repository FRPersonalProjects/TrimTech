import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row items-center justify-between">
        <Image src="/logo.svg" alt="Logo" width={160} height={30} />
        <Button
          size="icon"
          variant="ghost"
          className="focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 [&_svg]:size-7"
        >
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
