"use client";

import { useState } from "react";
import { StepNavigation } from "@/components/create/step-navigation";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCaption, CaptionStyleType } from "@/components/shared/animated-caption";

// We define our 6 caption styles available for selection
const captionStyles: { id: CaptionStyleType; name: string; description: string }[] = [
  {
    id: "hormozi",
    name: "The Hormozi",
    description: "Bold, punchy, yellow and white pop-in"
  },
  {
    id: "ali-abdaal",
    name: "The Scholar",
    description: "Clean white pill background, slide up"
  },
  {
    id: "minimalist",
    name: "Cinematic",
    description: "Elegant, slow fade, tracking text"
  },
  {
    id: "neon",
    name: "Neon Glow",
    description: "Vibrant pulsing cyberpunk glow"
  },
  {
    id: "typewriter",
    name: "Developer",
    description: "Green monospace typing effect"
  },
  {
    id: "karaoke",
    name: "Karaoke",
    description: "Word-by-word cyan highlight sweep"
  }
];

interface CaptionStyleSelectionProps {
  onNext: (data: { captionStyleId: string }) => void;
  onBack: () => void;
  initialData?: { captionStyleId?: string };
}

export function CaptionStyleSelection({ onNext, onBack, initialData }: CaptionStyleSelectionProps) {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(initialData?.captionStyleId || null);

  const handleNext = () => {
    if (selectedStyle) {
      onNext({ captionStyleId: selectedStyle });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Caption Style</h2>
        <p className="text-muted-foreground">
          Choose the animated text style for your generated video. Previews loop automatically.
        </p>
      </div>

      {/* Horizontal scrolling container for 9:16 aspect ratio previews */}
      <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
        <div className="flex gap-4 px-2 w-max mx-auto">
          {captionStyles.map((style) => {
            const isSelected = selectedStyle === style.id;
            
            return (
              <Card 
                key={style.id}
                className={cn(
                  "relative cursor-pointer transition-all overflow-hidden group shrink-0 flex flex-col",
                  "w-[200px] sm:w-[240px]", // Responsive widths
                  isSelected ? "ring-2 ring-primary ring-offset-2 scale-[1.02] border-primary" : "border-border hover:border-primary/50"
                )}
                onClick={() => setSelectedStyle(style.id)}
              >
                {/* 9:16 Aspect Ratio Container */}
                <div className="relative aspect-[9/16] w-full bg-zinc-900 overflow-hidden flex flex-col items-center justify-center">
                  
                  {/* Subtle noise/gradient background so captions pop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-80" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
                  
                  {/* Display the animated caption component! */}
                  <div className="z-10 w-full px-4 text-center mt-10">
                    <AnimatedCaption text="Create Viral Shorts" styleName={style.id} />
                  </div>

                  {/* Selection Indicator Overlay */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-20 animate-in zoom-in duration-200">
                      <CheckCircle2 className="w-6 h-6 text-primary fill-primary-foreground drop-shadow-lg" />
                    </div>
                  )}
                  
                  {/* Subtle bottom gradient to make text readable */}
                  <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>

                {/* Card Footer with detail */}
                <div className="p-4 bg-card border-t border-border mt-auto z-10 relative">
                  <h3 className={cn(
                      "font-bold text-[15px] transition-colors",
                      isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}>
                      {style.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {style.description}
                    </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-4 border-t border-border">
          <StepNavigation 
            onBack={onBack}
            onNext={handleNext}
            isNextDisabled={!selectedStyle}
          />
      </div>
    </div>
  );
}
