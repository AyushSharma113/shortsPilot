import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
  className?: string;
  showBack?: boolean;
}

export function StepNavigation({
  onBack,
  onNext,
  isNextDisabled = false,
  nextLabel = "Continue",
  backLabel = "Back",
  className,
  showBack = true,
}: StepNavigationProps) {
  return (
    <div className={cn("flex justify-between items-center pt-8 border-t mt-8", className)}>
      {showBack && onBack ? (
        <Button variant="outline" size="lg" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Button>
      ) : (
        <div /> /* Spacer */
      )}

      <Button 
        size="lg" 
        onClick={onNext} 
        disabled={isNextDisabled}
        className="gap-2 w-full sm:w-auto min-w-[150px]"
      >
        {nextLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
