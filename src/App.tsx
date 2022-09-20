import './styles/main.css'
import { useState, useEffect} from 'react'
import logoImg from './assets/logo_nlw.svg'
import { GameBanner } from './components/GameBanner'
import { AdBanner } from './components/AdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { loadGames } from './utils/load-games'
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

import { AdModal } from './components/AdModal'
import { MagnifyingGlassMinus, MagnifyingGlassPlus } from 'phosphor-react'


interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    console.log(mutations)
    mutations.forEach(function (mutation) {
      slider.update()
    })
  })

  
  const config = { childList: true }

  slider.on("created", () => {
    observer.observe(slider.container, config)
  })
  slider.on("destroyed", () => {
    observer.disconnect()
  })
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "free-snap",
    slides: {
      perView: 5,
      spacing: 15,
    },
    
  }, [MutationPlugin])
  

  const handleLoadGames = async (page:number, gamesPerPage:number) => {
    const gamesAndAds = await loadGames(page, gamesPerPage);
    setGames(gamesAndAds)
  };

  useEffect(() => {
    handleLoadGames(1, 40)
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg}></img>

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div ref={ref} className='keen-slider mt-16'>
     
        {games.map((game, index) => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} className={`keen-slider__slide number-slide${index+1} cursor-pointer`}/>
          )
        })}
        <div className='bg-[#2A2634] flex flex-col justify-center items-center rounded-lg overflow-hidden keen-slider__slide number-slide41 cursor-pointer'>
          <MagnifyingGlassPlus color='white' size={100}/>
        
          <strong className='font bold text-white block'>Não encontrou seu jogo?</strong>
          <span className='text-zinc-300 text-sm block mt-1 '>clique aqui e encontre!</span>
        </div>
        
      </div>
        <Dialog.Root >
          <AdBanner />
          <AdModal />
        </Dialog.Root>
      
    </div>
  )
}

export default App
