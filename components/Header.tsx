

// "use client";

// import classNames from "classnames";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useWindowScroll } from "react-use";
// import { usePathname } from "next/navigation";
// import { IoSearch, IoClose, IoPersonOutline } from "react-icons/io5";
// import { CgChevronDown, CgMenu } from "react-icons/cg";

// import myImage from "../cupital-logo.png";

// type NavNode = {
//   name: string;
//   link?: string;
//   children?: NavNode[];
// };

// const MENULINKS: NavNode[] = [
//   {
//     name: "AGENCY",
//     children: [
//       { name: "OUR STORY", link: "/#our_story" },
//       { name: "OUR TEAM", link: "/#team" },
//     ],
//   },
//   { name: "SERVICES", link: "/services" },
//   {
//     name: "OFF PLAN + NEW PROPERTY",
//     children: [
//       { name: "OFF PLAN", link: "/categories" },
//       { name: "NEW BUILDING", link: "/location" },
//     ],
//   },
//   {
//     name: "PROPERTY MANAGEMENT",
//     children: [
//       {
//         name: "RENTAL",
//         children: [
//           { name: "SHORT STAY", link: "/categories" },
//           { name: "LONG STAY", link: "/location" },
//         ],
//       },
//       { name: "HOTEL MANAGEMENT", link: "/sales" },
//     ],
//   },
//   { name: "INVEST IN RWANDA", link: "/invest-rwanda" },
// ];

// const ACCOUNT_LINKS: NavNode = {
//   name: "ACCOUNT",
//   children: [
//     { name: "LOGIN", link: "/account/login" },
//     { name: "REGISTER", link: "/account/register" },
//   ],
// };

// export default function Header() {
//   const { y } = useWindowScroll();
//   const isSticky = y >= 100;
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <>
//       <header
//         className={classNames(
//           "w-full fixed top-0 left-0 z-[10000] transition-all duration-300 bg-white",
//           isSticky ? "shadow-md" : "shadow-none"
//         )}
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between items-center w-full py-3">
//             <Link href="/" className="flex items-center shrink-0">
//               <Image
//                 src={myImage}
//                 width={150}
//                 height={150}
//                 alt="Logo Cupital"
//                 priority
//               />
//             </Link>

//             {/* Desktop */}
//             <div className="hidden lg:flex items-center gap-5">
//               <MenuNav variant="desktop" isSticky={isSticky} onNavigate={() => {}} />

//               <AccountMenu variant="desktop" />

//               <Link
//                 href="/account/register"
//                 className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
//               >
//                 REGISTER
//               </Link>

//               <Link
//                 href="/contact_us"
//                 className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
//               >
//                 CONTACT
//               </Link>

//               <SearchButton isSticky={isSticky} />
//             </div>

//             {/* Tablet small desktop */}
//             <div className="hidden sm:flex lg:hidden items-center gap-3">
//               <Link
//                 href="/account/register"
//                 className="inline-flex items-center justify-center rounded-full bg-black text-white px-4 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-md"
//               >
//                 Register
//               </Link>

//               <button
//                 className="inline-flex items-center"
//                 onClick={() => setMobileOpen(true)}
//                 aria-label="Open menu"
//               >
//                 <CgMenu className="text-3xl text-black cursor-pointer" />
//               </button>
//             </div>

//             {/* Mobile toggle */}
//             <button
//               className="sm:hidden inline-flex items-center"
//               onClick={() => setMobileOpen(true)}
//               aria-label="Open menu"
//             >
//               <CgMenu className="text-3xl text-black cursor-pointer" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Drawer */}
//       {mobileOpen && (
//         <div className="fixed top-0 right-0 w-full h-screen flex items-stretch z-[20000]">
//           <div
//             className="w-[70px] sm:w-[100px] h-full bg-black/50"
//             onClick={() => setMobileOpen(false)}
//           />
//           <div className="w-full h-full bg-primary px-5 py-4 overflow-y-auto">
//             <div className="flex items-center justify-between">
//               <Link href="/" onClick={() => setMobileOpen(false)}>
//                 <Image src={myImage} width={140} height={140} alt="Logo Cupital" />
//               </Link>

