import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

/* ---------------------------------------
   FETCH LATEST NEWS
----------------------------------------*/

async function getLatestNews() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return [];
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data } = await supabase
    .from("news")
    .select("id, title, location, created_at, is_breaking")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(3);

  return data || [];
}

/* ---------------------------------------
   PAGE
----------------------------------------*/

export default async function Home() {
  const latestNews = await getLatestNews();

  return (
    <div className="relative bg-neutral-50 overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-60 -left-60 w-[800px] h-[800px] bg-red-500/10 blur-[180px] rounded-full"></div>
        <div className="absolute top-40 -right-60 w-[800px] h-[800px] bg-orange-400/10 blur-[180px] rounded-full"></div>
      </div>

      {/* ================= HERO ================= */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">

        <p className="uppercase tracking-widest text-sm text-gray-500 mb-6">
          Real-Time • Verified • Hyperlocal
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-neutral-900">
          Breaking News from Bagaha.
          <br />
          Faster Than Anywhere Else.
        </h1>

        <p className="mt-8 text-xl text-neutral-600 max-w-3xl mx-auto">
          Verified reporting. Instant alerts. Complete local coverage —
          delivered directly to your phone.
        </p>

        <p className="mt-4 text-lg text-neutral-500">
          बगहा की हर बड़ी खबर — सबसे पहले और पूरी सच्चाई के साथ।
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">

          <a
            href="YOUR_PLAYSTORE_LINK"
            target="_blank"
            className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition"
          >
            <img src="/logo.png" className="h-6 w-auto" />
            Download App
          </a>

          <Link
            href="/news"
            className="border border-neutral-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-neutral-100 transition"
          >
            Browse Web Version
          </Link>

        </div>

        <p className="mt-6 text-sm text-neutral-500">
          Growing community of readers • Daily verified updates • Instant alerts
        </p>

      </section>

      {/* ================= LIVE NEWS PREVIEW ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-28">

        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900">
              Latest from Bagaha
            </h2>
            <p className="text-neutral-500 mt-2">
              Updated in real-time
            </p>
          </div>

          <Link
            href="/news"
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestNews.map((item: any) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <article className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-lg transition">

                {item.is_breaking && (
                  <span className="inline-block mb-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                    BREAKING
                  </span>
                )}

                <h3 className="font-bold text-lg leading-snug mb-3 hover:text-red-600 transition">
                  {item.title}
                </h3>

                <p className="text-sm text-neutral-500">
                  {item.location || "Bagaha"}
                </p>

                <p className="text-xs text-neutral-400 mt-2">
                  {new Date(item.created_at).toLocaleDateString("en-IN")}
                </p>

              </article>
            </Link>
          ))}
        </div>

        {/* App Conversion Block */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-3xl p-10 text-center shadow-xl">
          <h3 className="text-2xl font-bold">
            Get Full Coverage & Instant Alerts
          </h3>
          <p className="mt-4 opacity-90">
            The website shows limited news. For complete coverage,
            breaking notifications, and video stories — download the app.
          </p>
          <a
            href="YOUR_PLAYSTORE_LINK"
            className="inline-block mt-6 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Download Now
          </a>
        </div>

      </section>

      {/* ================= PRODUCT SECTION ================= */}
      <section className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20 items-center">

        {/* Phone Mockup */}
        <div className="flex justify-center relative">

          <div className="absolute w-96 h-96 bg-red-500/10 blur-[120px] rounded-full"></div>

          <div className="relative w-80 h-[640px] rotate-3 hover:rotate-0 transition duration-500 rounded-[52px] bg-neutral-900 shadow-[0_80px_160px_rgba(0,0,0,0.35)] p-3">

            <div className="w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">

              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Bagaha Live" className="h-6 w-auto" />
                  <span className="font-bold text-sm text-neutral-900">
                    Bagaha Live
                  </span>
                </div>
                <div className="w-6 h-6 bg-neutral-200 rounded-full"></div>
              </div>

              <div className="p-4 space-y-4">
                <div className="relative rounded-xl overflow-hidden shadow-sm">
                  <div className="aspect-video bg-neutral-300"></div>
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                    BREAKING
                  </span>
                </div>

                <div className="bg-neutral-100 rounded-lg p-3 space-y-2">
                  <div className="h-3 w-full bg-neutral-200 rounded"></div>
                  <div className="h-3 w-3/4 bg-neutral-200 rounded"></div>
                </div>

                <div className="bg-neutral-100 rounded-lg p-3 space-y-2">
                  <div className="h-3 w-full bg-neutral-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-neutral-200 rounded"></div>
                </div>

                <div className="bg-neutral-100 rounded-lg p-3 space-y-2">
                  <div className="h-3 w-full bg-neutral-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-neutral-200 rounded"></div>
                </div>

                <div className="bg-neutral-100 rounded-lg p-3 space-y-2">
                  <div className="h-3 w-full bg-neutral-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-neutral-200 rounded"></div>
                </div>

                <div className="bg-neutral-100 rounded-lg p-3 space-y-2">
                  <div className="h-3 w-full bg-neutral-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-neutral-200 rounded"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-4xl font-bold mb-8 text-neutral-900">
            Designed for Speed.
            <br />
            Built for Credibility.
          </h2>

          <div className="space-y-8 text-neutral-600 text-lg">
            <Feature
              title="Instant Breaking Alerts"
              desc="Be the first to know when something important happens."
            />
            <Feature
              title="Verified Reporting"
              desc="All articles reviewed before publication."
            />
            <Feature
              title="Clean Experience"
              desc="No clutter. Just focused local journalism."
            />
          </div>

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 text-center bg-neutral-900 text-white">

        <h2 className="text-5xl font-bold mb-6">
          Never Miss a Story in Bagaha.
        </h2>

        <p className="text-neutral-400 mb-10 text-lg">
          Join the fastest-growing local news platform.
        </p>

        <a
          href="YOUR_PLAYSTORE_LINK"
          className="bg-white text-neutral-900 px-12 py-5 rounded-xl text-lg font-semibold hover:opacity-90 transition"
        >
          Get the App
        </a>

      </section>

      {/* Sticky Install Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black text-white flex items-center justify-between px-6 py-4 sm:hidden z-50">
        <span className="text-sm font-medium">
          Get real-time breaking alerts
        </span>
        <a
          href="YOUR_PLAYSTORE_LINK"
          className="bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Install
        </a>
      </div>

    </div>
  );
}

/* ---------------------------------------
   COMPONENTS
----------------------------------------*/

function Feature({ title, desc }: any) {
  return (
    <div>
      <h3 className="font-semibold text-xl text-neutral-900 mb-3">
        {title}
      </h3>
      <p>{desc}</p>
    </div>
  );
}
