import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function DropDownAvata() {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger >
      <Avatar className="cursor-pointer">
      
             <AvatarFallback>CN</AvatarFallback>
        </Avatar>

    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>

      
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          Billing
        
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          log out
        </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
   
  )
}

export default DropDownAvata