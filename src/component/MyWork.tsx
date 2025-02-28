import { cn } from "@lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@components/ui/context-menu";
import { Separator } from "@components/ui/separator";
import { Skeleton } from "@components/ui/skeleton";
import { Badge } from "@components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip";

import { Link } from "@/src/types/link.ts";
import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "../store/ThemeContext";

interface MyWorkProps extends React.HTMLAttributes<HTMLDivElement> {
  link: Link;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
};

type TooltipProps = {
  children?: ReactNode;
  content?: ReactNode;
};

const TooltipHoc = ({
  children,
  content = "Right Click to open menu",
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-black/80 text-white border-none px-3 py-1.5 rounded-full">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ImageLazyLoading = (props: ImageProps) => {
  const { src, className, ...restProps } = props;
  const [, setImage] = useState<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImage(img);
      setIsLoading(false);
    };
  }, [src]);

  return isLoading ? (
    <div className="relative overflow-hidden">
      <Skeleton className={cn("animate-pulse", className)} {...restProps} />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5" />
    </div>
  ) : (
    <img
      src={src}
      className={cn(
        "opacity-0 scale-105 transition-all duration-500 ease-out",
        isLoading ? "" : "opacity-100 scale-100",
        className,
      )}
      {...restProps}
      onLoad={() => setIsLoading(false)}
    />
  );
};

export function MyWork({
  link,
  aspectRatio = "portrait",
  width,
  height,
  className,
}: MyWorkProps) {
  const GITHUBLINK =
    "https://github.com/eepson123tw/fet-practice-skills/tree/master";
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme?.() || { theme: "light" };
  const isDark = theme === "dark";

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={cn(
            "relative group overflow-hidden rounded-lg",
            "transform transition-all duration-300 hover:-translate-y-1",
            isDark ? "bg-gray-800" : "bg-white",
            "shadow-lg hover:shadow-xl",
            isDark ? "shadow-yellow-300/5" : "shadow-gray-200/80",
            "hover:scale-[1.01]",
            className,
          )}
        >
          <TooltipHoc>
            <div
              className="space-y-3 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="overflow-hidden">
                {link.cover && (
                  <div className="relative">
                    <ImageLazyLoading
                      src={link.cover}
                      alt={link.description || ""}
                      style={{ width, height }}
                      className={cn(
                        "h-auto w-auto object-cover transition-all duration-500",
                        "hover:scale-105",
                        aspectRatio === "portrait"
                          ? "aspect-[3/4]"
                          : "aspect-square",
                      )}
                    />

                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center bg-black/40",
                        "transition-all duration-300 ease-in-out",
                        isHovered ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <div
                        className={cn(
                          "flex flex-col items-center gap-3",
                          "transition-all duration-500 ease-in-out",
                          isHovered
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-5",
                        )}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "px-4 py-1.5 bg-white text-black font-medium cursor-pointer",
                            "transform transition-transform duration-200 hover:scale-105",
                            "shadow-md",
                          )}
                          onClick={() => window.open(link.url, "_blank")}
                        >
                          View Demo
                        </Badge>

                        <Badge
                          variant="outline"
                          className={cn(
                            "px-4 py-1.5 bg-black/70 text-white cursor-pointer",
                            "transform transition-transform duration-200 hover:scale-105",
                            "shadow-md",
                          )}
                          onClick={() =>
                            window.open(
                              GITHUBLINK + link.folder + ".html",
                              "_blank",
                            )
                          }
                        >
                          View Code
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator
                className={cn("my-0", isDark ? "bg-gray-700" : "bg-gray-100")}
              />

              <div className="px-4 pb-4 pt-2">
                <div className="text-sm [&>*]:mb-4">
                  <h3
                    className={cn(
                      "font-medium leading-none text-xl uppercase tracking-wide",
                      "transition-colors duration-300",
                      isDark
                        ? "text-yellow-300 group-hover:text-yellow-200"
                        : "text-blue-600 group-hover:text-blue-500",
                    )}
                  >
                    {link.routeName}
                  </h3>
                  <p
                    className={cn(
                      "text-xs line-clamp-2",
                      "transition-colors duration-300",
                      isDark ? "text-gray-300" : "text-gray-500",
                    )}
                  >
                    {link.description || "Currently no description available"}
                  </p>

                  {link.tags && link.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {link.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className={cn(
                            "text-xs",
                            "transition-colors duration-300",
                            isDark
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                          )}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "absolute -inset-px rounded-lg opacity-0 group-hover:opacity-100 -z-10",
                  "transition-opacity duration-500 ease-in-out",
                  isDark
                    ? "bg-gradient-to-br from-yellow-300/10 to-transparent"
                    : "bg-gradient-to-br from-blue-400/10 to-transparent",
                )}
              />
            </div>
          </TooltipHoc>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent
        className={cn(
          "w-60 border-none shadow-lg",
          isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800",
        )}
      >
        <ContextMenuItem
          className={cn(
            "transition-colors duration-200 cursor-pointer",
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
          )}
          onClick={() => window.open(link.url, "_blank")}
        >
          <span className="mr-2">🚀</span> Open Demo
        </ContextMenuItem>

        <ContextMenuItem
          className={cn(
            "transition-colors duration-200 cursor-pointer",
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
          )}
          onClick={() =>
            window.open(GITHUBLINK + link.folder + ".html", "_blank", "popup")
          }
        >
          <span className="mr-2">💻</span> View Code on GitHub
        </ContextMenuItem>

        <ContextMenuSeparator
          className={isDark ? "bg-gray-700" : "bg-gray-200"}
        />

        <ContextMenuItem
          className={cn(
            "transition-colors duration-200 cursor-pointer",
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
          )}
          onClick={() => {
            navigator.clipboard.writeText(window.location.host + link.url);
          }}
        >
          <span className="mr-2">📋</span> Copy Link Address
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
