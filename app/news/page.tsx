import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

function getExcerpt(blocks: any[], max = 140) {
  if (!Array.isArray(blocks)) return "";

  const textBlock = blocks.find(
    (b) => b?.type === "text" && typeof b.text === "string"
  );

  if (!textBlock) return "";

  const clean = textBlock.text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  return clean.length > max ? clean.slice(0, max) + "…" : clean;
}

export default async function NewsPage() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <div className="p-20 text-center text-red-600">
        Supabase environment variables are not configured.
      </div>
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("news")
    .select(
      "id, title, location, blocks, created_at, is_breaking"
    )
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(10);


    console.log('error', error)

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 sm:py-20">
    
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-red-600 font-semibold">
            News
          </span>
    
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-3">
            Latest Updates
          </h1>
    
          <p className="text-neutral-500 mt-3 sm:mt-4 text-base sm:text-lg max-w-2xl">
            Verified reporting from Bagaha and nearby regions.
          </p>
        </div>
    
    {/* App Download Promo */}
<div className="mb-10 sm:mb-16 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-3xl p-6 sm:p-10 shadow-lg">

<h2 className="text-xl sm:text-2xl font-bold">
  Get Faster Updates on the App
</h2>

<p className="mt-3 text-sm sm:text-base opacity-90 max-w-2xl">
  Instant breaking alerts, smoother experience, and exclusive video news.
</p>

<div className="mt-5">
  <a
    href="/download"
    className="inline-block bg-white text-red-600 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
  >
    Download Bagaha Live App
  </a>
</div>
</div>


        {error && (
          <div className="p-4 sm:p-6 rounded-2xl bg-red-50 text-red-600 mb-8">
            Unable to load news at the moment.
          </div>
        )}
    
        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
          {data?.map((item) => {
            const firstImage =
              item.blocks?.find((b: any) => b?.type === "image")?.uri;
    
              const hasVideo = item.blocks?.some(
                (b: any) => b?.type === "video" && b?.uri
              );

              
            return (
              <Link key={item.id} href={`/news/${item.id}`} className="group">
                <article className="overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition duration-300">
    
                  {/* IMAGE */}
                  {/* IMAGE */}
<div className="relative aspect-video bg-neutral-200 overflow-hidden">

{firstImage ? (
  <>
    <img
      src={firstImage}
      alt={item.title}
      className={`w-full h-full object-cover transition duration-500 ${
        hasVideo ? "brightness-75 group-hover:brightness-90" : "group-hover:scale-105"
      }`}
    />

    {/* Gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
  </>
) : (
  <div className="flex items-center justify-center h-full bg-neutral-900 text-white text-base sm:text-lg font-bold px-4 text-center">
    {!hasVideo && item.location }
  </div>
)}

{/* VIDEO PLAY UI */}
{hasVideo && (
  <>
    {/* Play Button */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="w-6 h-6 ml-1"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>

    {/* VIDEO Badge */}
    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-semibold tracking-wide">
      VIDEO
    </span>
  </>
)}

{/* Breaking */}
{item.is_breaking && (
  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full font-bold">
    BREAKING
  </span>
)}

{/* Location */}
{item.location && (
  <span className="absolute bottom-3 left-3 text-white text-[10px] sm:text-xs bg-black/60 px-2 sm:px-3 py-1 rounded-full">
    {item.location}
  </span>
)}
</div>

    
                  {/* CONTENT */}
                  <div className="p-5 sm:p-8">
    
                    <h2 className="text-lg sm:text-2xl font-bold leading-snug group-hover:text-red-600 transition">
                      {item.title}
                    </h2>
    
                    <p className="text-neutral-600 mt-3 sm:mt-4 text-sm leading-relaxed">
                      {getExcerpt(item.blocks)}
                    </p>
    
                    <div className="mt-4 sm:mt-6 flex items-center justify-between text-xs sm:text-sm text-neutral-500">
                      <span>
                        {new Date(item.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
    
                      <span className="font-semibold group-hover:text-red-600 transition">
                        Read →
                      </span>
                    </div>
    
                  </div>
    
                </article>
              </Link>
            );
          })}
          {/* Sticky Download Bar (Mobile Only) */}
<div className="fixed bottom-0 left-0 w-full sm:hidden bg-black text-white flex items-center justify-between px-4 py-3 z-50 shadow-lg">
  <span className="text-sm font-medium">
    Get faster news on the app
  </span>
  <a
    href="/download"
    className="bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold"
  >
    Install
  </a>
</div>

        </div>
        {/* End Of List CTA */}
<div className="mt-16 sm:mt-24 text-center border-t pt-12">

<p className="text-neutral-500 text-sm sm:text-base">
  You’re viewing the latest 10 stories from Bagaha Live.
</p>

<h3 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-900">
  For real-time updates & full coverage,
  <br className="hidden sm:block" />
  download the Bagaha Live App.
</h3>

<p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm sm:text-base">
  Get instant breaking alerts, video-first coverage, and complete
  access to all local news from Bagaha and surrounding regions.
</p>

<div className="mt-8">
  <a
    href="/download"
    className="inline-block bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition"
  >
    Download the App
  </a>
</div>

</div>

      </div>
    );
    
}
