import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";



export default function DashboardLayout({
  admin,
  user
}: Readonly<{
 
  admin: React.ReactNode;
  user: React.ReactNode;
}>) {

  const userInfo = {
    role : "ADMIN"
  }


  return (
     <>
    
      <SidebarProvider>
        <AppSidebar user={userInfo}/>
        <SidebarInset>
         <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === "ADMIN" ? admin : user}
        </div>
          </SidebarInset>
      </SidebarProvider>
     
   </>
  );
}
