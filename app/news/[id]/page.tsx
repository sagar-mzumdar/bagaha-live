import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";

/* ---------------------------------------
   TYPES
----------------------------------------*/

type NewsBlock =
  | { type: "text"; text: string }
  | { type: "image"; uri: string; caption?: string }
  | { type: "video"; uri: string; caption?: string; thumbnail?: string };

interface ReporterProfile {
  id: string;
  name: string;
  avatar_url?: string;
  role?: string;
}

interface NewsItem {
  id: string;
  title: string;
  location?: string;
  blocks?: NewsBlock[];
  created_at: string;
  is_breaking?: boolean;
  views_count?: number;
  reporter_id?: string;
  profiles?: ReporterProfile | null;
}

/* ---------------------------------------
   RENDER BLOCKS
----------------------------------------*/

function renderBlocks(blocks: NewsBlock[]) {
  return blocks.map((block, index) => {
    if (block.type === "text") {
      return (
        <p
          key={index}
          className="mb-6 text-neutral-800 leading-8 text-base sm:text-lg"
        >
          {block.text}
        </p>
      );
    }

    if (block.type === "image") {
      return (
        <figure key={index} className="my-10">
          <img
            src={block.uri}
            alt={block.caption || "News image"}
            className="w-full rounded-3xl shadow-sm"
          />
          {block.caption && (
            <figcaption className="text-sm text-neutral-500 mt-3 text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    if (block.type === "video") {
      return (
        <div key={index} className="my-10">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-md">
            <video
              controls
              className="w-full h-full object-cover"
              poster={block.thumbnail || undefined}
            >
              <source src={block.uri} />
            </video>
          </div>

          {block.caption && (
            <p className="text-sm text-neutral-500 mt-3 text-center">
              {block.caption}
            </p>
          )}
        </div>
      );
    }

    return null;
  });
}

/* ---------------------------------------
   PAGE
----------------------------------------*/

export default async function NewsDetailPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await props.params;


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

  /* ---------------------------------------
     FETCH NEWS
  ----------------------------------------*/

  const { data, error } = await supabase
    .from("news")
    .select(`
      id,
      title,
      location,
      blocks,
      created_at,
      is_breaking,
      views_count,
      reporter_id
    `)
    .eq("id", id)
    .eq("status", "approved")
    .not("approved_at", "is", null)
    .single();

  if (error || !data) {
    notFound();
  }

  let news: NewsItem = data;

  /* ---------------------------------------
     ATTACH REPORTER PROFILE (RPC)
  ----------------------------------------*/

  if (news.reporter_id) {
    const { data: profileData } = await supabase.rpc(
      "get_public_reporter_profile",
      { pid: news.reporter_id }
    );

    news = {
      ...news,
      profiles: profileData?.[0] ?? null,
    };
  }

  /* ---------------------------------------
     SAFE BLOCK HANDLING
  ----------------------------------------*/

  const blocks: NewsBlock[] = Array.isArray(news.blocks)
    ? news.blocks
    : [];

  const firstBlock = blocks[0];

  let heroImage: string | null = null;
  let heroVideo: string | null = null;
  let contentBlocks: NewsBlock[] = blocks;

  if (firstBlock?.type === "image") {
    heroImage = firstBlock.uri;
    contentBlocks = blocks.slice(1);
  }

  if (firstBlock?.type === "video") {
    heroVideo = firstBlock.uri;
    contentBlocks = blocks.slice(1);
  }

  const reporterName = news.profiles?.name || "Reporter";

  const reporterAvatar =
    news.profiles?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      reporterName
    )}&background=random&color=fff`;

  /* ---------------------------------------
     RENDER
  ----------------------------------------*/

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

      {/* Back */}
      <Link
        href="/news"
        className="text-sm text-neutral-500 hover:text-red-600 transition"
      >
        ← Back to News
      </Link>

      {/* Breaking */}
      {news.is_breaking && (
        <div className="mt-6 inline-block bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold tracking-wide">
          BREAKING
        </div>
      )}

      {/* Title */}
      <h1 className="mt-6 text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-neutral-600">
        {news.title}
      </h1>

      {/* Meta */}
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-500 border-b border-neutral-200 pb-6">
        {news.location && <span>{news.location}</span>}
        <span>•</span>
        <span>
          {new Date(news.created_at).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Reporter Section */}
      <div className="mt-8 flex items-center gap-4 border-b border-neutral-200 pb-8">

        <img
          src={reporterAvatar}
          alt="Reporter avatar"
          className="w-12 h-12 rounded-full object-cover border"
        />

        <div className="flex-1">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">
            Reported by
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="font-semibold text-neutral-900">
              {reporterName}
            </span>

            {news.profiles?.role && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-red-50 text-red-600 tracking-wide">
                {news.profiles.role.toUpperCase()}
              </span>
            )}
          </div>

          <div className="mt-1 text-sm text-neutral-500">
            {(news.views_count ?? 0).toLocaleString("en-IN")} reads
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {heroImage && (
        <div className="mt-10">
          <img
            src={heroImage}
            alt={news.title}
            className="w-full rounded-3xl shadow-md"
          />
        </div>
      )}

      {/* Hero Video */}
      {heroVideo && (
        <div className="mt-10">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-md">
            <video controls className="w-full h-full object-cover">
              <source src={heroVideo} />
            </video>
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="mt-10">
        {renderBlocks(contentBlocks)}
      </article>

      {/* App CTA */}
      <div className="mt-16 bg-neutral-100 rounded-3xl p-8 text-center">
        <h3 className="text-xl font-bold">
          Get Real-Time Alerts on the App
        </h3>

        <p className="mt-3 text-neutral-600 text-sm sm:text-base">
          Stay ahead with instant breaking news notifications.
        </p>

        <a
          href="/download"
          className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Download the App
        </a>
      </div>

      {/* End */}
      <div className="mt-16 border-t pt-6 text-center text-sm text-neutral-400">
        End of article
      </div>
    </div>
  );
}
