import "@/assets/globals.css";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { MyWork } from "./Components/MyWork";
import { useLayoutEffect, useMemo } from "react";

import { links, groupBy, isValidKey } from "./utils/links.ts";
import { type Link } from "@src/types/link.ts";
import useRoute from "@src/composable/useRoute.ts";
function App() {
  const { currentPage } = useRoute();

  const linkGroup = useMemo(() => {
    if (!isValidKey(currentPage)) {
      return [];
    }
    const urlHead = import.meta.env.MODE === "production" ? "." : "/fet-trick";
    const filterTexts = ["/js/", "/css/", "/browser/", "/canvas/"];
    const urlFilter = (url: string) => {
      let tempUrl = url;
      filterTexts.forEach((filter) => {
        const regex = new RegExp(`^${filter}`, "gi"); // Match the filter only at the start of the string
        tempUrl = tempUrl.replace(regex, "/"); // Remove the filter from the beginning
      });
      return import.meta.env.MODE === "production" ? tempUrl + ".html" : url;
    };
    return groupBy(links, "group")[currentPage].map((link) => ({
      ...link,
      cover: "/screenshots/" + link.routeName + ".png",
      url: (urlHead + urlFilter(link.url)) as Link["url"],
    }));
  }, [currentPage]);

  useLayoutEffect(() => {
    window.location.hash === "" ? "#js-trick" : window.location.hash;
  });

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight  text-red-400">
            To Learn new thing
          </h2>
          <p className="text-sm text-muted-foreground text-red-400">
            Updated daily.
          </p>
        </div>
      </div>
      <Separator className="mb-2" />
      <div className="relative p-3 h-full">
        <ScrollArea>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  auto-cols-max p-1">
            {linkGroup.map((link, index) => (
              <MyWork
                key={index}
                link={link}
                className="w-full text-center items-center flex flex-col  justify-start cursor-pointer bg-white rounded-lg ring-2 dark:ring-yellow-300 light:ring-gray-800 hover:ring-red-400 overflow-hidden"
                aspectRatio="portrait"
                width={500}
                height={310} // Approximately 250/1.618 for golden ratio
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default App;
