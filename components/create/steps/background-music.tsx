"use client";

import { useState, useRef } from "react";
import { StepNavigation } from "@/components/create/step-navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Pause, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const backgroundMusicOptions = [
  {
    id: "marketing-1",
    name: "Marketing Music 1",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-384448.mp3"
  },
  {
    id: "basketball-1",
    name: "Basketball Vibes",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/basketball-instagram-reels-music-461852.mp3"
  },
  {
    id: "trending-1",
    name: "Trending Reels 1",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/trending-instagram-reels-music-447249.mp3"
  },
  {
    id: "marketing-2",
    name: "Marketing Music 2",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-469052.mp3"
  },
  {
    id: "dramatic-hiphop",
    name: "Dramatic Hip-Hop Jazz",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/dramatic-hip-hop-music-background-jazz-music-for-short-video-148505.mp3"
  }
];

interface BackgroundMusicSelectionProps {
  onNext: (data: { backgroundMusicIds: string[] }) => void;
  onBack: () => void;
}

export function BackgroundMusicSelection({ onNext, onBack }: BackgroundMusicSelectionProps) {
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSelection = (id: string) => {
    setSelectedMusic((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const togglePlay = (url: string, id: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(url);
    audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    setPlayingId(id);

    audioRef.current.onended = () => {
      setPlayingId((current) => current === id ? null : current);
    };
  };

  const handleNext = () => {
    if (selectedMusic.length > 0) {
      // Clean up audio playback when navigating away
      if (audioRef.current) {
         audioRef.current.pause();
         setPlayingId(null);
      }
      onNext({ backgroundMusicIds: selectedMusic });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Background Music</h2>
        <p className="text-muted-foreground">
          Select one or more background music tracks for your video. You can preview them by clicking play.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {backgroundMusicOptions.map((music) => {
          const isSelected = selectedMusic.includes(music.id);
          const isPlaying = playingId === music.id;
          
          return (
            <Card 
              key={music.id}
              className={cn(
                "p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-primary/50",
                isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border"
              )}
              onClick={() => toggleSelection(music.id)}
            >
              <div 
                className="flex items-center justify-center shrink-0"
                onClick={(e) => e.stopPropagation()} // Prevent toggling selection when checking box directly
              >
                <Checkbox 
                  checked={isSelected}
                  onCheckedChange={() => toggleSelection(music.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </div>

              <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                  <Music className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate">{music.name}</h4>
                <p className="text-xs text-muted-foreground truncate opacity-70">
                   MP3 audio track
                </p>
              </div>

              <div className="shrink-0 flex items-center">
                <Button
                  size="icon"
                  variant={isPlaying ? "default" : "secondary"}
                  className="rounded-full h-10 w-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay(music.url, music.id);
                  }}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 fill-current" />
                  ) : (
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            {selectedMusic.length} {selectedMusic.length === 1 ? 'track' : 'tracks'} selected
          </p>
          <StepNavigation 
            onBack={() => {
              if (audioRef.current) audioRef.current.pause();
              onBack();
            }}
            onNext={handleNext}
            isNextDisabled={selectedMusic.length === 0}
          />
      </div>
    </div>
  );
}
