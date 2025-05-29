"use client";

import * as React from "react";
import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Tasks",
      url: "/dashboard/admin/tasks",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard/admin/all-tasks",
        },
        {
          title: "Add",
          url: "/dashboard/admin/add-task",
        }
      ],
    },
    {
      title: "Notifications",
      url: "/dashboard/admin/notifications",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard/admin/all-notifications",
        },
        {
          title: "Add",
          url: "/dashboard/admin/add-notification",
        }
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="flex items-center justify-center bg-gray-600"
            >
              <Link href="/">
                <div>
                 Collaborative
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
