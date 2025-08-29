// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("accessToken")?.value;

//   // If no token and user tries to go to /dashboard, redirect to login
//   if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// // Apply only to dashboard routes
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

//*--------------------------------------------------------------------------------------
// app/dashboard/layout.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       router.push("/login");
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router]);

//   if (!isAuthenticated) {
//     return null; // or loading spinner
//   }

//   return <div className="min-h-screen">{children}</div>;
// }