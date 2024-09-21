"use client";

import { Button, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBug } from "react-icons/fa";

const Navbar = () => {
  const pathName = usePathname();
  const [user, setUser] = useState(null);  // State to store user session

  // Fetch session when the component mounts
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session"); // Call your API to get session
        if (res.ok) {
          const data = await res.json();
          setUser(data?.user);  // Assuming the session data includes a user object
        } else {
          setUser(null);  // No session found or not authenticated
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(null);
      }
    };

    fetchSession();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/auth/signout");  // Call the API to sign the user out
    setUser(null);  // Clear the user session locally
  };

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
      // TODO: Add the conformation modal for logout and spinner animations
      <div>
        {user ? (
          <Button
            onClick={handleLogout}
            variant="soft"
            color="red"
          >
            Logout
          </Button>
        ) : (
          
          <Link href="/api/auth/signin">
            <Button color="teal">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