//               <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
//                 <IoClose className="text-3xl text-white" />
//               </button>
//             </div>

//             <h2 className="font-bold text-lg mt-4 text-white">Our Menu</h2>
//             <p className="text-sm mt-2 mb-6 text-white/90">
//               Explore our services, properties, and account options.
//             </p>

//             <MenuNav
//               variant="mobile"
//               isSticky={true}
//               onNavigate={() => setMobileOpen(false)}
//             />

//             <div className="mt-6 border-t border-white/20 pt-6">
//               <h3 className="text-white text-base font-semibold mb-3">Account</h3>

//               <div className="grid grid-cols-1 gap-3">
//                 <Link
//                   href="/account/login"
//                   onClick={() => setMobileOpen(false)}
//                   className="inline-flex w-full justify-center rounded-full border border-white bg-transparent py-3 px-4 text-white font-semibold transition-all duration-300 hover:bg-white hover:text-primary"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/account/register"
//                   onClick={() => setMobileOpen(false)}
//                   className="inline-flex w-full justify-center rounded-full bg-white py-3 px-4 text-primary font-semibold transition-all duration-300 hover:opacity-90"
//                 >
//                   Create Account
//                 </Link>

//                 <Link
//                   href="/contact_us"
//                   onClick={() => setMobileOpen(false)}
//                   className="inline-flex w-full justify-center rounded-full bg-black py-3 px-4 text-white font-semibold transition-all duration-300 hover:opacity-90"
//                 >
//                   Contact
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// /** -----------------------------
//  * Shared Menu (Desktop + Mobile)
//  * ------------------------------ */
// function MenuNav({
//   variant,
//   isSticky,
//   onNavigate,
// }: {
//   variant: "desktop" | "mobile";
//   isSticky: boolean;
//   onNavigate: () => void;
// }) {
//   const pathname = usePathname();
//   const isMobile = variant === "mobile";

//   return (
//     <nav
//       className={classNames(
//         "flex",
//         isMobile ? "flex-col gap-2" : "flex-row gap-6 items-center"
//       )}
//     >
//       {MENULINKS.map((item, idx) => (
//         <MenuItem
//           key={`${item.name}-${idx}`}
//           item={item}
//           variant={variant}
//           isSticky={isSticky}
//           pathname={pathname}
//           onNavigate={onNavigate}
//         />
//       ))}
//     </nav>
//   );
// }

// function AccountMenu({ variant }: { variant: "desktop" | "mobile" }) {
//   const pathname = usePathname();
//   const isMobile = variant === "mobile";
//   const [open, setOpen] = useState(false);

//   if (isMobile) return null;

//   const isAccountActive =
//     pathname?.startsWith("/account/login") || pathname?.startsWith("/account/register");

//   return (
//     <div className="relative group py-6">
//       <button
//         type="button"
//         className="relative flex items-center gap-2 text-black"
//       >
//         <IoPersonOutline className="text-lg" />
//         <span className="!capitalize">ACCOUNT</span>
//         <span className="transition-all duration-300 text-[19px]">
//           <CgChevronDown />
//         </span>

//         <span
//           className={classNames(
//             "absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300",
//             isAccountActive ? "w-full" : "w-0 group-hover:w-full"
//           )}
//         />
//       </button>

//       <div className="hidden group-hover:flex absolute mt-6 min-w-[220px] rounded-md bg-[#1F1F1F] py-3 px-3 text-white flex-col gap-2 z-50 shadow-xl">
//         {ACCOUNT_LINKS.children?.map((child, idx) => (
//           <Link
//             key={`${child.name}-${idx}`}
//             href={child.link!}
//             className="py-2 px-3 text-[13px] w-full text-start hover:bg-[#2F2F30] hover:text-primary rounded"
//           >
//             {child.name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MenuItem({
//   item,
//   variant,
//   isSticky,
//   pathname,
//   onNavigate,
// }: {
//   item: NavNode;
//   variant: "desktop" | "mobile";
//   isSticky: boolean;
//   pathname: string | null;
//   onNavigate: () => void;
// }) {
//   const isMobile = variant === "mobile";
//   const hasChildren = Array.isArray(item.children) && item.children.length > 0;
//   const [open, setOpen] = useState(false);

