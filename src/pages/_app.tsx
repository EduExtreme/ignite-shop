import "@/styles/globals.css";
import type { AppProps } from "next/app";
import eLogo from "../../public/avatar.jpg";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import amazonWeb from "../../public/amazonweb.png";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col align-start min-h-screen bg-white text-black-700">
      <header className="w-full  bg-[linear-gradient(90.88deg,_#0f10260_29%,_#1b204075_100%)] h-20 shadow-xl fixed z-10">
        <nav className="flex items-center justify-between h-full px-32">
          <div>
            <Image src="../../../public/Group.png" alt="" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <span className="font-semibold">Dark Mode</span>
              <Switch></Switch>
            </div>
            <Avatar>
              <Image
                src={eLogo}
                alt="Picture of the author"
                objectFit="contain"
                className="w-full h-full "
              />
            </Avatar>
          </div>
        </nav>
      </header>
      <div className="px-32 mt-36">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
