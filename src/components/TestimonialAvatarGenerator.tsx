
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RunwareService } from '@/lib/runware';
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";

interface TestimonialAvatarGeneratorProps {
  onImageGenerated: (imageUrl: string, testimonialIndex: number) => void;
}

const TestimonialAvatarGenerator = ({ onImageGenerated }: TestimonialAvatarGeneratorProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const avatarPrompts = [
    "Professional headshot of Sarah Chen, Asian-American woman in her early 30s, wearing a modern navy blazer, warm smile, confident expression, clean corporate background, soft lighting, business professional photography style",
    "Professional headshot of Marcus Rodriguez, Hispanic man in his late 20s, wearing a crisp white button-down shirt, friendly approachable smile, tech startup founder vibe, modern office background, natural lighting",
    "Professional headshot of Emily Watson, Caucasian woman in her mid-30s, wearing a sophisticated gray blazer, intelligent expression, project manager professional look, clean minimalist background, studio lighting"
  ];

  const testimonialNames = ["Sarah Chen", "Marcus Rodriguez", "Emily Watson"];

  const generateAvatar = async (index: number) => {
    if (!apiKey.trim()) {
      toast.error('Please enter your Runware API key');
      return;
    }

    setIsGenerating(true);
    setGeneratingIndex(index);

    try {
      const runware = new RunwareService(apiKey);
      const result = await runware.generateImage({
        positivePrompt: avatarPrompts[index],
        model: "runware:100@1",
        numberResults: 1,
        outputFormat: "WEBP",
        CFGScale: 7,
        scheduler: "FlowMatchEulerDiscreteScheduler",
        strength: 0.8
      });

      onImageGenerated(result.imageURL, index);
      toast.success(`Avatar generated for ${testimonialNames[index]}!`);
    } catch (error) {
      console.error('Error generating avatar:', error);
      toast.error(`Failed to generate avatar for ${testimonialNames[index]}`);
    } finally {
      setIsGenerating(false);
      setGeneratingIndex(null);
    }
  };

  const generateAllAvatars = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your Runware API key');
      return;
    }

    for (let i = 0; i < avatarPrompts.length; i++) {
      await generateAvatar(i);
      // Small delay between generations
      if (i < avatarPrompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Testimonial Avatars</h3>
      
      <div className="mb-4">
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
          Runware API Key
        </label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your Runware API key"
        />
        <p className="text-xs text-gray-500 mt-1">
          Get your API key from <a href="https://runware.ai/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">runware.ai</a>
        </p>
      </div>

      <div className="space-y-3 mb-4">
        {testimonialNames.map((name, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <span className="font-medium text-gray-900">{name}</span>
              <p className="text-sm text-gray-600 mt-1">{avatarPrompts[index].substring(0, 80)}...</p>
            </div>
            <Button
              onClick={() => generateAvatar(index)}
              disabled={isGenerating}
              size="sm"
              className="ml-4"
            >
              {isGenerating && generatingIndex === index ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Generate
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={generateAllAvatars}
        disabled={isGenerating}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Avatars...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Generate All Avatars
          </>
        )}
      </Button>
    </div>
  );
};

export default TestimonialAvatarGenerator;
