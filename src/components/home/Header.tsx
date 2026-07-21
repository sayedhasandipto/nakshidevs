"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const user = session?.user;
  const firstInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200/50 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <h1 className="text-2xl font-bold text-[#002045]">NakshiDevs</h1>
          </Link>
        </div>

        <nav className="hidden items-center gap-4 lg:flex">
          <Link href="/">
            <Button variant="ghost">হোম</Button>
          </Link>
          <Link href="/gov-services">
            <Button variant="ghost">সরকারি সেবা</Button>
          </Link>
          <Link href="/business-solutions">
            <Button variant="ghost">ব্যবসায়িক সমাধান</Button>
          </Link>
          <Link href="/web-dev">
            <Button variant="ghost">ওয়েব ডেভেলপমেন্ট</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost">আমাদের সম্পর্কে</Button>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" title="ড্যাশবোর্ড">
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 transition-all hover:shadow-lg">
                  <span className="font-bold text-white">{firstInitial}</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="hidden md:flex"
              >
                লগ আউট
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost">
                <Link href="/auth/login">লগইন</Link>
              </Button>
              <Button variant="primary">
                <Link href="/auth/signup">নিবন্ধন করুন</Link>
              </Button>
            </>
          )}

          <button
            className="p-2 text-gray-600 hover:text-[#002045] focus:outline-none lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? "max-h-[500px] border-t border-gray-100 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-4 bg-gray-50 px-6 py-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              হোম
            </Button>
          </Link>
          <Link href="/gov-services">
            <Button variant="ghost" className="w-full justify-start">
              সরকারি সেবা
            </Button>
          </Link>
          <Link href="/business-solutions">
            <Button variant="ghost" className="w-full justify-start">
              ব্যবসায়িক সমাধান
            </Button>
          </Link>
          <Link href="/web-dev">
            <Button variant="ghost" className="w-full justify-start">
              ওয়েব ডেভেলপমেন্ট
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="w-full justify-start">
              আমাদের সম্পর্কে
            </Button>
          </Link>
          {session && (
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600"
              onClick={handleLogout}
            >
              লগ আউট
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
