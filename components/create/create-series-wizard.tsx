"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { NicheSelection } from "@/components/create/steps/niche-selection";
import { LanguageVoiceSelection } from "@/components/create/steps/language-voice";
import { Check } from "lucide-react";

const steps = [
  "Niche",
  "Language & Voice",
  "Video Style", 
  "Background Music", 
  "Schedule", 
  "Review"
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
        {/* Placeholder for other steps */}
        {currentStep > 2 && (
             <div className="p-10 text-center border rounded-lg bg-card">
                <h2 className="text-xl font-bold">Step {currentStep}: {steps[currentStep-1]}</h2>
                <p className="text-muted-foreground mt-2">Placeholder for step {currentStep}</p>
                <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={prevStep}>Back</Button>
                    <Button onClick={() => nextStep()}>Continue</Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
