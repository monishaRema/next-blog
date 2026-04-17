import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/service/user.service";



export default async function  DashboardLayout({
  admin,
  user
}: Readonly<{
 
  admin: React.ReactNode;
  user: React.ReactNode;
}>) {


  const {data} = await userService.getSession()
  const userInfo = data.user;


  return (
     <>
    {/* user={userInfo} */}
      <SidebarProvider>  
        <AppSidebar/>
        <SidebarInset>
         <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin ? admin : user}
        </div>
          </SidebarInset>
      </SidebarProvider>
     
   </>
  );
}
