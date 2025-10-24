/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class', 'class'],
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				brand: {
					primary: 'var(--brand-primary)',
					'primary-light': 'var(--brand-primary-light)',
					'primary-dark': 'var(--brand-primary-dark)',
					secondary: 'var(--brand-secondary)'
				},
				content: {
					primary: 'var(--content-primary)',
					secondary: 'var(--content-secondary)',
					tertiary: 'var(--content-tertiary)',
					light: 'var(--content-light)',
					inverse: 'var(--content-inverse)'
				},
				background: {
					DEFAULT: "var(--background-purple)",
					"fixed-white": "var(--background-fixed-white)",
					field: "var(--background-field)",
					yellow: "var(--background-yellow)",
					purple: "var(--background-purple)",
					"purple-light": "var(--background-purple-light)",
				},
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
			fontFamily: {
				general: [
					'General Sans',
					'ui-sans-serif',
					'system-ui'
				],
				poppins: [
					'Poppins',
					'ui-sans-serif',
					'system-ui'
				]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
}
