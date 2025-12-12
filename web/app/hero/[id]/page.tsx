"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { heroes, getHeroWikiUrl } from "@/data/heroes";

export default function HeroDetailPage() {
  const params = useParams();
  const router = useRouter();
  const heroId = params.id as string;

  useEffect(() => {
    const hero = heroes.find((h) => h.id === heroId);
    if (hero) {
      window.location.href = getHeroWikiUrl(hero);
    } else {
      router.push("/");
    }
  }, [heroId, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-400">正在跳转到Wiki...</p>
      </div>
    </div>
  );
}
