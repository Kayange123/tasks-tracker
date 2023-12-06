import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const headingFont = localFont({ src: "../public/fonts/font.woff2" });

const appName = "Taskier";
const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center justify-center gap-x-3 hidden md:flex">
        <Image src="/logo.svg" alt="logo" height={50} width={50} />
        <p className={cn("text-xl text-neutral-700 ", headingFont.className)}>
          {appName}
        </p>
      </div>
    </Link>
  );
};

export default Logo;
