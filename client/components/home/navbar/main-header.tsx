import { MiddleNavbar } from "./middle-navbar";
import { BottomNavbar } from "./bottom-navbar";

export function MainHeader() {
  return (
    <header className="w-full hidden md:block">
      <MiddleNavbar />
      <BottomNavbar />
    </header>
  );
}
