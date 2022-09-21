/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['inter', 'sans-serif']
    },
    extend: {
      gridTemplateColumns: {
        'games-grid': 'repeat(auto-fill, minmax(281px, 1fr))',
        'copy-discord': '1fr 30px'
      },
      backgroundImage: {
        galaxy: "url('/background_galaxy.png')",
        'arrow-gradient-right': 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9612219887955182) 65%)',
        'arrow-gradient-left': 'linear-gradient(90deg, rgba(0,0,0,0.9612219887955182) 35%, rgba(0,0,0,0) 100%)',
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        'game-banner-gradient': 'linear-gradient(0deg, rgba(0,0,0,0.8099614845938375) 56%, rgba(0,0,0,0) 100%)'
      },
    },
  },
  plugins: [],
}
