"use client";

import { Avatar, Button, DropdownMenu, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBug } from "react-icons/fa";

type userData = {
  image: string;
  name: string;
};

const Navbar = () => {
  const pathName = usePathname();
  const [user, setUser] = useState<userData | null>(null); // State to store user session

  // Fetch session when the component mounts
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (res.ok) {
          const data = await res.json();
          setUser(data?.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(null);
      }
    };
  
    fetchSession();
  }, []);

  useEffect(() => {
    console.log(user)
  }, [user])

  // Logout handler
  // const handleLogout = async () => {
  //   await fetch("/api/auth/signout"); // Call the API to sign the user out
  //   setUser(null); // Clear the user session locally
  // };

  const navLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex justify-between items-center p-3 space-x-10 border-b mb-3">
      <Flex align="center" gap="8">
        <FaBug size={25} />
        <ul className="flex gap-4">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={classNames({
                  "text-zinc-500": item.href !== pathName,
                  "text-zinc-900": item.href === pathName,
                  "hover:text-zinc-800 transition-colors": true,
                })}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Flex>

      {/* Render Login or Logout button */}
      <div>
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {/* <Avatar src={user.image} fallback="?" radius="full" className="cursor-pointer" referrerPolicy="no-referrer"/> */}
              <Image src={user.image} alt="?" height={40} width={40} className="rounded-full hover:cursor-pointer" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label className="flex mb-3">
                Hey<span className="font-bold text-teal-700 p-1 m-1 hover:text-teal-600 rounded-md">{user.name}</span>
              </DropdownMenu.Label>
              <Link href="/api/auth/signout"><DropdownMenu.Item className="hover:cursor-pointer">Logout</DropdownMenu.Item></Link>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Link href="/api/auth/signin">
            <Button color="teal">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
