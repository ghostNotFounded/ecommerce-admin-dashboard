import { UserButton, auth } from "@clerk/nextjs";

import MainNav from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Image from "next/image";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b border-neutral-700">
      <div className="flex h-16 items-center px-4">
        <Image
          src={"/logo.svg"}
          width={30}
          height={30}
          alt="logo"
          className="mr-6"
        />

        <StoreSwitcher className="" items={stores} />

        <MainNav className="mx-6" />

        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
