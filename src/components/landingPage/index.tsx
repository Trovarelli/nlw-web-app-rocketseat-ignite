
import { useState, useEffect } from 'react'
import logoImg from './assets/logo_nlw.svg'
import { GameBanner } from '../GameBanner'
import { AdBanner } from '../AdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { loadGames } from '../../utils/load-games'
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import {responsiveCarousel} from '../../utils/responsiveCarousel'
import "keen-slider/keen-slider.min.css"

import { AdModal } from '../AdModal'
import { CaretDoubleLeft, CaretDoubleRight, MagnifyingGlassPlus } from 'phosphor-react'


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

function LandingPage() {
  const [games, setGames] = useState<Game[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "free-snap",
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: responsiveCarousel(),
      spacing: 15,
    },

  }, [MutationPlugin])
  
  const handleLoadGames = async (page: number, gamesPerPage: number) => {
    const gamesAndAds = await loadGames(page, gamesPerPage);
    setGames(gamesAndAds)
  };

  useEffect(() => {
    handleLoadGames(1, 10)
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg}></img>

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div ref={ref} className='keen-slider mt-16 relative'>

        {games.map((game, index) => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} className={`keen-slider__slide number-slide${index + 1} cursor-pointer`} />
          )
        })}
        <div className='bg-[#2A2634] flex flex-col justify-center items-center rounded-lg overflow-hidden keen-slider__slide number-slide41 cursor-pointer'>
          <MagnifyingGlassPlus color='white' size={100} />

          <strong className='font bold text-white block'>Não encontrou seu jogo?</strong>
          <span className='text-zinc-300 text-sm block mt-1 '>clique aqui e encontre!</span>
        </div>
        {loaded && instanceRef.current && (
          <>
            <div onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
              className={`transition ease-in-out delay-200 text-white cursor-pointer ${currentSlide !== 0 ? 'opacity-1' : 'opacity-0'} absolute flex justify-center items-center px-3 w-30 bg-arrow-gradient-left h-[100%] top-1/2 right-[94%]  transform -translate-x-1/2 -translate-y-1/2`}>
              <CaretDoubleLeft size={32} weight="bold" />
            </div>
              <div onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
                className={`transition ease-in-out delay-200 text-white cursor-pointer ${currentSlide !== instanceRef.current.track.details.slides.length - responsiveCarousel() ? 'opacity-1' : 'opacity-0'} absolute flex justify-center items-center px-3 w-30 bg-arrow-gradient-right h-[100%] top-1/2 left-[98%]  transform -translate-x-1/2 -translate-y-1/2`}>
                <CaretDoubleRight size={32} weight="bold" />
              </div>
          </>
        )}


      </div>

      <Dialog.Root>
        <AdBanner />
        <AdModal />
      </Dialog.Root>

    </div>
  )
}

export default LandingPage
