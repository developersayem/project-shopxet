import { TopNavbar } from "./top-navbar";
import { BottomNavbar } from "./bottom-navbar";

export function MainHeader() {
  return (
    <header className="w-full hidden md:block">
      <TopNavbar
        logo="/logos/logo.png"
        siteName="ShopXet"
        siteNameColor="#397f49 "
        cardTextColor="#397f49"
        searchButtonColor="#397f49"
        currency="৳"
      />
      <BottomNavbar />
    </header>
  );
}
