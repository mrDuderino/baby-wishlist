import { WishlistGridSkeleton } from "@/components/shared/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted relative min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8DDD1] via-[#D4C4B5] to-[#B79E8B]" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center">
          <Skeleton className="mb-6 h-4 w-32 bg-white/30" />
          <Skeleton className="mb-4 h-12 w-full max-w-2xl bg-white/40" />
          <Skeleton className="mb-8 h-6 w-full max-w-xl bg-white/30" />
          <div className="flex gap-3">
            <Skeleton className="rounded-button h-12 w-48 bg-white/40" />
            <Skeleton className="rounded-button h-12 w-48 bg-white/30" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] space-y-8 px-6 py-16 lg:px-8">
        <Skeleton className="h-10 w-64" />
        <WishlistGridSkeleton count={3} />
      </div>
    </div>
  );
}
