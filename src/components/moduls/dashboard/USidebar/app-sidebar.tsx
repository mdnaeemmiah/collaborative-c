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
// import { NavMain } from "./nav.main";


// import img1 from "../../../../app/assets/logo-removebg-preview.png";

import { NavUser } from "./nav.main";
import { NavMain } from "./nav-user";

// import Logo from "@/app/assets/svgs/Logo";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/user/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "View Tasks",
      url: "/dashboard/customer/needMedicine",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard/customer/needMedicine/all",
        },
        {
          title: "Add",
          url: "/dashboard/customer/needMedicine/add",
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

export function CAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
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
                  Collaborative  {/* <Image height={40} width={40} src={img1} alt="image" /> */}
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
