import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: number | string;
  hint?: string;
};

export function StatCard({ title, value, hint }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-heading text-3xl font-medium">{value}</p>
        {hint ? (
          <p className="text-muted-foreground mt-2 text-xs">{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
