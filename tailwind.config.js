/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: {
          50: '#FFFFFF',
          100: '#FDFCFA',
          200: '#FAF8F5',
          300: '#F5F2EC',
          400: '#EFECE5',
          500: '#E4DFD6',
        },
        ivory: {
          50: '#FDFCF9',
          100: '#FAF8F5',
          200: '#F5F2EB',
          300: '#ECE7DD',
          400: '#E2DBD0',
          500: '#D5CCC0',
        },
        maroon: {
          50: '#FBF2F2',
          100: '#F6DFDF',
          200: '#EBBEBE',
          300: '#DC9090',
          400: '#C75D5D',
          500: '#992B2B',
          600: '#7C2121',
          700: '#631B1B',
          800: '#4E1616',
          900: '#3D1212',
          950: '#260B0B',
        },
        gold: {
          50: '#FCF9EE',
          100: '#F8F1D5',
          200: '#F1E1A7',
          300: '#E8CD74',
          400: '#DCB848',
          500: '#C59B27',
          600: '#A67F1C',
          700: '#846219',
          800: '#684B19',
          900: '#553D19',
          antique: '#C59B27',
          rich: '#D4AF37',
          champagne: '#E8D5B5',
          soft: '#F4ECD8',
        },
        champagne: {
          100: '#FAF4EC',
          200: '#F4E7D6',
          300: '#EAD5BA',
          400: '#DCBF98',
          500: '#C7A272',
        }
      },
      fontFamily: {
        italiana: ['"Italiana"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        outfit: ['"Outfit"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        serif: ['"Playfair Display"', '"Italiana"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        kannada: ['"Anek Kannada"', 'sans-serif'],
      },
      boxShadow: {
        'soft-float': '0 20px 45px -15px rgba(61, 18, 18, 0.07)',
        'luxury-card': '0 10px 30px -10px rgba(78, 22, 22, 0.06), 0 0 0 1px rgba(197, 155, 39, 0.25)',
        'gold-glow': '0 0 25px 2px rgba(212, 175, 55, 0.25)',
        'gold-subtle': '0 4px 20px -2px rgba(197, 155, 39, 0.2)',
      },
      animation: {
        'blob-float-1': 'floatBlob1 18s ease-in-out infinite alternate',
        'blob-float-2': 'floatBlob2 22s ease-in-out infinite alternate',
        'blob-float-3': 'floatBlob3 25s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 6s ease-in-out infinite',
      },
      keyframes: {
        floatBlob1: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(60px, -45px) scale(1.15)' },
          '100%': { transform: 'translate(-40px, 35px) scale(0.92)' },
        },
        floatBlob2: {
          '0%': { transform: 'translate(0px, 0px) scale(1.1)' },
          '50%': { transform: 'translate(-70px, 50px) scale(0.95)' },
          '100%': { transform: 'translate(50px, -30px) scale(1.08)' },
        },
        floatBlob3: {
          '0%': { transform: 'translate(0px, 0px) scale(0.95)' },
          '50%': { transform: 'translate(45px, 60px) scale(1.2)' },
          '100%': { transform: 'translate(-55px, -40px) scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.65' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
