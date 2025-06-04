
import { useState, useEffect } from "react";
import { RunwareService, GeneratedImage } from "@/services/runwareService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Download } from "lucide-react";

interface FeatureImageGeneratorProps {
  featureTitle: string;
  prompt: string;
  onImageGenerated: (imageUrl: string) => void;
  fallbackImage: string;
}

const FeatureImageGenerator = ({ 
  featureTitle, 
  prompt, 
  onImageGenerated, 
  fallbackImage 
}: FeatureImageGeneratorProps) => {
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showApiInput, setShowApiInput] = useState(false);

  const generateImage = async () => {
    if (!apiKey.trim()) {
      setShowApiInput(true);
      toast.error("Please enter your Runware API key");
      return;
    }

    setIsGenerating(true);
    
    try {
      const service = new RunwareService(apiKey);
      const enhancedPrompt = `${prompt} Use soft whites, mint greens, soft purples, neutral grays color palette. Modern UI design with rounded corners, soft shadows, generous white space. Sans-serif typography. Clean, minimalist interface screenshot.`;
      
      const result: GeneratedImage = await service.generateImage({
        positivePrompt: enhancedPrompt,
        model: "runware:100@1",
        width: 1024,
        height: 768,
        numberResults: 1,
        outputFormat: "WEBP",
        CFGScale: 7,
        scheduler: "FlowMatchEulerDiscreteScheduler"
      });

      setGeneratedImage(result.imageURL);
      onImageGenerated(result.imageURL);
      toast.success(`Generated image for ${featureTitle}`);
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Using fallback.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {showApiInput && (
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Enter your Runware API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="text-sm"
          />
          <p className="text-xs text-gray-500">
            Get your API key from{" "}
            <a 
              href="https://runware.ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              runware.ai
            </a>
          </p>
        </div>
      )}
      
      <Button
        onClick={generateImage}
        disabled={isGenerating}
        size="sm"
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Generate {featureTitle}
          </>
        )}
      </Button>

      <img 
        src={generatedImage || fallbackImage} 
        alt={featureTitle}
        className="w-full h-full object-cover rounded-sm"
      />
    </div>
  );
};

export default FeatureImageGenerator;
