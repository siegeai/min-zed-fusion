
const VideoDemo = () => {
  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=1&rel=0"
        title="min Platform Demo"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default VideoDemo;
