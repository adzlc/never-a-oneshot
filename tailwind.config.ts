import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";
export default withUt({
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx,mdx}"],
	theme: {
		extend: {
			lineClamp: {
				8: '8',
			},
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				secondarybackground: 'hsl(var(--secondary-background))',
				skeleton: 'hsl(var(--skeleton))',
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
				primarymuted: {
					DEFAULT: 'hsl(var(--primary-muted))',
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
				},
				'steelBlue': {
					'50': '#f5f7fa',
					'100': '#e9eef5',
					'200': '#cfdce8',
					'300': '#a4bed5',
					'400': '#739bbd',
					'500': '#5584ac',
					'600': '#3e668b',
					'700': '#335271',
					'800': '#2e465e',
					'900': '#2a3c50',
					'950': '#1c2735',
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}) satisfies Config;
