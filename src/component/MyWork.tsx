import { cn } from "@lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@components/ui/context-menu";
import { Separator } from "@components/ui/separator";
import { Skeleton } from '@components/ui/skeleton';

import { Link } from "@/src/types/link.ts";
import {  useEffect, useState } from 'react';
interface MyWorkProps extends React.HTMLAttributes<HTMLDivElement> {
  link: Link;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src:string;
}

const ImageLazyLoading = (props:ImageProps)=>{
  const {src} = props;
  const [image,setImage ] = useState<HTMLImageElement|null>(null);
  useEffect(()=>{
    const img = new Image();
    img.src = src;
    img.onload = ()=>{
      setImage(img);
    }
  },[src])

  return image ?  <img {...props} /> : <Skeleton className="rounded-full" {...props} />

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
            {link.cover && <ImageLazyLoading  
              src={link.cover}
              alt={link.description}
              style={{ width, height }}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 hover:aspect-video rounded-sm",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}></ImageLazyLoading>}
          
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Go to Page</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to List</ContextMenuSubTrigger>
          </ContextMenuSub>
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