//   const linkTextColor = classNames({
//     "text-white": isMobile,
//     "text-black": !isMobile,
//   });

//   const underlineColor = classNames({
//     "bg-white": isMobile,
//     "bg-black": !isMobile,
//   });

//   const wrapperClass = classNames({
//     "relative group": true,
//     "py-6": !isMobile,
//     "py-2": isMobile,
//   });

//   if (!hasChildren && item.link) {
//     const isActive =
//       pathname === item.link ||
//       (item.link.startsWith("/#") ? pathname === "/" : false);

//     return (
//       <div className={wrapperClass}>
//         <Link
//           href={item.link}
//           onClick={onNavigate}
//           className={classNames("relative !capitalize text-sm font-medium", linkTextColor)}
//         >
//           {item.name}
//           <span
//             className={classNames(
//               "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
//               underlineColor,
//               isActive ? "w-full" : "w-0 group-hover:w-full"
//             )}
//           />
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className={wrapperClass}>
//       <button
//         type="button"
//         onClick={() => {
//           if (isMobile) setOpen((p) => !p);
//         }}
//         className={classNames(
//           "relative flex items-center justify-between gap-3 w-full text-sm font-medium",
//           linkTextColor
//         )}
//       >
//         <span className="!capitalize">{item.name}</span>

//         <span
//           className={classNames("transition-all duration-300 text-[19px]", {
//             "rotate-180": isMobile && open,
//           })}
//         >
//           <CgChevronDown />
//         </span>

//         {!isMobile && (
//           <span
//             className={classNames(
//               "absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300",
//               underlineColor
//             )}
//           />
//         )}
//       </button>

//       <div
//         className={classNames(
//           "bg-[#1F1F1F] py-3 px-3 text-white flex-col gap-2 z-50 shadow-xl",
//           isMobile ? "mt-2 rounded-md" : "absolute mt-6 min-w-[220px] rounded-md",
//           isMobile ? (open ? "flex" : "hidden") : "hidden group-hover:flex"
//         )}
//       >
//         {item.children!.map((child, idx) => (
//           <DropdownNode
//             key={`${child.name}-${idx}`}
//             node={child}
//             variant={variant}
//             onNavigate={onNavigate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function DropdownNode({
//   node,
//   variant,
//   onNavigate,
// }: {
//   node: NavNode;
//   variant: "desktop" | "mobile";
//   onNavigate: () => void;
// }) {
//   const isMobile = variant === "mobile";
//   const hasChildren = Array.isArray(node.children) && node.children.length > 0;
//   const [open, setOpen] = useState(false);

//   if (!hasChildren && node.link) {
//     return (
//       <Link
//         href={node.link}
//         onClick={onNavigate}
//         className="py-2 px-3 text-[13px] w-full text-start hover:bg-[#2F2F30] hover:text-primary rounded"
//       >
//         {node.name}
//       </Link>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col">
//       <button
//         type="button"
//         onClick={() => {
//           if (isMobile) setOpen((p) => !p);
//         }}
//         className="py-2 px-3 text-[13px] w-full text-start hover:bg-[#2F2F30] hover:text-primary flex items-center justify-between rounded"
//       >
//         <span>{node.name}</span>
//         <span
//           className={classNames("transition-all duration-300 text-[19px]", {
//             "rotate-180": isMobile && open,
//           })}
//         >
//           <CgChevronDown />
//         </span>
//       </button>

//       <div
//         className={classNames(
//           "pl-3 mt-1 flex-col gap-1",
//           isMobile ? (open ? "flex" : "hidden") : "flex"
//         )}
//       >
//         {node.children!.map((c, idx) => (
//           <DropdownNode
//             key={`${c.name}-${idx}`}
//             node={c}
//             variant={variant}
//             onNavigate={onNavigate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function SearchButton({ isSticky }: { isSticky: boolean }) {
//   const [isSearching, setIsSearching] = useState(false);

