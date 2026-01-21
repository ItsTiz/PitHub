/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'


const pithubDarkTheme = {
  dark: true,
  colors: {
    background: '#15151e',       // Deepest dark (Main Background)
    surface: '#2b2b35',          // Slightly lighter (Cards, Sidebars)
    primary: '#b11914',          // Ferrari/Racing Red (Buttons, Active States)
    secondary: '#9ca3af',        // Cool Grey (Subtitles, Icons, Muted text)
    'on-background': '#f3f3f3',  // Almost White (Main Text)
    'on-surface': '#f3f3f3',     // Almost White (Card Text)

    error: '#CF6679',            // Softer red for errors (readable on dark)
    info: '#2196F3',             // Standard Blue (Wet Tyre Blue)
    success: '#4CAF50',          // Sector Green / Go
    warning: '#FFD700',          // Safety Car / Flag Yellow
    
    'primary-darken-1': '#8a100d', // Darker Red for hover states
    'surface-bright': '#3a3a48',   // Lighter surface for hover effects
    'surface-variant': '#9ca3af',  // Used for tooltips/snackbars
    'on-surface-variant': '#15151e' // Text on the variant
  },
  variables: {
    'border-color': '#9ca3af',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.10,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.16,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#2b2b35',
    'theme-on-code': '#f3f3f3',
  }
}


const pithubLightTheme = {
  dark: false,
  colors: {
    background: '#f3f3f3',       // app background
    surface: '#FFFFFF',          // Pure white cards
    
    primary: '#b11914',          // Ferrari Red 
    secondary: '#2b2b35',        // Secondary accent
    
    'on-background': '#15151e',  // "Dark Gunmetal"
    'on-surface': '#15151e',     // Card text
    
    error: '#B00020',            // Darker red for error text on white
    info: '#0288D1',             // Darker blue
    success: '#388E3C',          // Darker green
    warning: '#F57F17',          // Darker amber/orange for visibility
    
    'surface-variant': '#e0e0e0',
    'on-surface-variant': '#2b2b35',
    'primary-darken-1': '#8a100d',
  },
  variables: {
    'border-color': '#2b2b35', 
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'theme-code': '#f5f5f5',
    'theme-on-code': '#15151e',
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'pithubDarkTheme',
    themes:{
        pithubDarkTheme,
        pithubLightTheme
    }
  },
})
