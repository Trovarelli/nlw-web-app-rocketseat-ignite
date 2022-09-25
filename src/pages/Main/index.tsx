
import '../../styles/main.css'
import { useState, useEffect, useCallback } from 'react'
import logoImg from '../../assets/logo_nlw.svg'
import { GameBanner } from '../../components/GameBanner'
import { AdBanner } from '../../components/AdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { loadGames } from '../../utils/load-games'
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import { responsiveCarousel } from '../../utils/responsiveCarousel'
import { Link } from "react-router-dom"
import "keen-slider/keen-slider.min.css"

import { AdModal } from '../../components/AdModal'
import { CaretDoubleLeft, CaretDoubleRight, MagnifyingGlassPlus } from 'phosphor-react'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  },
  ads: []
}

const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
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

function Main() {
  const gamesLoading = [1, 2, 3, 4]
  const [games, setGames] = useState<Game[]>([])
  const [allGames, setAllGames] = useState<Game[]>(JSON.parse(window.sessionStorage.getItem("games")!))
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

  const handleUpdateGames = () => {
    handleLoadGames(1, 20)
  }

  const handleLoadGames = async (page: number, gamesPerPage: number) => {
    await loadGames(page, gamesPerPage).then(() => {
      setAllGames(JSON.parse(window.sessionStorage.getItem("games")!))
    })
    
  };

  useEffect(() => {
    if (allGames !== null) {
      setGames(allGames.slice(0, 10))
    } else handleLoadGames(1, 20)
  }, [allGames])

  const showArrow = () => {
    if(loaded) {
      if(currentSlide !==0) {
        if( instanceRef.current !== null) {
          if(currentSlide !== instanceRef.current.track.details.slides.length - responsiveCarousel()) return true
          else return false
        }
      } else return true
    } return false
  }

  if (games[0] !== undefined) {
    return (
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImg}></img>

        <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

        <div ref={ref} className='keen-slider mt-16 relative'>

          {games.map((game, index) => {
            return (
              <Link to={`game/${game.id}`} key={game.id}>
                <GameBanner bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} className={`keen-slider__slide number-slide${game.id}  cursor-pointer`} />
              </Link>
            )
          })}
          <Link to={'allGames'}> 
          <div className='bg-[#2A2634] flex flex-col justify-center items-center rounded-lg overflow-hidden keen-slider__slide number-slide41 cursor-pointer'>
            <MagnifyingGlassPlus color='white' size={100} />

            <strong className='font bold text-white block'>Não encontrou seu jogo?</strong>
            <span className='text-zinc-300 text-sm block mt-1 '>clique aqui e encontre!</span>
          </div>
          </Link>
          {loaded && instanceRef.current && (
            <>
              <div onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
                className={`transition ease-in-out delay-200 text-white cursor-pointer ${currentSlide !== 0 ? '' : 'opacity-0'} absolute flex justify-center items-center px-3 w-30 bg-arrow-gradient-left h-[100%] top-1/2 right-[94%]  transform -translate-x-1/2 -translate-y-1/2`}>
                <CaretDoubleLeft size={32} weight="bold" />
              </div>
              <div onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
                className={`transition ease-in-out delay-200 text-white cursor-pointer ${showArrow() ? '' : 'opacity-0'} absolute flex justify-center items-center px-3 w-30 bg-arrow-gradient-right h-[100%] top-1/2 left-[98%]  transform -translate-x-1/2 -translate-y-1/2`}>
                <CaretDoubleRight size={32} weight="bold" />
              </div>
            </>
          )}
        </div>

        <Dialog.Root>
          <AdBanner />
          <AdModal games={allGames} callBackParent={handleUpdateGames} />
        </Dialog.Root>

      </div>
    )
  } else {
    return (
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={logoImg}></img>

        <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>
        <div ref={ref} className='keen-slider mt-16 relative'>
          {
            gamesLoading.map((el, index) => {
              return (
                <div role="status" key={index} className={`keen-slider__slide number-slide${index + 1} p-4 max-w-sm rounded shadow animate-pulse md:p-6 dark:border-gray-700`}>
                  <div className="flex justify-center items-center mb-4 h-56 bg-violet-900 rounded">
                    <svg className="w-12 h-12 text-violet-400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    <div className='w-full absolute bottom-0 left-0 right-0 px-12 pb-12'>
                      <div className="h-2.5 bg-violet-400 rounded-full w-48 mb-4"></div>
                      <div className="h-2 bg-violet-400 rounded-full mb-2.5"></div>
                    </div>
                  </div>

                </div>
              )
            })
          }
        </div>
        {/* <Dialog.Root>
          <AdBanner />
          <AdModal />
        </Dialog.Root> */}
      </div>
    )
  }

}

export default Main
