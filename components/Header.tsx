

"use client";

import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CgMenu } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

import myImage from "../cupital-logo.png";

type NavItem = {
  name: string;
  link: string;
};

const MENU_LINKS: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "Services", link: "/services" },
  { name: "Properties", link: "/properties" },
  { name: "Hotels Management", link: "/hotels-management" },
  { name: "Invest In Rwanda", link: "/invest-rwanda" },
  { name: "Contact Us", link: "/contact_us" },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 z-[9999] w-full bg-transparent">
        <div className="mx-auto flex h-[88px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" className="flex items-center" aria-label="Go to homepage">
            <Image
              src={myImage}
              alt="Logo"
              width={170}
              height={70}
              priority
              className="h-auto w-[120px] sm:w-[145px] lg:w-[165px]"
            />
          </Link>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#7FE7D8]"
          >
            <CgMenu className="text-[34px]" />
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-[10000]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-[#232A33] px-8 pb-8 pt-6 shadow-2xl sm:max-w-[480px]">
            <div className="mb-10 flex items-start justify-between">
              <Link href="/" onClick={() => setDrawerOpen(false)}>
                <Image
                  src={myImage}
                  alt="Logo"
                  width={170}
                  height={72}
                  className="h-auto w-[120px] sm:w-[150px]"
                />
              </Link>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#7FE7D8]"
              >
                <IoClose className="text-[34px]" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-5">
              {MENU_LINKS.map((item, index) => (
                <DrawerLink
                  key={`${item.name}-${index}`}
                  item={item}
                  onNavigate={() => setDrawerOpen(false)}
                />
              ))}

              <div className="mt-6 w-[72px] border-t border-[#0D1730]" />

              <div className="mt-8 space-y-3 text-white">
                <p className="text-[18px] font-medium text-white/95">
                  +250-078-457-8531
                </p>
                <p className="text-[18px] font-medium text-white/95">
                  +250-078-381-2110
                </p>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

function DrawerLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.link;

  return (
    <Link
      href={item.link}
      onClick={onNavigate}
      className={classNames(
        "flex min-h-[54px] items-center text-[24px] font-medium tracking-[-0.02em] transition-colors sm:text-[28px]",
        isActive ? "text-[#7FE7D8]" : "text-white hover:text-[#7FE7D8]"
      )}
    >
      {item.name}
    </Link>
  );
}