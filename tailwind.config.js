/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'nav': '1rem',      // Standard navigation padding
        'section': '2rem',  // Section spacing
        'container': '4rem' // Container padding
      },
      colors: {
        // AgriMove Brand Colors (exact from logo)
        agri: {
          primary: '#6CB85C',    // Main light green from logo
          secondary: '#4A8F4A',   // Medium green from logo
          dark: '#2D5016',       // Dark green from logo
          light: '#8BC88B',      // Lighter shade for backgrounds
          accent: '#5A9F5A',     // Medium accent green
          hover: '#5DA54E',      // Hover state color
          active: '#4A8F4A',     // Active state color
        },
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bae5ba',
          300: '#8BC88B',
          400: '#6CB85C',
          500: '#6CB85C',        // AgriMove primary green (exact from logo)
          600: '#4A8F4A',        // AgriMove secondary green (exact from logo)
          700: '#3A7A3A',
          800: '#2D5016',        // AgriMove dark green (exact from logo)
          900: '#1a3009',
        },
        secondary: {
          50: '#f8fdf8',
          100: '#e8f5e8',
          200: '#d1ead1',
          300: '#8BC88B',
          400: '#6CB85C',
          500: '#4A8F4A',
          600: '#4A8F4A',
          700: '#3A7A3A',
          800: '#2D5016',
          900: '#1a3009',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        success: {
          DEFAULT: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        warning: {
          DEFAULT: '#6CB85C',
          light: '#8BC88B',
          dark: '#4A8F4A',
        },
        error: {
          DEFAULT: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};