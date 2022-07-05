import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        brandon: ['Brandon'],
        brandonlight: ['BrandonLight'],
        anek: 'Anek'
      },
      colors: {
        stake: {
          100: '#f48c8a'
        },
        accent: {
          500: '#76efd3'
        },
        primary: {
          400: '#1D2147',
          500: '#070c38',
          600: '#0b1342'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('windicss/plugin/forms'),
    require('@windicss/plugin-heropatterns')({
      // the list of patterns you want to generate a class for
      // the names must be in kebab-case
      // an empty array will generate all 87 patterns
      // patterns: ['polka-dots', 'signal',"i-like-food" ,"four-point-stars"],
      patterns: [],

      // The foreground colors of the pattern
      colors: {
        default: '#76efd3',
        'blue-dark': '#000044' // also works with rgb(0,0,205)
      },

      // The foreground opacity
      opacity: {
        default: '0.1',
        100: '1.0'
      }
    })
  ]
})
