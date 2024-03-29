import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pineapple Dashboard",
  description: "Generated by create next app",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="text-white">
      <Navbar />
      {children}
    </main>
  );
}
