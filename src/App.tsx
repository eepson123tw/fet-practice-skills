import "@/assets/globals.css";
import { Monitoring } from "react-scan/monitoring";
import {
  useLayoutEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { Alert, AlertDescription } from "@components/ui/alert";
import { Skeleton } from "@components/ui/skeleton";

const InfoView = lazy(() => import("./view/InfoView"));
const CodeExperimentView = lazy(() => import("./view/CodeExperimentView"));
import { MyWork } from "./component/MyWork.tsx";

import { links, groupBy, isValidKey } from "./utils/links.ts";
import { type Link } from "@src/types/link.ts";
import useRoute from "@src/composable/useRoute.ts";
import { useAppContext } from "./store/AppContext.tsx";
import { useTheme } from "./store/ThemeContext.tsx";

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError] = useState(false);

  if (hasError) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertDescription>
          Something went wrong. Please refresh the page or try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return children;
};

const LoadingGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-1">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex flex-col space-y-2">
        <Skeleton className="h-[250px] w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

function App() {
  const { currentPage, isViewPage } = useRoute();
  const { setUrlHash, urlHash } = useAppContext();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark";

  const linkGroup = useMemo(() => {
    if (!isValidKey(currentPage) || isViewPage) {
      return [];
    }

    const urlHead = import.meta.env.MODE === "production" ? "." : "/fet-trick";
    const filterTexts = ["/js/", "/css/", "/browser/", "/canvas/"];

    const urlFilter = (url: string) => {
      let tempUrl = url;
      filterTexts.forEach((filter) => {
        const regex = new RegExp(`^${filter}`, "gi");
        tempUrl = tempUrl.replace(regex, "/");
      });
      return import.meta.env.MODE === "production" ? tempUrl + ".html" : url;
    };

    return groupBy(links, "group")[currentPage].map((link) => ({
      ...link,
      cover: "/screenshots/" + link.routeName + ".png",
      url: (urlHead + urlFilter(link.url)) as Link["url"],
      folder: "/fet-trick" + link.url,
    }));
  }, [currentPage, isViewPage]);

  const ViewGroup = useMemo(() => {
    if (currentPage === "code") {
      return <CodeExperimentView />;
    }
    if (currentPage === "info") {
      return <InfoView />;
    }
    return null;
  }, [currentPage]);

  useLayoutEffect(() => {
    setUrlHash(window.location.hash ? window.location.hash : "#js-trick");

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [setUrlHash]);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (scrollArea) {
      scrollArea.scrollTop = 0;
    }
  }, [urlHash]);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-90/20 text-white" : "bg-gradient-to-br from-white/20 via-gray-50 to-white text-gray-900"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between p-4"
      >
        <div className="space-y-1">
          <h2
            className={`text-3xl font-bold tracking-tight ${theme === "dark" ? "text-yellow-600" : "text-blue-600"}`}
          >
            Frontend Practice Skills
          </h2>
          <p
            className={`text-sm ${theme === "dark" ? "text-yellow-200" : "text-blue-400"}`}
          >
            A collection of frontend demos and experiments
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              theme === "dark"
                ? "bg-yellow-300 text-gray-900 hover:bg-yellow-400"
                : "bg-gray-800 text-yellow-300 hover:bg-gray-700"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </motion.div>

      <Separator
        className={`mb-4 ${theme === "dark" ? "bg-red-400/20" : "bg-blue-600/20"}`}
      />

      <div className="relative p-3 h-full">
        <ScrollArea
          className="h-[calc(100vh-180px)] overflow-auto"
          ref={scrollAreaRef}
        >
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingGrid />
              ) : !isViewPage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-1"
                >
                  {linkGroup.map((link, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <MyWork
                        link={link}
                        className={`w-full text-center items-center flex flex-col justify-start cursor-pointer rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-95 backdrop-blur-lg ${
                          theme === "dark"
                            ? "bg-gray-800/70 ring-2 ring-yellow-300/50 hover:ring-red-400/80 shadow-lg shadow-yellow-300/10 hover:shadow-red-400/20"
                            : "bg-white/80 ring-2 ring-gray-200/50 hover:ring-blue-400/80 shadow-lg hover:shadow-blue-400/20"
                        }`}
                        aspectRatio="portrait"
                        width={500}
                        height={310}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <Suspense fallback={<LoadingGrid />}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {ViewGroup}
                  </motion.div>
                </Suspense>
              )}
            </AnimatePresence>
          </ErrorBoundary>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <footer
        className={`px-6 py-4 text-center text-sm backdrop-blur-lg ${
          isDark ? "bg-gray-900/50 text-gray-300" : "bg-white/50 text-gray-600"
        }`}
      >
        <p>
          © {new Date().getFullYear()} Frontend Practice Skills
          <span className="mx-2">•</span>
          Made with <span className="text-red-500">♥</span> by developers, for
          developers
        </p>
      </footer>
      <Monitoring
        apiKey="3qjt-pMRrk70BIc2wMlHX2sLi4hoYdUW" // Safe to expose publically
        url="https://monitoring.react-scan.com/api/v1/ingest"
      />
    </div>
  );
}

export default App;
