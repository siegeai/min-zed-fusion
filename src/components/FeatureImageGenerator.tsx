
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RunwareService } from '@/services/runwareService';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface FeatureImageGeneratorProps {
  prompt: string;
  onImageGenerated: (imageUrl: string) => void;
  currentImageUrl?: string;
}

const FeatureImageGenerator: React.FC<FeatureImageGeneratorProps> = ({
  prompt,
  onImageGenerated,
  currentImageUrl
}) => {
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!currentImageUrl);

  const generateImage = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your Runware API key");
      return;
    }

    setIsGenerating(true);
    try {
      const runwareService = new RunwareService(apiKey);
      
      const enhancedPrompt = `${prompt}. UI/UX design, clean interface, modern app screenshot, soft whites, mint greens, neutral grays, rounded corners, soft shadows, generous white space, sans-serif typography, minimalistic icons, polished but approachable design`;
      
      const result = await runwareService.generateImage({
        positivePrompt: enhancedPrompt,
        model: "runware:100@1",
        width: 1024,
        height: 768,
        outputFormat: "WEBP",
      });
      
      onImageGenerated(result.imageURL);
      setShowApiKeyInput(false);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!showApiKeyInput && currentImageUrl) {
    return (
      <div className="absolute top-2 right-2 z-10">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowApiKeyInput(true)}
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Regenerate
        </Button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-4 z-10">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Generate Feature Image</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Runware API Key:
            </label>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Runware API key"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Get your API key from{' '}
              <a href="https://runware.ai/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                runware.ai
              </a>
            </p>
          </div>
          <Button
            onClick={generateImage}
            disabled={isGenerating || !apiKey.trim()}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureImageGenerator;