//   return (
//     <>
//       <button onClick={() => setIsSearching(true)} aria-label="Search">
//         <IoSearch className="text-2xl cursor-pointer text-black" />
//       </button>

//       <div
//         className={classNames(
//           "fixed w-full left-0 top-0 flex flex-col transition-all duration-500 z-[30000]",
//           isSearching ? "h-screen" : "h-0"
//         )}
//       >
//         <div
//           className={classNames(
//             "w-full bg-white overflow-hidden transition-all duration-300",
//             isSearching ? "min-h-[23vh]" : "min-h-[0vh]"
//           )}
//         >
//           <div className="max-w-7xl mx-auto px-4 pb-10 pt-16">
//             <div className="relative border-b-2 border-black flex items-center">
//               <input
//                 className="w-full bg-transparent outline-none text-2xl sm:text-5xl placeholder:text-black"
//                 placeholder="Search"
//               />
//               <button
//                 onClick={() => setIsSearching(false)}
//                 className="w-10 h-10 sm:bg-[#F2F2F2] flex items-center justify-center rounded-full hover:w-[45px] hover:h-[45px] duration-300 transition-all"
//                 aria-label="Close search"
//               >
//                 <IoClose className="text-2xl" />
//               </button>
//             </div>
//             <p className="text-xl mt-2 text-[#4C4C4C]">
//               Here you can search anything you need!
//             </p>
//           </div>
//         </div>

//         <div className="flex-1 bg-black/70" onClick={() => setIsSearching(false)} />
//       </div>
//     </>
//   );
// }

// "use client";

// import classNames from "classnames";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { useWindowScroll } from "react-use";
// import { usePathname, useRouter } from "next/navigation";
// import { IoSearch, IoClose, IoPersonOutline } from "react-icons/io5";
// import { CgChevronDown, CgMenu } from "react-icons/cg";

// import myImage from "../cupital-logo.png";
// import { supabaseBrowser } from "@/lib/supabase-browser";

// type NavNode = {
//   name: string;
//   link?: string;
//   children?: NavNode[];
// };

// type AppUser = {
//   id: string;
//   authUserId: string;
//   name: string;
//   email: string;
//   role: "USER" | "ADMIN" | "AGENT";
// };

// const MENULINKS: NavNode[] = [
//   {
//     name: "AGENCY",
//     children: [
//       { name: "OUR STORY", link: "/#our_story" },
//       { name: "OUR TEAM", link: "/#team" },
//     ],
//   },
//   { name: "SERVICES", link: "/services" },
//   {
//     name: "OFF PLAN + NEW PROPERTY",
//     children: [
//       { name: "OFF PLAN", link: "/categories" },
//       { name: "NEW BUILDING", link: "/location" },
//     ],
//   },
//   {
//     name: "PROPERTY MANAGEMENT",
//     children: [
//       {
//         name: "RENTAL",
//         children: [
//           { name: "SHORT STAY", link: "/categories" },
//           { name: "LONG STAY", link: "/location" },
//         ],
//       },
//       { name: "HOTEL MANAGEMENT", link: "/sales" },
//     ],
//   },
//   { name: "INVEST IN RWANDA", link: "/invest-rwanda" },
// ];

// export default function Header() {
//   const { y } = useWindowScroll();
//   const isSticky = y >= 100;

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [user, setUser] = useState<AppUser | null>(null);
//   const [authLoading, setAuthLoading] = useState(true);

//   const router = useRouter();
//   const pathname = usePathname();

//   const fetchProfile = useCallback(async (accessToken?: string | null) => {
//     if (!accessToken) {
//       setUser(null);
//       setAuthLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("/api/auth/me", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         cache: "no-store",
//       });

//       if (!response.ok) {
//         setUser(null);
//         setAuthLoading(false);
//         return;
//       }

