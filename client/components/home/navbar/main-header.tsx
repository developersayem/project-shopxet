import { TopNavbar } from "./top-navbar";
import { BottomNavbar } from "./bottom-navbar";

interface INav {
  name: string;
  link: string;
}

const navItems: INav[] = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "products",
    link: "/products",
  },
  {
    name: "flash sale",
    link: "/flash-sale",
  },
  {
    name: "all categories",
    link: "/all-categories",
  },
  {
    name: "brands",
    link: "/brands",
  },
];

export function MainHeader() {
  return (
    <header className="w-full hidden md:block ">
      <TopNavbar
        logo="/logos/logo.png"
        siteName="ShopXet"
        siteNameColor="#397f49 "
        cardTextColor="#397f49"
        searchButtonColor="#397f49"
        currency="৳"
      />
      <BottomNavbar
        navItems={navItems}
        backgroundColor="#3cbc65"
        textColor="#ffffff"
        hoverColor="#298948"
        activeColor="#298948"
        activeTextColor="#ffffff"
        categoriesHeaderColor="#37ae2e"
        categoriesTextColor="#fff"
      />
    </header>
  );
}
