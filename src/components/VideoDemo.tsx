import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const VideoDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="relative w-full aspect-video bg-gray-50 rounded-3xl overflow-hidden shadow-lg cursor-pointer group border border-gray-100">
            {/* Demo video screenshot */}
            <div className="w-full h-full relative">
              <img src="https://img.youtube.com/vi/IKtzNL72P34/maxresdefault.jpg" alt="Demo Video Screenshot" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              
              {/* Overlay with play button */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
                <div className="text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-gray-900 translate-x-1" fill="currentColor" />
                  </div>
                  <p className="mt-6 text-white font-light text-lg drop-shadow-lg">2 min Demo Video</p>
                  <p className="text-sm text-white/90 drop-shadow-lg font-light">See min. in action</p>
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-5xl w-full p-0 border-0 bg-transparent">
          <div className="aspect-video w-full rounded-2xl overflow-hidden">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/IKtzNL72P34?autoplay=1&mute=0&controls=1&rel=0" title="min. Platform Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default VideoDemo;