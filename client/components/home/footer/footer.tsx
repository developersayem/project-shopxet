/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

interface LinkItem {
  name: string;
  href: string;
}

interface ContactItem {
  label: string;
  value: string;
}

interface FooterSection {
  title: string;
  type: "links" | "contacts";
  items: LinkItem[] | ContactItem[];
}

const socialMediaLinks = [
  { name: "Facebook", href: "#", icon: <Facebook /> },
  { name: "Twitter", href: "#", icon: <Twitter /> },
  { name: "Instagram", href: "#", icon: <Instagram /> },
  { name: "Youtube", href: "#", icon: <Youtube /> },
  { name: "Linkedin", href: "#", icon: <Linkedin /> },
];

const user = {
  shopName: "ShopXet",
  brandColor: "#22c55e",
};

// Unified footer data
const footerSections: FooterSection[] = [
  {
    title: "Quick Links",
    type: "links",
    items: [
      { name: "Support Policy", href: "/" },
      { name: "Return Policy", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Seller Policy", href: "/" },
      { name: "Terms & Conditions", href: "/" },
    ],
  },
  {
    title: "Contacts",
    type: "contacts",
    items: [
      { label: "Address", value: "123 Demo Street, Dhaka, Bangladesh" },
      { label: "Phone", value: "+880 1234 567890" },
      { label: "Email", value: "support@shopxet.com" },
    ],
  },
  {
    title: "My Account",
    type: "links",
    items: [
      { name: "Login", href: "/" },
      { name: "Order History", href: "/" },
      { name: "My Wishlist", href: "/" },
      { name: "Track Order", href: "/" },
      { name: "Affiliate Program", href: "/" },
    ],
  },
  {
    title: "Seller Zone",
    type: "links",
    items: [
      { name: "Become a Seller", href: "/" },
      { name: "Login to Seller Panel", href: "/" },
      { name: "Download Seller App", href: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Top Section */}
      <div className="border-b border-neutral-700 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Logo & Tagline */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center">
              <img
                src="/logos/logo.png"
                alt="ShopXet Logo"
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold text-brand-600 ml-2">
                {user.shopName.toUpperCase()}
              </h1>
            </div>
            <p className="text-gray-300 text-sm">
              A multi-vendor eCommerce platform
            </p>
          </div>

          {/* Social Media */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h3 className="text-gray-400 font-semibold mb-4">FOLLOW US</h3>
              <div className="flex gap-3">
                {socialMediaLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-gray-400 font-semibold mb-4">
                {section.title.toUpperCase()}
              </h3>

              <ul className="space-y-2 text-sm">
                {section.type === "links" &&
                  (section.items as LinkItem[]).map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`text-gray-300 hover:text-white transition-colors`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <div className="space-y-2 text-sm">
                {section.type === "contacts" &&
                  (section.items as ContactItem[]).map((item) => (
                    <div className="space-y-4 text-sm" key={item.label}>
                      <h4 className="text-white font-medium mb-1">
                        {item.label}
                      </h4>
                      <p className="text-gray-300">{item.value}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-center items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2025 All rights reserved by{" "}
            <span style={{ color: user.brandColor, fontWeight: 600 }}>
              {user.shopName}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
