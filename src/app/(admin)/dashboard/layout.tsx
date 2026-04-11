import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


export default function DashboardLayout({
  children,
  admin,
  user
}: Readonly<{
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}>) {
  return (
     <>
    
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {children}
           {admin}
          {user}
          </SidebarInset>
      </SidebarProvider>
     
   </>
  );
}
