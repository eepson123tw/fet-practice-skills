import { Globe, PenTool, Eclipse, Hexagon, Code, Info, Sparkles } from "lucide-react";
import { Theme } from "@src/hook/useTheme";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { ThemeSwitcher } from "@components/theme-switcher";
import { Group } from "@src/types/link.ts";
import useRoute from "@src/composable/useRoute.ts";
import { useState, useEffect } from "react";
import { cn } from "@lib/utils";

const items = [
  {
    title: "JavaScript",
    url: "#" + Group.Js,
    icon: Hexagon,
    description: "Interactive JS components and demos",
    color: "text-yellow-500",
    hoverColor: "group-hover:text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "CSS",
    url: "#" + Group.Css,
    icon: Eclipse,
    description: "Modern styling techniques",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Browser API",
    url: "#" + Group.Browser,
    icon: Globe,
    description: "Web platform capabilities",
    color: "text-green-500",
    hoverColor: "group-hover:text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Canvas",
    url: "#" + Group.Canvas,
    icon: PenTool,
    description: "Visual & interactive graphics",
    color: "text-purple-500",
    hoverColor: "group-hover:text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "About",
    url: "#" + Group.Info,
    icon: Info,
    description: "Project information",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    title: "Code Lab",
    url: "#" + Group.Code,
    icon: Code,
    description: "Experimental code snippets",
    color: "text-orange-500",
    hoverColor: "group-hover:text-orange-400",
    bgColor: "bg-orange-500/10",
  },
];

export function AppSidebar({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}) {
  const { currentPage } = useRoute();
  const [animateItems, setAnimateItems] = useState(false);

  const cur = new Date(Date.now());
  const fullYear = cur.getFullYear();
  
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Sidebar 
      className="border-r border-zinc-200 dark:border-zinc-800"
    >
      <SidebarHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "bg-gradient-to-br from-indigo-500 to-purple-600",
            "text-white font-semibold"
          )}>
            F2E
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold">
              Frontend Practice
            </h2>
            <p className="text-xs opacity-70">Development Lab</p>
          </div>
        </div>
       {false &&  <ThemeSwitcher theme={theme} setTheme={setTheme} />}
      </SidebarHeader>
      
      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Practice Components</span>
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu accessKey="">
              {items.map((item, index) => (
                <SidebarMenuItem 
                  key={item.title}
                  className={cn(
                    "transition-all duration-500 transform",
                    animateItems 
                      ? "translate-x-0 opacity-100" 
                      : "translate-x-8 opacity-0",
                    
                    { "transition-delay-100": index === 0 },
                    { "transition-delay-200": index === 1 },
                    { "transition-delay-300": index === 2 },
                    { "transition-delay-400": index === 3 },
                    { "transition-delay-500": index === 4 },
                    { "transition-delay-600": index === 5 },
                  )}
                >
                  <SidebarMenuButton
                    asChild
                    isActive={item.url.includes(currentPage)}
                    tooltip={item.description}
                  >
                    <a 
                      href={item.url}
                      className={cn(
                        "group relative overflow-hidden",
                        "before:absolute before:inset-0 before:w-full before:h-full before:opacity-0",
                        "before:transition-opacity before:duration-300",
                        `before:${item.bgColor}`,
                        "hover:before:opacity-100"
                      )}
                    >
                      <span className={cn(
                        "flex items-center justify-center rounded-md p-1 mr-2 transition-all duration-300",
                        item.color,
                        item.hoverColor
                      )}>
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="font-medium">{item.title}</span>
                      
                      {item.url.includes(currentPage) && (
                        <span className="absolute right-3 flex items-center">
                          <span className="relative flex h-2 w-2">
                            <span className={cn(
                              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                              item.color.replace("text-", "bg-")
                            )}></span>
                            <span className={cn(
                              "relative inline-flex rounded-full h-2 w-2",
                              item.color.replace("text-", "bg-")
                            )}></span>
                          </span>
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className={cn(
          "flex items-center justify-between px-3 py-2 rounded-lg text-xs",
          "bg-indigo-500/10 dark:bg-indigo-500/20"
        )}>
          <div className="flex flex-col">
            <span className="font-medium">Frontend Skills</span>
            <span className="opacity-70">{ fullYear} Edition</span>
          </div>
          <SidebarTrigger  className="h-7 w-7" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
