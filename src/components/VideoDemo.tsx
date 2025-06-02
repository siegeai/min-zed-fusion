
import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const VideoDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-2xl cursor-pointer group">
            {/* Screenshot placeholder - you can replace this with an actual screenshot */}
            <div className="w-full h-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-8 h-8 text-green-600 ml-1" fill="currentColor" />
                </div>
                <p className="mt-4 text-gray-600 font-medium">Watch Demo Video</p>
                <p className="text-sm text-gray-500">See min in action</p>
              </div>
            </div>
            
            {/* Overlay for hover effect */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200"></div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1&rel=0"
              title="min Platform Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoDemo;
