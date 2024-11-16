import { Globe, PenTool, Eclipse, Hexagon, Code } from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "JS",
    url: "#",
    icon: Hexagon,
  },
  {
    title: "CSS",
    url: "#CSS",
    icon: Eclipse,
  },
  {
    title: "Browser",
    url: "#Browser",
    icon: Globe,
  },
  {
    title: "Canvas",
    url: "#Canvas",
    icon: PenTool,
  },
  {
    title: "Code Experiment",
    url: "#Code",
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
  return (
    <Sidebar>
      <SidebarHeader>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>F2E Practice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
