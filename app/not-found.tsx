import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertCircle className="w-16 h-16 text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <p className="text-xl text-muted-foreground">Page not found</p>
          </div>

          <p className="text-muted-foreground max-w-md mx-auto">
            The anime you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
          >
            Go Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
