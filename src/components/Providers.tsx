"use client"

import * as React from 'react';
import {ThemeProvider as NextThemeProvider} from "next-themes";
import {type ThemeProviderProps} from 'next-themes/dist/types';
// npm install next-themes
export function Provider({children,...props}:ThemeProviderProps){
    return <NextThemeProvider 
    attribute='class'
    defaultTheme='system'
    enableSystem={true}
    {...props}>{children}</NextThemeProvider>
}