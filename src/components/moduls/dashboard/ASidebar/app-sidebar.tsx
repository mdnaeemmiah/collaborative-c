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
import Image from "next/image";
import img1 from "../../../../app/assets/logo-removebg-preview.png";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin/adminDashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Doctors",
      url: "/dashboard/admin/doctors",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard/admin/doctors/all",
        },
        {
          title: "Add",
          url: "/dashboard/admin/doctors/add",
        },
        {
          title: "Trash",
          url: "/dashboard/admin/doctors/trash",
        },
      ],
    },
    {
      title: "All-Medicines",
      url: "/dashboard/admin/medicine",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard/admin/medicine/all",
        },
        {
          title: "Add",
          url: "/dashboard/admin/medicine/add",
        },
        {
          title: "Trash",
          url: "/dashboard/admin/medicine/trash",
        },
      ],
    },
    // {
    //   title: "CustomerManage",
    //   url: "customerManage",
    //   icon: SquareTerminal,
    //   isActive: true,
    // },
    {
      title: "OrderManage",
      url: "orderManage",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "MessageManage",
      url: "message",
      icon: SquareTerminal,
      isActive: true,
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
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
              className="flex items-center justify-center bg-gray-300"
            >
              <Link href="/">
                <div>
                  <Image height={40} width={40} src={img1} alt="image" />
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
