import Link from "next/link";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import Searchbar from "./Searchbar";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed inset-x-0 top-0 z-10 py-3 border-b h-fit bg-zinc-100 border-zinc-500">
      <div className="container flex items-center justify-between h-full mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="w-9 h-9" />
          <p className="hidden text-sm font-medium text-zinc-700 md:block">
            Breadit
          </p>
        </Link>

        {/* Searchbar */}
        <Searchbar />
        {session ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            {" "}
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
