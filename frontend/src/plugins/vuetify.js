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
        'on-surface-variant': '#15151e', // Text on the variant

        // --- 2026 TEAM COLORS (Optimized for Dark Mode) ---
        ferrari: '#FF2800',
        'ferrari-darken-1': '#C41E00', // Darker Red
        redbull: '#3671C6',
        'redbull-darken-1': '#265496', // Darker Blue
        mclaren: '#FF8000',
        'mclaren-darken-1': '#CC6600', // Burnt Orange
        mercedes: '#00D2BE',
        'mercedes-darken-1': '#00A191', // Teal -> Jungle Green
        astonmartin: '#229971',
        'astonmartin-darken-1': '#166E50', // Deep Green
        alpine: '#FD4BC7',
        'alpine-darken-1': '#C9369D', // Deep Pink
        williams: '#64C4FF',
        'williams-darken-1': '#0090FF', // Vivid Blue
        audi: '#F50537',
        'audi-darken-1': '#B80429', // Deep Laser Red
        vcarb: '#6692FF',
        'vcarb-darken-1': '#3D6DE0', // Darker Racing Bulls Blue
        haas: '#FFFFFF',
        'haas-darken-1': '#B0B0B0', // White -> Light Grey
        cadillac: '#FFD700',
        'cadillac-darken-1': '#C5A000', // Gold -> Bronze
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

        // --- 2026 TEAM COLORS (Optimized for Light Mode) ---
        ferrari: '#D00000',
        'ferrari-darken-1': '#A00000', 
        redbull: '#0600EF',
        'redbull-darken-1': '#0400B0', 
        mclaren: '#FF8000',
        'mclaren-darken-1': '#D66B00', 
        mercedes: '#00A191', 
        'mercedes-darken-1': '#007A6E', 
        astonmartin: '#00594F',
        'astonmartin-darken-1': '#003D36', 
        alpine: '#E03BA3',
        'alpine-darken-1': '#B0257D', 
        williams: '#005AFF',
        'williams-darken-1': '#0042BD', 
        audi: '#CC042E', 
        'audi-darken-1': '#990322', 
        vcarb: '#1A32AC', 
        'vcarb-darken-1': '#11227A', 
        haas: '#2d2d2d', 
        'haas-darken-1': '#1a1a1a', // Dark Grey -> Almost Black
        cadillac: '#C5A000',
        'cadillac-darken-1': '#997C00',
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
        },
        typography: {
            fontFamily: 'Formula1, system-ui, sans-serif'
        },
    },
})
