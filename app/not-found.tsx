import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">

      <div className="text-center max-w-xl">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png"
            alt="Bagaha Live"
            className="h-16 w-auto"
          />
        </div>

        {/* 404 Heading */}
        <h1 className="text-6xl font-extrabold text-neutral-900 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
          Page Not Found
        </h2>

        <p className="text-neutral-600 mb-10">
          The page you are looking for doesn’t exist or may have been removed.
          Stay updated with the latest news from Bagaha.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Go Home
          </Link>

          <Link
            href="/news"
            className="border border-neutral-300 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition"
          >
            Browse News
          </Link>

        </div>

        {/* App CTA */}
        <div className="mt-12 text-sm text-neutral-500">
          For complete coverage and breaking alerts, download the Bagaha Live app.
        </div>

      </div>

    </div>
  );
}
