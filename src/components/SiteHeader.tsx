import Link from 'next/link';
import { Disc3 } from 'lucide-react'; // Using Disc3 as a vinyl-like icon

export default function SiteHeader() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <Disc3 className="w-8 h-8" />
          <span>VinylVision</span>
        </Link>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
}
