import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// Array of links to be displayed in the side navigation
const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserGroupIcon,
  },
  // { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <div className="flex flex-col space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-900 hover:bg-sky-100 hover:text-blue-600"
          >
            <LinkIcon className="w-6 h-6" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
