import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  mode: "jit",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			rubik: [
  				'var(--font-rubik)'
  			],
  			jakarta: [
  				'var(--font-plus_jakarta_sans)'
  			]
  		},
  		spacing: {
  			sm: '8px',
  			md: '12px',
  			lg: '16px',
  			xl: '24px'
  		},
  		backgroundSize: {
  			'200%': '200% auto'
  		},
  		backgroundImage: {
  			'custom-gradient': 'linear-gradient(128deg, #EF4136 32.39%, #F7941D 93.22%)'
  		},
  		colors: {
  			transparent: 'transparent',
  			current: 'currentColor',
  			dark: '#080A12',
  			bankGradient: '#0179FE',
  			main: {
  				'100': '#E5EFFF',
  				'200': '#B7D3FF',
  				'300': '#8AB7FF',
  				'400': '#5C9BFF',
  				'500': '#2E7FFF',
  				'600': '#0061F9',
  				'700': '#0051D0',
  				'800': '#0041A7',
  				'900': '#00317F',
  				'901': '#002156',
  				'902': '#001433',
  				'903': '#030407',
  				bg: '#F9FAFB'
  			},
  			sec: {
  				'100': '#F8F9FF',
  				'200': '#E4E9FF',
  				'300': '#D0D9FF',
  				'400': '#BBC8FF',
  				'500': '#A1AEE9',
  				'600': '#8391CC',
  				'700': '#6876AE',
  				'800': '#505D91',
  				'900': '#3B4674',
  				'901': '#283157',
  				'902': '#181E34'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			'shadow-one': '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  			creditCard: '8px 10px 16px 0px rgba(0, 0, 0, 0.05)'
  		},
  		animation: {
  			fadeIn: 'fadeIn 1s forwards',
  			fadeOut: 'fadeOut 1s forwards',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			fadeIn: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			fadeOut: {
  				from: {
  					opacity: '1'
  				},
  				to: {
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	container: {
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '2rem',
  			xl: '2rem',
  			'2xl': '10rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
