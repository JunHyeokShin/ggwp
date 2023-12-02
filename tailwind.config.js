/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      opacity: {
        8: '0.08',
      },
      colors: {
        source: '#6750A4',
        primary: {
          light: '#6750A4',
          dark: '#D0BCFF',
          container: {
            light: '#EADDFF',
            dark: '#4F378B',
          },
          fixed: {
            light: '#EADDFF',
            dark: '#EADDFF',
            dim: {
              light: '#D0BCFF',
              dark: '#D0BCFF',
            },
          },
          0: '#000000',
          10: '#21005D',
          20: '#381E72',
          30: '#4F378B',
          40: '#6750A4',
          50: '#7F67BE',
          60: '#9A82DB',
          70: '#B69DF8',
          80: '#D0BCFF',
          90: '#EADDFF',
          95: '#F6EDFF',
          98: '#F8F9FF',
          99: '#FFFBFE',
          100: '#FFFFFF',
        },
        secondary: {
          light: '#625B71',
          dark: '#CCC2DC',
          container: {
            light: '#E8DEF8',
            dark: '#4A4458',
          },
          fixed: {
            light: '#E8DEF8',
            dark: '#E8DEF8',
            dim: {
              light: '#CCC2DC',
              dark: '#CCC2DC',
            },
          },
          0: '#000000',
          10: '#1D192B',
          20: '#332D41',
          30: '#4A4458',
          40: '#625B71',
          50: '#7A7289',
          60: '#958DA5',
          70: '#B0A7C0',
          80: '#CCC2DC',
          90: '#E8DEF8',
          95: '#F6EDFF',
          98: '#F8F9FF',
          99: '#FFFBFE',
          100: '#FFFFFF',
        },
        tertiary: {
          light: '#7D5260',
          dark: '#EFB8C8',
          container: {
            light: '#FFD8E4',
            dark: '#633B48',
          },
          fixed: {
            light: '#FFD8E4',
            dark: '#FFD8E4',
            dim: {
              light: '#EFB8C8',
              dark: '#EFB8C8',
            },
          },
          0: '#000000',
          10: '#31111D',
          20: '#492532',
          30: '#633B48',
          40: '#7D5260',
          50: '#986977',
          60: '#B58392',
          70: '#D29DAC',
          80: '#EFB8C8',
          90: '#FFD8E4',
          95: '#FFECF1',
          98: '#FFF7FD',
          99: '#FFFBFA',
          100: '#FFFFFF',
        },
        error: {
          light: '#B3261E',
          dark: '#F2B8B5',
          container: {
            light: '#F9DEDC',
            dark: '#8C1D18',
          },
          0: '#000000',
          10: '#410E0B',
          20: '#601410',
          30: '#8C1D18',
          40: '#B3261E',
          50: '#DC362E',
          60: '#E46962',
          70: '#EC928E',
          80: '#F2B8B5',
          90: '#F9DEDC',
          95: '#FCEEEE',
          98: '#FFF8F7',
          99: '#FFFBF9',
          100: '#FFFFFF',
        },
        neutral: {
          0: '#000000',
          10: '#1D1B20',
          20: '#322F35',
          30: '#48464C',
          40: '#605D64',
          50: '#79767D',
          60: '#938F96',
          70: '#AEA9B1',
          80: '#CAC5CD',
          90: '#E6E0E9',
          95: '#F5EFF7',
          98: '#FEF7FF',
          99: '#FFFBFF',
          100: '#FFFFFF',
        },
        neutralVariant: {
          0: '#000000',
          10: '#1D1A22',
          20: '#322F37',
          30: '#49454F',
          40: '#605D66',
          50: '#79747E',
          60: '#938F99',
          70: '#AEA9B4',
          80: '#CAC4D0',
          90: '#E7E0EC',
          95: '#F5EEFA',
          98: '#F8F9FF',
          99: '#FFFBFE',
          100: '#FFFFFF',
        },
        outline: {
          light: '#79747E',
          dark: '#938F99',
          variant: {
            light: '#CAC4D0',
            dark: '#49454F',
          },
        },
        background: {
          light: '#FEF7FF',
          dark: '#141218',
        },
        surface: {
          light: '#FEF7FF',
          dark: '#141218',
          variant: {
            light: '#E7E0EC',
            dark: '#49454F',
          },
          tint: {
            light: '#6750A4',
            dark: '#D0BCFF',
          },
          container: {
            highest: {
              light: '#E6E0E9',
              dark: '#36343B',
            },
            high: {
              light: '#ECE6F0',
              dark: '#2B2930',
            },
            light: '#F3EDF7',
            dark: '#211F26',
            low: {
              light: '#F7F2FA',
              dark: '#1D1B20',
            },
            lowest: {
              light: '#FFFFFF',
              dark: '#0F0D13',
            },
          },
          bright: {
            light: '#FEF7FF',
            dark: '#3B383E',
          },
          dim: {
            light: '#DED8E1',
            dark: '#141218',
          },
        },
        shadow: {
          light: '#000000',
          dark: '#000000',
        },
        scrim: {
          light: '#000000',
          dark: '#000000',
        },
        inverse: {
          surface: {
            light: '#322F35',
            dark: '#E6E0E9',
          },
          primary: {
            light: '#D0BCFF',
            dark: '#6750A4',
          },
          on: {
            surface: {
              light: '#F5EFF7',
              dark: '#322F35',
            },
          },
        },
        on: {
          primary: {
            light: '#FFFFFF',
            dark: '#381E72',
            container: {
              light: '#21005D',
              dark: '#EADDFF',
            },
            fixed: {
              light: '#21005D',
              dark: '#21005D',
              variant: {
                light: '#4F378B',
                dark: '#4F378B',
              },
            },
          },
          secondary: {
            light: '#FFFFFF',
            dark: '#332D41',
            container: {
              light: '#1D192B',
              dark: '#E8DEF8',
            },
            fixed: {
              light: '#1D192B',
              dark: '#1D192B',
              variant: {
                light: '#4A4458',
                dark: '#4A4458',
              },
            },
          },
          tertiary: {
            light: '#FFFFFF',
            dark: '#492532',
            container: {
              light: '#31111D',
              dark: '#FFD8E4',
            },
            fixed: {
              light: '#31111D',
              dark: '#31111D',
              variant: {
                light: '#633B48',
                dark: '#633B48',
              },
            },
          },
          error: {
            light: '#FFFFFF',
            dark: '#601410',
            container: {
              light: '#410E0B',
              dark: '#F9DEDC',
            },
          },
          background: {
            light: '#1D1B20',
            dark: '#E6E0E9',
          },
          surface: {
            light: '#1D1B20',
            dark: '#E6E0E9',
            variant: {
              light: '#49454F',
              dark: '#CAC4D0',
            },
          },
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
  // darkMode: 'class',
}
