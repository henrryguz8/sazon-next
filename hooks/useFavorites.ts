"use client";

import { useCallback, useEffect, useState } from "react";
import type { RecipeSummary } from "@/lib/types";

const STORAGE_KEY = "sazon:favoritos";
const SYNC_EVENT = "sazon:favoritos-change";

function readFavorites(): RecipeSummary[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as RecipeSummary[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<RecipeSummary[]>([]);
  // "ready" evita desajustes de hidratación: en el servidor no existe localStorage.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setFavorites(readFavorites());
    sync();
    setReady(true);

    window.addEventListener("storage", sync);
    window.addEventListener(SYNC_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(SYNC_EVENT, sync);
    };
  }, []);

  const toggle = useCallback((recipe: RecipeSummary) => {
    const current = readFavorites();
    const exists = current.some((r) => r.id === recipe.id);
    const next = exists ? current.filter((r) => r.id !== recipe.id) : [...current, recipe];
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Si el almacenamiento está lleno o bloqueado, simplemente no se guarda.
    }
    window.dispatchEvent(new Event(SYNC_EVENT));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((r) => r.id === id),
    [favorites],
  );

  return { favorites, ready, isFavorite, toggle };
}
