import * as React from "react";
import { cn } from "../../lib/utils";
import { LucideIcon } from "lucide-react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface PageStatProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("container mx-auto px-4 py-8 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function PageContent({ children, className }: PageContainerProps) {
  return <div className={cn("space-y-8", className)}>{children}</div>;
}

export function PageHeader({ children, className }: PageContainerProps) {
  return (
    <div className={cn("flex flex-col gap-1 mb-8", className)}>{children}</div>
  );
}

export function PageSection({ children, className }: PageContainerProps) {
  return (
    <section
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm p-6",
        className
      )}
    >
      {children}
    </section>
  );
}

export function PageGrid({ children, className }: PageContainerProps) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-2", className)}>{children}</div>
  );
}

export function PageStat({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: PageStatProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-xs">
          <span
            className={cn(
              "font-medium",
              trend.value >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="ml-2 text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </div>
  );
}

export default PageContainer;
