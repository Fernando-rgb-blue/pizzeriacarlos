import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header"
import { AppProvider } from "@/components/AppContext"
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata = {
  title: "Pizza CARLO's",
  description: "Generado por medio de next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={roboto.className}>

        {/* editado */}
        <main >
          <AppProvider>
            <Toaster />
            <div className="mx-auto  ">
              <Header />
              <div style={{ height: '50px'}} ></div>
            </div>
            
            <div className="max-w-6xl mx-auto p-4">
              {children}
              <footer className="border-t p-8 text-center text-gray-500 mt-16">
                &copy; 2024 Todos los derechos reservados
              </footer>
            </div>
          </AppProvider>
        </main>
        {/* editado */}
      </body>
    </html>
  )
}
