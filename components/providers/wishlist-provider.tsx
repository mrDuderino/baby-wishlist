"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { hasSupabaseEnv } from "@/lib/env";
import {
  computeWishlistStats,
  groupProductsByCategory,
  type CategoryWithProducts,
} from "@/lib/data/wishlist-types";
import { createClient } from "@/lib/supabase/client";
import type { Category, Product } from "@/types/database";

import { useRealtimeSubscription } from "@/hooks/use-realtime-subscription";

type WishlistStats = ReturnType<typeof computeWishlistStats>;

type WishlistContextValue = {
  products: Product[];
  categories: CategoryWithProducts[];
  stats: WishlistStats;
  isRefreshing: boolean;
  refresh: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

type WishlistProviderProps = {
  initialCategories: Category[];
  initialProducts: Product[];
  children: ReactNode;
};

export function WishlistProvider({
  initialCategories,
  initialProducts,
  children,
}: WishlistProviderProps) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (!hasSupabaseEnv()) {
      return;
    }

    setIsRefreshing(true);

    try {
      const supabase = createClient();
      const [categoriesResult, productsResult] = await Promise.all([
        supabase
          .from("categories")
          .select("*")
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
        supabase
          .from("products")
          .select("*")
          .eq("visible", true)
          .neq("status", "hidden")
          .order("sort_order", { ascending: true }),
      ]);

      if (categoriesResult.error || productsResult.error) {
        return;
      }

      setCategories(categoriesResult.data ?? []);
      setProducts(productsResult.data ?? []);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useRealtimeSubscription({
    enabled: hasSupabaseEnv(),
    table: "products",
    onChange: refresh,
  });

  useRealtimeSubscription({
    enabled: hasSupabaseEnv(),
    table: "reservations",
    onChange: refresh,
  });

  const value = useMemo<WishlistContextValue>(() => {
    const groupedCategories = groupProductsByCategory(categories, products);

    return {
      products,
      categories: groupedCategories,
      stats: computeWishlistStats(products),
      isRefreshing,
      refresh,
    };
  }, [categories, isRefreshing, products, refresh]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
}
