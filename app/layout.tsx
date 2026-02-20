
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Bagaha Live - Trusted Local News",
  description: "Real-time breaking news from Bagaha.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-0 flex justify-between items-center">

    {/* Logo + Brand */}
    <Link href="/" className="flex items-center gap-0 sm:gap-2 group"    >
      <img
        src="/logo.png"
        alt="Bagaha Live Logo"
        className="h-14 w-auto object-contain"
      />
      <span className="text-2xl font-extrabold tracking-tight group-hover:text-red-600 transition">
        Bagaha Live
      </span>
    </Link>

    {/* Nav */}
    <nav className="hidden md:flex gap-8 text-sm font-medium">
    <Link href="/" className="hover:opacity-70 transition">
        Home
      </Link>
      <Link href="/news" className="hover:opacity-70 transition">
        News
      </Link>
      <Link href="/privacy-policy" className="hover:opacity-70 transition">
        Privacy
      </Link>
      <Link href="/terms" className="hover:opacity-70 transition">
        Terms
      </Link>
      <Link href="/contact" className="hover:opacity-70 transition">
        Contact
      </Link>
    </nav>

    {/* CTA */}
    <a
      href="#"
      className=" bg-red-600 text-white   px-6 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition"
    >
      Download
    </a>

  </div>
</header>


<main className="max-w-7xl mx-auto px-6 pt-20 pb-20">
{children}</main>
<footer className="border-t py-14 bg-neutral-100 text-neutral-600">
  <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-sm">

    {/* Brand */}
    <div>
      <h3 className="font-semibold text-neutral-900 mb-4 text-base">
        Bagaha Live
      </h3>
      <p>
        Trusted local news platform delivering real-time updates
        from Bagaha and surrounding regions.
      </p>

      <p className="mt-3">बगहा की हर बड़ी खबर — सबसे पहले और पूरी सच्चाई के साथ।</p>
    </div>

    {/* Platform */}
    <div>
      <h3 className="font-semibold text-neutral-900 mb-4 text-base">
        Platform
      </h3>
      <ul className="space-y-2">
        <li><a href="/news" className="hover:underline">Latest News</a></li>
        <li><a href="/contact" className="hover:underline">Contact</a></li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h3 className="font-semibold text-neutral-900 mb-4 text-base">
        Legal
      </h3>
      <ul className="space-y-2">
        <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
        <li><a href="/delete-account" className="hover:underline">Delete Account</a></li>
        <li><a href="/disclaimer" className="hover:underline">Disclaimer</a></li>
        <li><a href="/community-guidelines" className="hover:underline">Community Guidelines</a></li>
        <li><a href="/copyright-policy" className="hover:underline">Copyright Policy</a></li>
        <li><a href="/grievance" className="hover:underline">Grievance Officer</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
  <h3 className="font-semibold text-neutral-900 mb-4 text-base">
    Contact
  </h3>
  <p>bagahalive@gmail.com</p>
  <p className="mt-2 text-xs text-neutral-400">
    We aim to respond within a reasonable timeframe.
  </p>
</div>


  </div>

  <div className="text-center text-xs mt-14 mb-10 text-neutral-400">
    © {new Date().getFullYear()} Bagaha Live. All rights reserved.
  </div>
</footer>


      </body>
    </html>
  );
}