//       const result = await response.json();
//       setUser(result?.user ?? null);
//     } catch (error: any) {
//       // Ignore Supabase lock/abort noise safely
//       if (error?.name !== "AbortError") {
//         console.error("Failed to load current user:", error);
//       }
//       setUser(null);
//     } finally {
//       setAuthLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     let active = true;

//     const init = async () => {
//       try {
//         const {
//           data: { session },
//         } = await supabaseBrowser.auth.getSession();

//         if (!active) return;
//         await fetchProfile(session?.access_token ?? null);
//       } catch (error: any) {
//         if (!active) return;

//         if (error?.name !== "AbortError") {
//           console.error("Initial session load failed:", error);
//         }

//         setUser(null);
//         setAuthLoading(false);
//       }
//     };

//     init();

//     const {
//       data: { subscription },
//     } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
//       if (!active) return;

//       // Do not call getSession() again here.
//       // Use the provided session directly.
//       void fetchProfile(session?.access_token ?? null);
//     });

//     return () => {
//       active = false;
//       subscription.unsubscribe();
//     };
//   }, [fetchProfile]);

//   const handleLogout = async () => {
//     try {
//       await supabaseBrowser.auth.signOut();
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       setUser(null);
//       setMobileOpen(false);
//       router.refresh();
//     }
//   };

//   const isLoggedIn = !!user;
//   const isNormalUser = user?.role === "USER";

//   return (
//     <>
//       <header
//         className={classNames(
//           "w-full fixed top-0 left-0 z-[10000] transition-all duration-300 bg-white",
//           isSticky ? "shadow-md" : "shadow-none"
//         )}
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex justify-between items-center w-full py-3">
//             <Link href="/" className="flex items-center shrink-0">
//               <Image
//                 src={myImage}
//                 width={150}
//                 height={150}
//                 alt="Logo Cupital"
//                 priority
//               />
//             </Link>

//             <div className="hidden lg:flex items-center gap-5">
//               <MenuNav variant="desktop" isSticky={isSticky} onNavigate={() => {}} />

//               <AccountMenu
//                 variant="desktop"
//                 user={user}
//                 authLoading={authLoading}
//                 onLogout={handleLogout}
//               />

//               {!authLoading && !isLoggedIn && (
//                 <Link
//                   href={`/account/register?next=${encodeURIComponent(pathname || "/")}`}
//                   className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
//                 >
//                   REGISTER
//                 </Link>
//               )}

//               {!authLoading && isLoggedIn && isNormalUser && (
//                 <Link
//                   href="/account"
//                   className="inline-flex items-center justify-center rounded-full bg-black text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
//                 >
//                   MY ACCOUNT
//                 </Link>
//               )}

//               <Link
//                 href="/contact_us"
//                 className="inline-flex items-center justify-center rounded-full border border-black px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
//               >
//                 CONTACT
//               </Link>

//               <SearchButton />
//             </div>

//             <div className="hidden sm:flex lg:hidden items-center gap-3">
//               {!authLoading && !isLoggedIn && (
//                 <Link
//                   href={`/account/register?next=${encodeURIComponent(pathname || "/")}`}
//                   className="inline-flex items-center justify-center rounded-full bg-black text-white px-4 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-md"
//                 >
//                   Register
//                 </Link>
//               )}

//               {!authLoading && isLoggedIn && isNormalUser && (
//                 <Link
//                   href="/account"
//                   className="inline-flex items-center justify-center rounded-full bg-black text-white px-4 py-2 text-sm font-semibold transition-all duration-300 hover:shadow-md"
//                 >
//                   My Account
//                 </Link>
//               )}

//               <button
//                 className="inline-flex items-center"
//                 onClick={() => setMobileOpen(true)}
//                 aria-label="Open menu"
//               >
//                 <CgMenu className="text-3xl text-black cursor-pointer" />
//               </button>
//             </div>

