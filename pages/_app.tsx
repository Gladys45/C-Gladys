import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { Nunito_Sans } from "next/font/google";
import ButtonTop from "../components/ButtonTop";
import Footer from "../components/Footer";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const outfit = Nunito_Sans({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={outfit.className}>
      <section id="top" />
      <Header />
      <Component {...pageProps} />
      <ButtonTop />
      <Footer />
      <FloatingWhatsApp
        phoneNumber="+250784578531"
        accountName="Cupital Group"
        avatar="/assets/frame.jpg"
        buttonClassName="left-6 bottom-0 z-[70000] fixed bg-slate-400"
        chatboxClassName="left-6 bottom-0 z-[70000] fixed bg-slate-400"
      />
    </main>
  );
}
