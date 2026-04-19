import * as React from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type NavItem = {
  isActive?: boolean;
  title: string;
  url: string;
};

type NavGroup = {
  items?: NavItem[];
  title: string;
  url?: string;
};

const data: { navMain: NavGroup[] } = {
  navMain: [
    {
      title: "Getting Started",
      items: [
        {
          title: "admin-dashboard",
          url: "/admin-dashboard",
        },
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Create Blog",
          url: "/dashboard/create-blog",
        },
        {
          title: "Home",
          url: "/",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {data.navMain.map((group) => {
          const items =
            group.items ??
            (group.url
              ? [
                  {
                    title: group.title,
                    url: group.url,
                  },
                ]
              : []);

          return (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        render={<Link href={item.url} />}
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
