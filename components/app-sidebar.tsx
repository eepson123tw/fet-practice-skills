import { Globe, PenTool, Eclipse, Hexagon, Code,Info } from "lucide-react";

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
} from "@components/ui/sidebar";

import { ThemeSwitcher } from "@components/theme-switcher";
import { Group } from "@src/types/link.ts";
import useRoute from "@src/composable/useRoute.ts";

const items = [
  {
    title: "JS",
    url: "#" + Group.Js,
    icon: Hexagon,
  },
  {
    title: "CSS",
    url: "#" + Group.Css,
    icon: Eclipse,
  },
  {
    title: "Browser",
    url: "#" + Group.Browser,
    icon: Globe,
  },
  {
    title: "Canvas",
    url: "#" + Group.Canvas,
    icon: PenTool,
  },
  {
    title: "Info",
    url: "#info",
    icon: Info,
  },
  {
    title: "Code Experiment",
    url: "#code",
    icon: Code,
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

  return (
    <Sidebar>
      <SidebarHeader>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>F2E Practice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu accessKey="">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url.includes(currentPage)}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