//             <button
//               className="sm:hidden inline-flex items-center"
//               onClick={() => setMobileOpen(true)}
//               aria-label="Open menu"
//             >
//               <CgMenu className="text-3xl text-black cursor-pointer" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {mobileOpen && (
//         <div className="fixed top-0 right-0 w-full h-screen flex items-stretch z-[20000]">
//           <div
//             className="w-[70px] sm:w-[100px] h-full bg-black/50"
//             onClick={() => setMobileOpen(false)}
//           />
//           <div className="w-full h-full bg-primary px-5 py-4 overflow-y-auto">
//             <div className="flex items-center justify-between">
//               <Link href="/" onClick={() => setMobileOpen(false)}>
//                 <Image src={myImage} width={140} height={140} alt="Logo Cupital" />
//               </Link>

//               <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
//                 <IoClose className="text-3xl text-white" />
//               </button>
//             </div>

//             <h2 className="font-bold text-lg mt-4 text-white">Our Menu</h2>
//             <p className="text-sm mt-2 mb-6 text-white/90">
//               Explore our services, properties, and account options.
//             </p>

//             <MenuNav
//               variant="mobile"
//               isSticky={true}
//               onNavigate={() => setMobileOpen(false)}
//             />

//             <div className="mt-6 border-t border-white/20 pt-6">
//               <h3 className="text-white text-base font-semibold mb-3">Account</h3>

//               <div className="grid grid-cols-1 gap-3">
//                 {!authLoading && !isLoggedIn && (
//                   <>
//                     <Link
//                       href={`/account/login?next=${encodeURIComponent(pathname || "/")}`}
//                       onClick={() => setMobileOpen(false)}
//                       className="inline-flex w-full justify-center rounded-full border border-white bg-transparent py-3 px-4 text-white font-semibold transition-all duration-300 hover:bg-white hover:text-primary"
//                     >
//                       Login
//                     </Link>

//                     <Link
//                       href={`/account/register?next=${encodeURIComponent(pathname || "/")}`}
//                       onClick={() => setMobileOpen(false)}
//                       className="inline-flex w-full justify-center rounded-full bg-white py-3 px-4 text-primary font-semibold transition-all duration-300 hover:opacity-90"
//                     >
//                       Create Account
//                     </Link>
//                   </>
//                 )}

//                 {!authLoading && isLoggedIn && isNormalUser && (
//                   <>
//                     <Link
//                       href="/account"
//                       onClick={() => setMobileOpen(false)}
//                       className="inline-flex w-full justify-center rounded-full border border-white bg-transparent py-3 px-4 text-white font-semibold transition-all duration-300 hover:bg-white hover:text-primary"
//                     >
//                       My Account
//                     </Link>

//                     <button
//                       type="button"
//                       onClick={handleLogout}
//                       className="inline-flex w-full justify-center rounded-full bg-white py-3 px-4 text-primary font-semibold transition-all duration-300 hover:opacity-90"
//                     >
//                       Logout
//                     </button>
//                   </>
//                 )}

//                 <Link
//                   href="/contact_us"
//                   onClick={() => setMobileOpen(false)}
//                   className="inline-flex w-full justify-center rounded-full bg-black py-3 px-4 text-white font-semibold transition-all duration-300 hover:opacity-90"
//                 >
//                   Contact
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// function MenuNav({
//   variant,
//   isSticky,
//   onNavigate,
// }: {
//   variant: "desktop" | "mobile";
//   isSticky: boolean;
//   onNavigate: () => void;
// }) {
//   const pathname = usePathname() || "";
//   const isMobile = variant === "mobile";

//   return (
//     <nav
//       className={classNames(
//         "flex",
//         isMobile ? "flex-col gap-2" : "flex-row gap-6 items-center"
//       )}
//     >
//       {MENULINKS.map((item, idx) => (
//         <MenuItem
//           key={`${item.name}-${idx}`}
//           item={item}
//           variant={variant}
//           isSticky={isSticky}
//           pathname={pathname}
//           onNavigate={onNavigate}
//         />
//       ))}
//     </nav>
//   );
// }

// function AccountMenu({
//   variant,
//   user,
//   authLoading,
//   onLogout,
// }: {
//   variant: "desktop" | "mobile";
//   user: AppUser | null;
//   authLoading: boolean;
//   onLogout: () => void | Promise<void>;
// }) {
//   const pathname = usePathname() || "";
//   const isMobile = variant === "mobile";

