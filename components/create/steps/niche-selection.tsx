"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Ghost, Lightbulb, BookOpen, Search, Trophy, Hourglass, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface NicheOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const NICHE_OPTIONS: NicheOption[] = [
  {
    id: "scary_stories",
    title: "Scary Stories",
    description: "Spooky tales and urban legends to keep viewers on the edge of their seats.",
    icon: <Ghost className="h-6 w-6 text-purple-500" />,
  },
  {
    id: "motivational",
    title: "Motivational",
    description: "Inspiring quotes and life advice to boost productivity and mindset.",
    icon: <Trophy className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: "bedtime_stories",
    title: "Bedtime Stories",
    description: "Calm and soothing narratives perfect for relaxation and sleep.",
    icon: <BookOpen className="h-6 w-6 text-blue-500" />,
  },
  {
    id: "interesting_facts",
    title: "Interesting Facts",
    description: "Mind-blowing trivia and 'did you know' facts about the world.",
    icon: <Lightbulb className="h-6 w-6 text-orange-500" />,
  },
  {
    id: "history",
    title: "History",
    description: "Fascinating historical events and biographies of famous figures.",
    icon: <Hourglass className="h-6 w-6 text-stone-500" />,
  },
  {
    id: "philosophy",
    title: "Philosophy",
    description: "Deep thoughts and stoic wisdom for modern life.",
    icon: <BookOpen className="h-6 w-6 text-emerald-500" />, // Reusing icon for now
  },
   {
    id: "jokes",
    title: "Jokes & Humor",
    description: "Original jokes, puns, and funny scenarios to make people laugh.",
    icon: <Smile className="h-6 w-6 text-pink-500" />, 
  },
];

interface NicheSelectionProps {
  onNext: (data: { niche: string; customNiche?: string }) => void;
  initialData?: { niche?: string; customNiche?: string };
}

import { StepNavigation } from "@/components/create/step-navigation";

// ... (existing constants)

export function NicheSelection({ onNext, initialData }: NicheSelectionProps) {
  const isCustomNiche = initialData?.niche === "custom" || (initialData?.niche && !NICHE_OPTIONS.find(n => n.id === initialData.niche));
  
  const [selectedTab, setSelectedTab] = useState(isCustomNiche ? "custom" : "available");
  const [selectedNiche, setSelectedNiche] = useState<string | null>(!isCustomNiche ? (initialData?.niche || null) : null);
  const [customNiche, setCustomNiche] = useState(initialData?.customNiche || (isCustomNiche ? initialData?.niche || "" : ""));

  const handleContinue = () => {
    if (selectedTab === "available" && selectedNiche) {
      onNext({ niche: selectedNiche });
    } else if (selectedTab === "custom" && customNiche) {
      onNext({ niche: "custom", customNiche });
    }
  };

  const isContinueDisabled =
    (selectedTab === "available" && !selectedNiche) ||
    (selectedTab === "custom" && !customNiche.trim());

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Choose Your Niche</h2>
        <p className="text-muted-foreground">
          Select a popular category or define your own unique topic.
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="available">Available Niches</TabsTrigger>
            <TabsTrigger value="custom">Custom Niche</TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {NICHE_OPTIONS.map((niche) => (
              <Card
                key={niche.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary hover:shadow-md h-full flex flex-col",
                  selectedNiche === niche.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""
                )}
                onClick={() => setSelectedNiche(niche.id)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3">
                  <CardTitle className="text-sm font-semibold truncate pr-2">
                    {niche.title}
                  </CardTitle>
                  <div className="text-primary shrink-0 scale-75 origin-right">{niche.icon}</div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <CardDescription className="line-clamp-3 text-xs">
                    {niche.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card className="h-[300px] flex flex-col justify-center border-dashed">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                 <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Define Your Own Niche</CardTitle>
              <CardDescription>
                Describe exactly what kind of content you want to generate. Be specific!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg mx-auto w-full">
              <div className="grid gap-2">
                <Input
                  placeholder="E.g., Crypto News, Vegan Recipes, 90s Nostalgia..."
                  value={customNiche}
                  onChange={(e) => setCustomNiche(e.target.value)}
                  className="h-12 text-lg"
                />
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <Search className="h-3 w-3" /> 
                    Tip: Provide a clear topic for better AI generation results.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <StepNavigation 
        onNext={handleContinue} 
        isNextDisabled={isContinueDisabled}
        showBack={false}
      />
    </div>
  );
}
