"use client";

import { useState } from "react";
import Image from "next/image";
import { StepNavigation } from "@/components/create/step-navigation";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const videoStyles = [
  {
    id: "3d-render",
    name: "3D Render",
    image: "/video_style/3d-render.png"
  },
  {
    id: "anime",
    name: "Anime",
    image: "/video_style/anime.png"
  },
  {
    id: "cinematic",
    name: "Cinematic",
    image: "/video_style/cinematic.png"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    image: "/video_style/cyberpunk.png"
  },
  {
    id: "gta",
    name: "GTA Style",
    image: "/video_style/gta.png"
  },
  {
    id: "realistic",
    name: "Realistic",
    image: "/video_style/realistic.png"
  }
];

interface VideoStyleSelectionProps {
  onNext: (data: { videoStyleId: string }) => void;
  onBack: () => void;
}

export function VideoStyleSelection({ onNext, onBack }: VideoStyleSelectionProps) {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedStyle) {
      onNext({ videoStyleId: selectedStyle });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Video Style</h2>
        <p className="text-muted-foreground">
          Choose the visual style for your generated video content.
        </p>
      </div>

      {/* Horizontal scrolling container */}
      <div className="w-full overflow-x-auto pb-6 custom-scrollbar">
        <div className="flex gap-4 px-2 w-max mx-auto">
          {videoStyles.map((style) => {
            const isSelected = selectedStyle === style.id;
            
            return (
              <Card 
                key={style.id}
                className={cn(
                  "relative cursor-pointer transition-all overflow-hidden group shrink-0",
                  "w-[200px] sm:w-[240px] md:w-[280px]", // Responsive widths
                  isSelected ? "ring-2 ring-primary ring-offset-2 scale-[1.02]" : "hover:border-primary/50"
                )}
                onClick={() => setSelectedStyle(style.id)}
              >
                {/* 9:16 Aspect Ratio Container */}
                <div className="relative aspect-[9/16] w-full bg-muted">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-500",
                      isSelected ? "scale-105" : "group-hover:scale-105"
                    )}
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 240px, 280px"
                    priority
                  />
                  
                  {/* Overlay gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 animate-in zoom-in duration-200">
                      <CheckCircle2 className="w-6 h-6 text-primary fill-primary-foreground" />
                    </div>
                  )}

                  {/* Style Name */}
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className={cn(
                      "text-xl font-bold text-white transition-colors",
                      isSelected ? "text-primary" : ""
                    )}>
                      {style.name}
                    </h3>
                  </div>
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
