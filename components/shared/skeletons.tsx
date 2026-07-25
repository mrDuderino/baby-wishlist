import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <Skeleton className="rounded-t-card aspect-[4/3] w-full rounded-none" />
      <CardHeader className="space-y-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-6 w-28" />
      </CardContent>
      <CardFooter>
        <Skeleton className="rounded-button h-10 w-full" />
      </CardFooter>
    </Card>
  );
}

export function WishlistGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-2/3 max-w-lg" />
      <Skeleton className="h-4 w-full max-w-xl" />
    </div>
  );
}
