import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { UserT } from "@/core/modals/userT"
import { faCircleUser, faBoxesPacking, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { NavLink, Link } from 'react-router'

interface UserHeaderActionProps {
        user: UserT
}
export default function UserHeaderAction({ user }: UserHeaderActionProps) {
  return (
         <button className="flex rounded p-2 hover:bg-gray-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user.imageUrl ? user.imageUrl : 'https://w7.pngwing.com/pngs/404/51/png-transparent-unknown-user-avatar-profile-person-account-human-general-pack-icon.png'}
                  alt={user.name}
                  className=""
                />
                <AvatarFallback>{user.name?.charAt(0).toUpperCase()}
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
               <NavLink to="/user" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>
                        <DropdownMenuItem>
                                <span><FontAwesomeIcon icon={faCircleUser} className="mr-2" />Profile</span>
                        </DropdownMenuItem>
                </NavLink>
                <NavLink to="/user/orders" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>
                        <DropdownMenuItem>
                                <span><FontAwesomeIcon icon={faBoxesPacking} className="mr-2" />Orders</span>
                        </DropdownMenuItem>
                </NavLink>
                {/* <NavLink to="/user/address" className={({ isActive }) => isActive ? "font-bold text-primary" : ""}>
                        <DropdownMenuItem>
                                <span><FontAwesomeIcon icon={faAddressBook} className="mr-2" />Address</span>
                        </DropdownMenuItem>
                </NavLink> */}
                <DropdownMenuSeparator />
                <Link to="/logout">
                        <DropdownMenuItem variant="destructive">
                        <span><FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />Sign Out</span>
                        </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>

              {/*  <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </button>
  )
}
