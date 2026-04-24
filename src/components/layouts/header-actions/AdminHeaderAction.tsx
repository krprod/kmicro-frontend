import {
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  Avatar,
} from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { UserT } from "@/core/modals/userT"
import { faCircleUser, faRightFromBracket, faChartLine } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink } from "react-router"

interface AdminHeaderActionProps {
  user: UserT
}
function AdminHeaderAction({ user }: AdminHeaderActionProps) {
  return (
    <div className="flex rounded p-2 hover:bg-gray-100">
        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <Link to="/admin/dashboard" className="flex items-center gap-2">
                                <Avatar>
                                <AvatarImage
                                src={
                                user.imageUrl
                                        ? user.imageUrl
                                        : "https://w7.pngwing.com/pngs/404/51/png-transparent-unknown-user-avatar-profile-person-account-human-general-pack-icon.png"
                                }
                                alt={user.name}
                                className=""
                                />
                                <AvatarFallback>
                                {user.name?.charAt(0).toUpperCase()}
                                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                                </AvatarFallback>
                                </Avatar>
                        </Link>
                </DropdownMenuTrigger>
                   <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <NavLink to="/admin/profile" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>
                        <DropdownMenuItem>
                                <span><FontAwesomeIcon icon={ faCircleUser} className="mr-2" />Profile</span>
                        </DropdownMenuItem>
                </NavLink>
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>
                        <DropdownMenuItem>
                                <span><FontAwesomeIcon icon={faChartLine} className="mr-2" />Dashboard</span>
                        </DropdownMenuItem>
                </NavLink>           
                <DropdownMenuSeparator />
                <Link to="/logout">
                        <DropdownMenuItem variant="destructive">
                        <span><FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />Log Out</span>
                        </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default AdminHeaderAction
