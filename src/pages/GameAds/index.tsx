import { useParams } from "react-router-dom"

function GameAds() {
    let { id } = useParams()
    const game = JSON.parse(window.sessionStorage.getItem("games")!).filter((el :any) => {
        return el.id === Number(id)
    } )
    return (
        <div className="flex flex-col justify-center items-center text-white">
            <h1>Dados do jogo</h1>
            <h2>{game[0].title}</h2>
            <img src={game[0].bannerUrl}></img>
        </div>
    )
}

export default GameAds