import './styles/main.css'
import { useState, useEffect } from 'react'
import logoImg from './assets/logo_nlw.svg'
import { GameBanner } from './components/GameBanner'
import { AdBanner } from './components/AdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import  Axios  from 'axios'

import { AdModal } from './components/AdModal'


interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://rawg-video-games-database.p.rapidapi.com/games',
      headers: {
        'X-RapidAPI-Key': 'eb23abdb51msh2079a43f518c785p1acb5cjsndf049ad3f10b',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      },
      params: {
        key: process.env.API_KEY,
        page_size: 10,
        page: 3,
      }
    };

    Axios.request(options).then(function (response: { data: any }) {
      console.log(response.data);
    }).catch(function (error: any) {
      console.error(error);
    });
    fetch('http://localhost:3333/games').then(response => response.json()).then(data => {
      setGames(data)
    })
  }, [])
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg}></img>

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
          )
        })}
      </div>
        <Dialog.Root >
          <AdBanner />
          <AdModal />
        </Dialog.Root>
      
    </div>
  )
}

export default App
