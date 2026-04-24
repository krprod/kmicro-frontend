import React, { type ReactNode } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

interface ProductListingSideNavProps{
    children: ReactNode
}

// Mock Data Structure
const CATEGORIES = [
  { id: "electronics", name: "Electronics", count: 124 },
  { id: "clothing", name: "Clothing", count: 85 },
  { id: "home", name: "Home & Garden", count: 42 },
  { id: "books", name: "Books", count: 12 },
]

interface CategorySidebarProps{
  selectedIds: string[]
  onToggle: (id: string) => void
  headerHeight: number
}

const ProductListingSideNav: React.FC<CategorySidebarProps> = ({ selectedIds, onToggle, headerHeight, ...props }: CategorySidebarProps) => 
{
  return (
      <Sidebar  collapsible="icon">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold tracking-tight">Filters</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4 py-2">
              {CATEGORIES.map((category) => (
                <SidebarMenuItem key={category.id} className="flex items-center space-x-3 py-1">
                  <Checkbox
                    id={category.id}
                    checked={selectedIds.includes(category.id)}
                    onCheckedChange={() => onToggle(category.id)}
                  />
                  <label
                    htmlFor={category.id}
                    className="flex flex-1 justify-between text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                    <span className="text-xs text-muted-foreground font-normal">
                      {category.count}
                    </span>
                  </label>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Availability</SidebarGroupLabel>
          <SidebarGroupContent className="px-4 py-2">
             {/* Additional filters like "In Stock" could go here */}
             <div className="flex items-center space-x-3">
                <Checkbox id="in-stock" />
                <label htmlFor="in-stock" className="text-sm font-medium">In Stock Only</label>
             </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default ProductListingSideNav