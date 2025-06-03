
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BlogPostHeaderProps {
  title: string;
  date: string;
  readTime: string;
  image: string;
}

const BlogPostHeader = ({ title, date, readTime, image }: BlogPostHeaderProps) => {
  return (
    <>
      {/* Back button */}
      <div className="mb-8">
        <Link to="/blog">
          <Button variant="outline" className="border-green-200/50 hover:bg-green-50/50 font-normal">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-green-100/60 shadow-lg overflow-hidden mb-12">
        <div className="h-64 md:h-80 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6 leading-tight">
            {title}
          </h2>
        </div>
      </div>
    </>
  );
};

export default BlogPostHeader;
