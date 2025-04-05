
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface TaxSummaryCardProps {
  title: string;
  amount: number;
  previousAmount?: number;
  percentChange?: number;
  currency?: string;
  className?: string;
  variant?: "default" | "income" | "saving" | "expense";
}

export function TaxSummaryCard({
  title,
  amount,
  previousAmount,
  percentChange,
  currency = "₹",
  className,
  variant = "default",
}: TaxSummaryCardProps) {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  const isIncrease = percentChange !== undefined ? percentChange > 0 : undefined;
  const variants = {
    default: "border-border bg-card",
    income: "border-green-100 bg-green-50",
    saving: "border-tax-light bg-tax-lightgray",
    expense: "border-red-100 bg-red-50",
  };

  return (
    <Card className={cn("overflow-hidden", variants[variant], className)}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight">
              {currency} {formatAmount(amount)}
            </span>
            {percentChange !== undefined && (
              <div
                className={cn(
                  "flex items-center text-xs",
                  isIncrease ? "text-green-500" : "text-red-500"
                )}
              >
                <span>
                  {isIncrease ? (
                    <ArrowUpIcon className="h-3 w-3" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3" />
                  )}
                </span>
                <span className="ml-1">{Math.abs(percentChange)}%</span>
              </div>
            )}
          </div>
          {previousAmount !== undefined && (
            <p className="text-xs text-muted-foreground">
              Previous: {currency} {formatAmount(previousAmount)}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
