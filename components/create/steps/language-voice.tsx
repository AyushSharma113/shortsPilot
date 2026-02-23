"use client";

import { useState, useRef, useEffect } from "react";
import { StepNavigation } from "@/components/create/step-navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, User, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Languages, DeepgramVoices, FonadalabVoices } from "@/components/create/constants/voices";

interface LanguageVoiceSelectionProps {
  onNext: (data: { language: string; voice: string; isCloned?: boolean }) => void;
  onBack: () => void;
}

export function LanguageVoiceSelection({ onNext, onBack }: LanguageVoiceSelectionProps) {
  const [selectedLangCode, setSelectedLangCode] = useState("en-US");
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedLanguage = Languages.find(l => l.modelLangCode === selectedLangCode);

  // Filter voices based on language model name
  // Deepgram supports multiple languages, but Aura voices are model specific.
  // For simplicity based on provided data:
  // If modelName is 'deepgram', show DeepgramVoices.
  // If modelName is 'fonadalab', show FonadalabVoices.
  // In a real app, you'd filter by specific language support per voice.
  // Here we assume the provided lists match the provider capabilities for the selected language.
  
  const voices = selectedLanguage?.modelName === "deepgram" ? DeepgramVoices : FonadalabVoices;

  const togglePreview = (previewUrl: string, voiceId: string) => {
    // If clicking same voice that is playing, pause it.
    if (isPlaying === voiceId) {
      audioRef.current?.pause();
      setIsPlaying(null);
      return;
    }

    // Stop current audio if any
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Play new audio
    audioRef.current = new Audio(`/voices/${previewUrl}`);
    audioRef.current.play().catch(e => console.error("Audio playback error:", e));
    setIsPlaying(voiceId);

    audioRef.current.onended = () => {
        setIsPlaying((current) => current === voiceId ? null : current);
    };
  };

  const handleNext = () => {
    if (selectedVoice && selectedLangCode) {
      onNext({ language: selectedLangCode, voice: selectedVoice });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Language & Voice</h2>
        <p className="text-muted-foreground">
          Select the language for your video and choose a perfect AI voice narrator.
        </p>
      </div>

      {/* Language Selector */}
      <div className="max-w-md mx-auto">
        <label className="text-sm font-medium mb-2 block">Content Language</label>
        <Select value={selectedLangCode} onValueChange={(val) => {
            setSelectedLangCode(val);
            setSelectedVoice(null); // Reset voice on language change
        }}>
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {Languages.map((lang) => (
              <SelectItem key={lang.modelLangCode} value={lang.modelLangCode}>
                <span className="flex items-center gap-2">
                  <span className="text-lg">{lang.countryFlag}</span>
                  {lang.language}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Voices Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                Available Voices
            </h3>
            <Badge variant="outline" className="px-3 py-1">
                {voices.length} {selectedLanguage?.modelName === 'deepgram' ? 'Deepgram' : 'Fonadalab'} Voices
            </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {voices.map((voice) => (
                <div 
                    key={voice.modelName}
                    className={cn(
                        "relative cursor-pointer transition-all border rounded-lg overflow-hidden group hover:border-primary/50 flex flex-col items-center p-3 text-center h-full",
                        selectedVoice === voice.modelName ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary" : "border-border bg-card"
                    )}
                    onClick={() => setSelectedVoice(voice.modelName)}
                >
                    <div className="absolute top-2 right-2 z-10">
                        <Button
                            size="icon"
                            variant="ghost"
                            className={cn(
                                "h-6 w-6 rounded-full hover:bg-primary/20 hover:text-primary transition-all p-0",
                                isPlaying === voice.modelName ? "text-primary bg-primary/10" : "text-muted-foreground opacity-50 group-hover:opacity-100"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePreview(voice.preview, voice.modelName);
                            }}
                        >   
                            {isPlaying === voice.modelName ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current ml-0.5" />}
                        </Button>
                    </div>

                    <div className={cn(
                        "h-12 w-12 rounded-full flex items-center justify-center shrink-0 mb-2 transition-colors",
                         selectedVoice === voice.modelName ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                        <User className="h-6 w-6" />
                    </div>
                    
                    <div className="w-full">
                        <h4 className="text-sm font-bold truncate capitalize">
                            {voice.modelName.replace('aura-2-', '').replace('-en', '').replace(/-/g, ' ')}
                        </h4>
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{voice.gender}</span>
                            <span className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded opacity-70">{voice.model}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <StepNavigation 
        onBack={onBack}
        onNext={handleNext}
        isNextDisabled={!selectedVoice}
      />
    </div>
  );
}
