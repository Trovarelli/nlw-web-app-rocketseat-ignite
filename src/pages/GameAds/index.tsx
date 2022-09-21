import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import { AdListBanner } from '../../components/AdListBanner';
import { DiscordModal } from '../../components/DiscordModal';

function GameAds() {
    const ref = useRef<HTMLButtonElement>(null);
    const [openModal, setOpenModal] = useState!(false)
    const [ads, setAds] = useState([]);
    const [allAds, setAllAds] = useState([]);
    const [page, setPage] = useState(0);
    const [adsPerPage] = useState(8);
    const noMoreAds = page + adsPerPage >= allAds.length;
    const { id } = useParams()
    const game = JSON.parse(window.sessionStorage.getItem("games")!).filter((el: any) => {
        return el.id === Number(id)
    })

    const handleLoadAds = useCallback(async (page: any, adsPerPage: any) => {
        setAds(game[0].ads.slice(page, adsPerPage));
        setAllAds(game[0].ads);
    }, []);

    useEffect(() => {
        handleLoadAds(0, adsPerPage);
    }, [handleLoadAds, adsPerPage]);

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

    const handleLetsPlay = () =>{
        setOpenModal(!openModal)
    }
    return (
        <>
            <Dialog.Root open={openModal}>
                <DiscordModal click={handleLetsPlay}/>
            </Dialog.Root>
            <div className="relative flex flex-col justify-center items-center text-white mt-8">
                <img className="object-none h-72 w-[90vw] rounded-lg" src={game[0].bannerUrl} />
                <div className='w-[90vw] rounded-b-lg text-center pt-16 pb-4 px-4 bg-game-banner-gradient absolute bottom-0 left-1/2 transform -translate-x-1/2 '>
                    <strong className='font bold text-white block text-4xl'>{game[0].title}</strong>
                </div>

            </div>
            <div className="mt-8 text-white flex flex-col justify-center items-center">
                <div className={`w-[90%] text-2xl ${ads.length > 0 ? '' : 'opacity-0'}`}>Hora de escolher seu duo!</div>
                {ads.length > 0 ? <div className="mt-6 w-[90%] grid grid-cols-games-grid gap-8">
                    {ads.map((ad: any) => {
                        return (<AdListBanner announcement={ad} click={handleLetsPlay} key={ad.t_id} />)
                    })}
                </div> : <div className="mt-5 text-3xl font-semibold">Desculpe mas este jogo não possui anúncios ainda :(</div>}
                <button ref={ref} onClick={loadMoreAds} className={`my-6 p-3 rounded bg-violet-500 hover:bg-violet-600 w-[90%] ${noMoreAds ? 'opacity-0' : ''}`}>Carregar mais anúncios</button>
            </div>
        </>
    )
}

export default GameAds