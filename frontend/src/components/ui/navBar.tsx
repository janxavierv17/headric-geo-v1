"use client";

import Link from "next/link";
import { Button } from "./button";
import { HomeIcon, UserIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export const links = { home: "/", apartment: "/apartment", login: "/login" } as const;
export type allowedUrls = (typeof links)[keyof typeof links];

export const NavBar = () => {
	const pathname = usePathname();
	const isActive = (url: allowedUrls): boolean => pathname === url;

	return (
		<nav className="h-20 pl-8 pr-8">
			<ul className="flex justify-between items-center h-full">
				<li>
					<Link href="/">APT.</Link>
				</li>
				<div className="flex justify-between items-center gap-3">
					<li>
						<Button
							className={`hover:bg-emerald-600 ${
								isActive("/apartment") ? "bg-emerald-700 text-white" : ""
							} focus:outline-none focus:ring focus:ring-emerald-300`}
						>
							<Link href="/apartment" className="flex items-center gap-2">
								<HomeIcon />
								Add Apartment
							</Link>
						</Button>
					</li>
					<li>
						<Button
							className={`hover:bg-emerald-600 ${
								isActive("/login") ? "bg-emerald-700 text-white" : ""
							} focus:outline-none focus:ring focus:ring-emerald-300`}
						>
							<Link href="/login" className="flex items-center gap-2">
								<UserIcon />
								Log in
							</Link>
						</Button>
					</li>
				</div>
			</ul>
		</nav>
	);
};
