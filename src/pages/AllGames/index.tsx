
import { ArrowBendUpLeft } from "phosphor-react";
import { Key, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { GameBanner } from '../../components/GameBanner';
import { loadGames } from "../../utils/load-games";

function AllGames() {
    const ref = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState(false)
    const apiPage = Number(window.sessionStorage.getItem('page'))
    const [games, setGames] = useState([]);
    const [allGames, setAllGames] = useState(JSON.parse(window.sessionStorage.getItem("games")!));
    const [page, setPage] = useState(0);
    const [gamesPerPage, setGamesPerPage] = useState(20);

    useEffect(() => {
        setGames(allGames.slice(page, gamesPerPage));
    }, [allGames]);


    const loadMoreGames = async () => {
        const gamesStore = JSON.parse(window.sessionStorage.getItem("games")!)
        if (gamesStore.length >= gamesPerPage) {
            setPage(page + 1)
            setGamesPerPage(gamesPerPage + 20)
            setLoading(true)
            await loadGames(apiPage + 1, 20).then(() => {
                setAllGames(gamesStore)
                setTimeout(() => {
                    ref.current?.scrollIntoView({ block: "end", behavior: "smooth" });
                    setLoading(false)
                }, 200);
            })
        } else {
            setPage(page + 1)
            setGamesPerPage(gamesPerPage + 20)
        }

    };
    return (
        <div className="flex flex-col justify-center items-center">
            <Link className='d-flex justify-start w-full mt-5' to={"/"}>
                <div className='px-3 text-white ml-5 rounded-md py-1 cursor-pointer  flex items-center w-24'><ArrowBendUpLeft size={20} weight="bold" /><span className='ml-1 font-normal text-sm'>Voltar</span></div>
            </Link>
            <div className="mt-8 text-white flex flex-col justify-center items-center">
                <div className={`w-[90%] text-2xl ${games.length > 0 ? '' : 'opacity-0'}`}>
                    Aqui você pode encontrar seu jogo favorito!
                </div>
                <div className="mt-6 w-[90%] grid grid-cols-games-grid gap-8">
                    {games.map((game: { id: Key | null | undefined; bannerUrl: any; title: any; _count: { ads: any; }; }, index: number) => {
                        return (
                            <Link to={`/game/${game.id}`} key={game.id}>
                                <GameBanner bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} className={`cursor-pointer h-48`} />
                            </Link>
                        )
                    })}
                </div>

            </div>
            <button ref={ref} onClick={loadMoreGames} className={`my-8 p-3 rounded flex justify-center items-center bg-violet-500 hover:bg-violet-600 w-[90%] text-white font-bold`}>
                {loading ? <div role="status">
                    <svg aria-hidden="true" className="mr-2 w-6 h-6 text-white animate-spin fill-violet-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div> : 'Carregar mais anúncios'}
            </button>
        </div>
    )
}

export default AllGames