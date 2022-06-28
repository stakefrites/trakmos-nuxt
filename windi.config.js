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
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('windicss/plugin/forms'),]
})
