import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, Home, LayoutDashboard, Image as ImageIcon, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Espace Admin — UVS Voyages",
  description: "Administration du site UVS Voyages",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-primary text-white shadow-soft">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xl font-bold tracking-tight">
              UVS Admin
            </Link>
            <nav className="hidden md:flex gap-4 text-sm font-medium">
              <Link href="/admin" className="flex items-center gap-2 hover:text-accent transition-colors">
                <LayoutDashboard className="h-4 w-4" /> Soumissions
              </Link>
              <Link href="/admin/temoignages" className="flex items-center gap-2 hover:text-accent transition-colors">
                <ImageIcon className="h-4 w-4" /> Galerie
              </Link>
              <Link href="/admin/blog" className="flex items-center gap-2 hover:text-accent transition-colors">
                <BookOpen className="h-4 w-4" /> Blog
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden sm:flex text-sm hover:text-accent transition-colors items-center gap-2">
              <Home className="h-4 w-4" /> Retour au site
            </Link>
            <Link href="/admin/login" className="flex items-center gap-2 text-sm font-bold text-accent hover:text-white transition-colors">
              <LogOut className="h-4 w-4" /> Déconnexion
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation mobile */}
      <nav className="md:hidden flex border-b bg-primary/95 text-white p-2 justify-around text-xs font-medium">
        <Link href="/admin" className="flex flex-col items-center gap-1 p-2">
          <LayoutDashboard className="h-5 w-5" /> Soumissions
        </Link>
        <Link href="/admin/temoignages" className="flex flex-col items-center gap-1 p-2">
          <ImageIcon className="h-5 w-5" /> Galerie
        </Link>
        <Link href="/" className="flex flex-col items-center gap-1 p-2 text-muted/80">
          <Home className="h-5 w-5" /> Site public
        </Link>
      </nav>

      <main className="flex-1 p-4 md:p-8 container mx-auto">
        {children}
      </main>
    </div>
  );
}
