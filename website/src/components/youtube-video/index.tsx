import { StyleProps } from "@/types/general";
import { cn } from "@/utils/general";

interface YouTubeVideoProps extends StyleProps {
  videoId: string;
}

export const YouTubeVideo = ({ videoId, className }: YouTubeVideoProps) => {
  return (
    <div className={cn("relative", className)}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-xl"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      />
    </div>
  );
};
