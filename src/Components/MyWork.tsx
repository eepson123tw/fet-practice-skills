import { PlusCircle } from "lucide-react";

import { cn } from "@lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@components/ui/context-menu";
import { Separator } from "@components/ui/separator";

import { Link } from "@/src/types/link.ts";
interface MyWorkProps extends React.HTMLAttributes<HTMLDivElement> {
  link: Link;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function MyWork({
  link,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MyWorkProps) {
  return (
    <div
      className={cn("space-y-3", className)}
      {...props}
      onClick={() => window.open(link.url, "_blank")}
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="items-center flex p-1">
            <img
              src={link.cover}
              alt={link.description}
              style={{ width, height }}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 rounded-sm",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {/* {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))} */}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Separator style={{ margin: "unset" }} />
      <div className="text-sm [&>*]:mb-4">
        <h3 className="font-medium leading-none text-xl uppercase">
          {link.routeName}
        </h3>
        <p className="text-xs text-muted-foreground">
          {link.description || "currently no desc"}
        </p>
      </div>
    </div>
  );
}
