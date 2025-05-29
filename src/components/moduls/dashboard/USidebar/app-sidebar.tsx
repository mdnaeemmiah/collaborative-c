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
import img1 from "../../../../app/assets/logo-removebg-preview.png";
import Image from "next/image";
// import Logo from "@/app/assets/svgs/Logo";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/customer/customerDashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Need Medicine",
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
    {
      title: "Need Help",
      url: "/dashboard/customer/needHelp",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/dashboard/customer/needHelp/all",
        },
        {
          title: "Add",
          url: "/dashboard/customer/needHelp/add",
        },
      ],
    },
    {
      title: "Order History",
      url: "orderHistory",
      icon: SquareTerminal,
      isActive: true,
    },
    // {
    //   title: "Manage Preferences",
    //   url: "ManagePreferences",
    //   icon: SquareTerminal,
    //   isActive: true,
    // },
    // {
    //   title: "OrderMeal",
    //   url: "orderMeal",
    //   icon: SquareTerminal,
    //   isActive: true,
    // },

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