//   const accountLinks = useMemo<NavNode>(() => {
//     if (!user) {
//       return {
//         name: "ACCOUNT",
//         children: [
//           { name: "LOGIN", link: "/account/login" },
//           { name: "REGISTER", link: "/account/register" },
//         ],
//       };
//     }

//     return {
//       name: "ACCOUNT",
//       children: [{ name: "MY ACCOUNT", link: "/account" }],
//     };
//   }, [user]);

//   if (isMobile || authLoading) return null;

//   const isAccountActive =
//     pathname.startsWith("/account") || pathname.startsWith("/admin");

//   return (
//     <div className="relative group py-6">
//       <button type="button" className="relative flex items-center gap-2 text-black">
//         <IoPersonOutline className="text-lg" />
//         <span className="!capitalize">
//           {user ? user.name.split(" ")[0] : "ACCOUNT"}
//         </span>
//         <span className="transition-all duration-300 text-[19px]">
//           <CgChevronDown />
//         </span>

//         <span
//           className={classNames(
//             "absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300",
//             isAccountActive ? "w-full" : "w-0 group-hover:w-full"
//           )}
//         />
//       </button>

//       <div className="hidden group-hover:flex absolute mt-6 min-w-[220px] rounded-md bg-[#1F1F1F] py-3 px-3 text-white flex-col gap-2 z-50 shadow-xl">
//         {accountLinks.children?.map((child, idx) => (
//           <Link
//             key={`${child.name}-${idx}`}
//             href={child.link!}
//             className="py-2 px-3 text-[13px] w-full text-start hover:bg-[#2F2F30] hover:text-primary rounded"
//           >
//             {child.name}
//           </Link>
//         ))}

//         {user && (
//           <button
//             type="button"
//             onClick={onLogout}
//             className="py-2 px-3 text-[13px] w-full text-start hover:bg-[#2F2F30] hover:text-primary rounded"
//           >
//             LOGOUT
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// function MenuItem({
//   item,
//   variant,
//   isSticky,
//   pathname,
//   onNavigate,
// }: {
//   item: NavNode;
//   variant: "desktop" | "mobile";
//   isSticky: boolean;
//   pathname: string;
//   onNavigate: () => void;
// }) {
//   const isMobile = variant === "mobile";
//   const hasChildren = Array.isArray(item.children) && item.children.length > 0;
//   const [open, setOpen] = useState(false);

//   const linkTextColor = classNames({
//     "text-white": isMobile,
//     "text-black": !isMobile,
//   });

//   const underlineColor = classNames({
//     "bg-white": isMobile,
//     "bg-black": !isMobile,
//   });

//   const wrapperClass = classNames({
//     "relative group": true,
//     "py-6": !isMobile,
//     "py-2": isMobile,
//   });

//   if (!hasChildren && item.link) {
//     const isActive =
//       pathname === item.link || (item.link.startsWith("/#") ? pathname === "/" : false);

//     return (
//       <div className={wrapperClass}>
//         <Link
//           href={item.link}
//           onClick={onNavigate}
//           className={classNames("relative !capitalize text-sm font-medium", linkTextColor)}
//         >
//           {item.name}
//           <span
//             className={classNames(
//               "absolute -bottom-1 left-0 h-0.5 transition-all duration-300",
//               underlineColor,
//               isActive ? "w-full" : "w-0 group-hover:w-full"
//             )}
//           />
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className={wrapperClass}>
//       <button
//         type="button"
//         onClick={() => {
//           if (isMobile) setOpen((p) => !p);
//         }}
//         className={classNames(
//           "relative flex items-center justify-between gap-3 w-full text-sm font-medium",
//           linkTextColor
//         )}
//       >
//         <span className="!capitalize">{item.name}</span>

//         <span
//           className={classNames("transition-all duration-300 text-[19px]", {
//             "rotate-180": isMobile && open,
//           })}
//         >
//           <CgChevronDown />
//         </span>

