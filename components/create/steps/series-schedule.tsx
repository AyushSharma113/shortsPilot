"use client";

import { useState } from "react";
import { StepNavigation } from "@/components/create/step-navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Youtube, Instagram, Mail, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "youtube", name: "YouTube Shorts", icon: Youtube },
  { id: "instagram", name: "Instagram Reels", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: Smartphone },
  { id: "email", name: "Email", icon: Mail },
];

interface SeriesScheduleProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function SeriesSchedule({ onNext, onBack }: SeriesScheduleProps) {
  const [seriesName, setSeriesName] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [publishTime, setPublishTime] = useState("");

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => 
      prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id]
    );
  };

  const isFormValid = 
    seriesName.trim() !== "" && 
    duration !== "" && 
    selectedPlatforms.length > 0 && 
    publishTime !== "";

  const handleNext = () => {
    if (isFormValid) {
      onNext({
        seriesName,
        duration,
        platforms: selectedPlatforms,
        publishTime
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-2xl mx-auto pb-8">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Series Details & Schedule</h2>
        <p className="text-muted-foreground">
          Name your series, choose a duration, and schedule your publishing time.
        </p>
      </div>

      <div className="space-y-8 bg-card border border-border p-6 rounded-xl shadow-sm">
        {/* Series Name */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">Series Name</label>
          <Input 
            placeholder="e.g. Daily Motivation Shorts" 
            value={seriesName}
            onChange={(e) => setSeriesName(e.target.value)}
            className="h-12 text-base"
          />
        </div>

        {/* Video Duration */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">Video Duration</label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select video length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30-50">30-50 seconds (Standard Short)</SelectItem>
              <SelectItem value="60-70">60-70 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Platforms */}
        <div className="space-y-3">
          <label className="text-sm font-semibold">Publish to Platforms</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {platforms.map((platform) => {
              const isSelected = selectedPlatforms.includes(platform.id);
              const Icon = platform.icon;
              return (
                <Card 
                  key={platform.id}
                  className={cn(
                    "p-4 flex items-center gap-3 cursor-pointer transition-colors border",
                    isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/50"
                  )}
                  onClick={() => togglePlatform(platform.id)}
                >
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={() => togglePlatform(platform.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-5 h-5", isSelected ? "text-primary" : "text-muted-foreground")} />
                    <span className="font-medium text-sm">{platform.name}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Schedule Time */}
        <div className="space-y-3">
          <label className="text-sm font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Daily Publish Time
          </label>
          <Input 
            type="time" 
            value={publishTime}
            onChange={(e) => setPublishTime(e.target.value)}
            className="h-12 w-full sm:max-w-[200px] text-base"
          />
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border flex items-start gap-3">
            <span className="text-xl leading-none">💡</span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Video will generate <strong className="text-foreground">3-6 hours</strong> before video publish.
            </p>
          </div>
        </div>
      </div>

      <StepNavigation 
        onBack={onBack}
        onNext={handleNext}
        isNextDisabled={!isFormValid}
        nextLabel="Schedule Series"
        className="pt-2 border-t-0 mt-4"
      />
    </div>
  );
}
