import React from "react";
import Sidebar from "../../components/layouts/SideBar";
import "../globals.css";
import SearchNavbar from "@/components/layouts/SearchNav";

export const metadata = {
  title: "Project Management Dashboard",
  description: "Manage your construction projects efficiently",
};

{/*const handleSearch = (query: string) => {
  console.log("Searching for:", query);
  // Add search logic here
};*/}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SearchNavbar
          user={{ name: "User", avatar: "/avatar-placeholder.png" }}
        />
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
