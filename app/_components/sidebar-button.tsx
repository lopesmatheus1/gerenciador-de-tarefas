"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  children: React.ReactNode;
  href: string;
}

const SidebarButton = ({ children, href }: SidebarButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      className={`${isActive ? "text-primary bg-primary/15 hover:bg-primary/10" : "bg-white"} justify-start h-11 text-sm`}
      variant={`${isActive ? "secondary" : "ghost"}`}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
