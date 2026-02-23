"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SeriesSchedule } from "@/components/create/steps/series-schedule";
import { CaptionStyleSelection } from "@/components/create/steps/caption-style";
import { VideoStyleSelection } from "@/components/create/steps/video-style";
import { NicheSelection } from "@/components/create/steps/niche-selection";
import { LanguageVoiceSelection } from "@/components/create/steps/language-voice";
import { BackgroundMusicSelection } from "@/components/create/steps/background-music";
import { Check } from "lucide-react";

const steps = [
  "Niche",
  "Language & Voice",
  "Background Music", 
  "Video Style", 
  "Caption Style",
  "Schedule"
];

export function CreateSeriesWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;
  // This state would ideally be managed by a form library or context for complex forms
  const [formData, setFormData] = useState({});

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepComplete = (data: any) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Stepper Progress */}
      <div className="w-full space-y-4">
        <div className="flex justify-between text-sm font-medium text-muted-foreground px-2">
            {steps.map((label, index) => {
                const stepNum = index + 1;
                const isCompleted = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;
                
                return (
                    <div key={label} className={`flex flex-col items-center gap-2 ${isCurrent ? 'text-primary' : ''} ${isCompleted ? 'text-green-500' : ''}`}>
                        <div className={`
                            flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                            ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                            ${isCurrent ? 'border-primary text-primary' : 'border-muted'}
                        `}>
                            {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                        </div>
                        <span className="hidden sm:inline-block">{label}</span>
                    </div>
                )
            })}
        </div>
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
             <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
             />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
            <NicheSelection onNext={handleStepComplete} />
        )}

        {currentStep === 2 && (
             <LanguageVoiceSelection 
                onNext={handleStepComplete} 
                onBack={prevStep}
             />
        )}

        {currentStep === 3 && (
             <BackgroundMusicSelection 
                onNext={handleStepComplete} 
                onBack={prevStep}
             />
        )}
        {currentStep === 4 && (
             <VideoStyleSelection 
                onNext={handleStepComplete} 
                onBack={prevStep}
             />
        )}
        {currentStep === 5 && (
             <CaptionStyleSelection 
                onNext={handleStepComplete} 
                onBack={prevStep}
             />
        )}
        {currentStep === 6 && (
             <SeriesSchedule 
                onNext={(data) => {
                  setFormData({ ...formData, ...data });
                  console.log("Final Series Data:", { ...formData, ...data });
                  alert("Series Scheduled Successfully!");
                }} 
                onBack={prevStep}
             />
        )}
      </div>
    </div>
  );
}
