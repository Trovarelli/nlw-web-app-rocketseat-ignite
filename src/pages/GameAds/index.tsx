import * as Dialog from '@radix-ui/react-dialog'
import { ArrowBendUpLeft } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { AdBanner } from '../../components/AdBanner';
import { AdListBanner } from '../../components/AdListBanner';
import { AdModal } from '../../components/AdModal';
import { DiscordModal } from '../../components/DiscordModal';
import { loadGames } from '../../utils/load-games';
interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
        ads: number
    },
    ads: []
}

function GameAds() {
    const navigate = useNavigate()
    const [allGames, setAllGames] = useState<Game[]>(JSON.parse(window.sessionStorage.getItem("games")!))
    const { innerWidth } = window
    const quantityAd = innerWidth > 1700 ? 10 : 8
    const ref = useRef<HTMLButtonElement>(null);
    const [discord, setDiscord] = useState('')
    const [openModal, setOpenModal] = useState!(false)
    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]);
    const [page, setPage] = useState(0);
    const [adsPerPage] = useState(quantityAd);
    const noMoreAds = page + adsPerPage >= allAds.length;
    const { id } = useParams()
    const [searchValue, setSearchValue] = useState("");
    const [game, setGame] = useState(JSON.parse(window.sessionStorage.getItem("games")!).filter((el: any) => {
        return el.id === Number(id)
    }))
    const filteredAdS = !!searchValue
        ? ads.filter((ad: { t_name: string; }) => {
            return ad.t_name.toLowerCase().includes(searchValue.toLowerCase());
        })
        : ads;

    const handleChange = (event: { target: { value: string; }; }) => {
        const { value } = event.target;

        setSearchValue(value);
    };

    const handleLoadAds = useCallback(() => {
        const gameFilter = JSON.parse(window.sessionStorage.getItem("games")!).filter((el: any) => {
            return el.id === Number(id)
        })
        setGame(gameFilter)
    }, []);

    useEffect(() => {
        setAllAds(() => game[0].ads);
        setAds(() => game[0].ads.slice(page, adsPerPage));
    }, [game])

    const handleUpdateGames = () => {
        console.log('CALL 1')
        handleLoadGames(1, 20)
    }

    const handleLoadGames = async (page: number, gamesPerPage: number) => {
        await loadGames(page, gamesPerPage).then(() => {
            setAllGames(JSON.parse(window.sessionStorage.getItem("games")!))
            handleLoadAds()
        })
    }

    useEffect(() => {
        handleLoadAds();
    }, [handleLoadAds, adsPerPage, allGames]);

    const loadMoreAds = () => {
        const nextPage = page + adsPerPage;
        const nextPosts = allAds.slice(nextPage, nextPage + adsPerPage);
        ads.push(...nextPosts);
        setAds(ads);
        setPage(nextPage);
        setTimeout(() => {
            ref.current?.scrollIntoView({ block: "end", behavior: "smooth" });
        }, 200);
    };

    const handleLetsPlay = (discordProp: any) => {
        if (openModal === false) {
            setDiscord(discordProp.target.id)
        }
        setOpenModal(!openModal)
    }

    return (
        <>
            <Dialog.Root open={openModal}>
                <DiscordModal click={handleLetsPlay} discord={discord} />
            </Dialog.Root>
            <div className="flex flex-col justify-center items-center text-white mt-8">
                <div onClick={() => navigate(-1)} className='d-flex justify-start w-full'>
                    <div className='px-3 mb-5 ml-5 rounded-md py-1 cursor-pointer  flex items-center w-24'><ArrowBendUpLeft size={20} weight="bold" /><span className='ml-1 font-normal text-sm'>Voltar</span></div>
                </div>
                <div className='grid grid-cols-2 gap-4 w-[90vw]'>
                    <div className='relative'>
                        <img className="w-full object-none h-80 rounded-lg" src={game[0].bannerUrl} />
                        <div className='w-full rounded-b-lg text-center pt-16 pb-4 px-4 bg-game-banner-gradient absolute bottom-0 left-1/2 transform -translate-x-1/2 '>
                            <strong className='font bold text-white block text-4xl'>{game[0].title}</strong>
                        </div>
                    </div>
                    <div className='p-4 bg-[#2A2634] rounded-lg'>
                        {ads.length > 0  ? <div className={`h-full flex flex-col justify-between`}>
                            <span className='text-3xl text-center'>Quer encontrar algum conhecido?</span>
                            <span className='text-center'>Digite o nome da pessoa e uma lista de anúncios criadas por ela irá aparecer :)</span>
                            <div className='flex flex-col'>
                                <label className='font-semibold text-start'>Nome:</label>
                                <input
                                    className="bg-zinc-900 py-3 px-4 text-lg rounded p-3 placeholder:text-zinc-500"
                                    type="search"
                                    onChange={handleChange}
                                    value={searchValue}
                                    placeholder="Digite para encontrar!"
                                />
                            </div>
                        </div> : <div className='flex h-full justify-center items-center text-9xl'>:(</div>}
                        
                    </div>
                </div>
            </div>
            <div className="mt-8 text-white flex flex-col justify-center items-center">
                <div className={`w-[90%] text-2xl ${ads.length > 0 ? '' : 'opacity-0'}`}>
                    Hora de escolher seu duo!
                </div>
                {ads.length > 0 ? <div className={`mt-6 w-[90%] ${filteredAdS.length > 0 ? 'grid grid-cols-games-grid gap-8' : 'text-center'}`}>
                    {filteredAdS.length > 0 ? filteredAdS.map((ad: any) => {
                        return (<AdListBanner announcement={ad} click={handleLetsPlay} key={ad.t_id} />)
                    }) : <div className="mt-5 text-3xl font-semibold">Não foi encontrado nenhum anúncio criado por esta pessoa :(</div>}
                </div> : <div className="mt-5 text-3xl font-semibold">Infelizmente este jogo não possui anúncios ainda :(</div>}

                <button ref={ref} onClick={loadMoreAds} className={`mt-8 p-3 rounded bg-violet-500 hover:bg-violet-600 w-[90%] ${noMoreAds ? 'opacity-0' : ''}`}>Carregar mais anúncios</button>
                <div className='flex justify-center mb-5'>
                    <Dialog.Root>
                        <AdBanner customClass={'w-[90vw]'} />
                        <AdModal games={allGames} callBackParent={handleUpdateGames} specifyGame={game} />
                    </Dialog.Root>
                </div>
            </div>
        </>
    )
}

export default GameAds