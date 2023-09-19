"use client"
import * as React from 'react';
import {Moon, Sun} from 'lucide-react';
import {useTheme} from "next-themes";
import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Button } from './ui/button';


export function ThemeToggle({className, ...props}:React.HTMLAttributes<HTMLDivElement>){
  const {setTheme} = useTheme();

  return(
    <div className={className} {...props}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 translate"/>
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0'/>
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={()=> setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=> setTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}