//         {!isMobile && (
//           <span
//             className={classNames(
//               "absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300",
//               underlineColor
//             )}
//           />
//         )}
//       </button>

//       <div
//         className={classNames(
//           "bg-[#1F1F1F] py-3 px-3 text-white flex-col gap-2 z-50 shadow-xl",
//           isMobile ? "mt-2 rounded-md" : "absolute mt-6 min-w-[220px] rounded-md",
//           isMobile ? (open ? "flex" : "hidden") : "hidden group-hover:flex"
//         )}
//       >
//         {item.children!.map((child, idx) => (
//           <DropdownNode
//             key={`${child.name}-${idx}`}
//             node={child}
//             variant={variant}
//             onNavigate={onNavigate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function DropdownNode({
//   node,
//   variant,
//   onNavigate,
// }: {
//   node: NavNode;
//   variant: "desktop" | "mobile";
//   onNavigate: () => void;
// }) {
//   const isMobile = variant === "mobile";
//   const hasChildren = Array.isArray(node.children) && node.children.length > 0;
//   const [open, setOpen] = useState(false);

//   if (!hasChildren && node.link) {
//     return (
//       <Link
//         href={node.link}
//         onClick={onNavigate}
//         className="py-2 px-3 text-[13px] w-full text-start hover:bg-[#2F2F30] hover:text-primary rounded"
//       >
//         {node.name}
//       </Link>
//     );
//   }

//   return (
//     <div className="w-full flex flex-col">
//       <button
//         type="button"
//         onClick={() => {
//           if (isMobile) setOpen((p) => !p);
//         }}
//         className="py-2 px-3 text-[13px] w-full text-start hover:bg-[#2F2F30] hover:text-primary flex items-center justify-between rounded"
//       >
//         <span>{node.name}</span>
//         <span
//           className={classNames("transition-all duration-300 text-[19px]", {
//             "rotate-180": isMobile && open,
//           })}
//         >
//           <CgChevronDown />
//         </span>
//       </button>

//       <div
//         className={classNames(
//           "pl-3 mt-1 flex-col gap-1",
//           isMobile ? (open ? "flex" : "hidden") : "flex"
//         )}
//       >
//         {node.children!.map((c, idx) => (
//           <DropdownNode
//             key={`${c.name}-${idx}`}
//             node={c}
//             variant={variant}
//             onNavigate={onNavigate}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function SearchButton() {
//   const [isSearching, setIsSearching] = useState(false);

//   return (
//     <>
//       <button onClick={() => setIsSearching(true)} aria-label="Search">
//         <IoSearch className="text-2xl cursor-pointer text-black" />
//       </button>

//       <div
//         className={classNames(
//           "fixed w-full left-0 top-0 flex flex-col transition-all duration-500 z-[30000]",
//           isSearching ? "h-screen" : "h-0"
//         )}
//       >
//         <div
//           className={classNames(
//             "w-full bg-white overflow-hidden transition-all duration-300",
//             isSearching ? "min-h-[23vh]" : "min-h-[0vh]"
//           )}
//         >
//           <div className="max-w-7xl mx-auto px-4 pb-10 pt-16">
//             <div className="relative border-b-2 border-black flex items-center">
//               <input
//                 className="w-full bg-transparent outline-none text-2xl sm:text-5xl placeholder:text-black"
//                 placeholder="Search"
//               />
//               <button
//                 onClick={() => setIsSearching(false)}
//                 className="w-10 h-10 sm:bg-[#F2F2F2] flex items-center justify-center rounded-full hover:w-[45px] hover:h-[45px] duration-300 transition-all"
//                 aria-label="Close search"
//               >
//                 <IoClose className="text-2xl" />
//               </button>
//             </div>
//             <p className="text-xl mt-2 text-[#4C4C4C]">
//               Here you can search anything you need!
//             </p>
//           </div>
//         </div>

//         <div className="flex-1 bg-black/70" onClick={() => setIsSearching(false)} />
//       </div>
//     </>
//   );
// }

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