import  Axios  from "axios"
export async function handleCreatedAd(event: any) {
    const weekDays = JSON.parse(window.sessionStorage.getItem("weekDays")!)
    const useVoiceChannel = JSON.parse(window.sessionStorage.getItem("useVoiceChannel")!)
    const data = event
    if(!data.name) return
    // console.log({
    //     gameId: Number(data.game),
    //         name: data.name,
    //         yearsPlaying: Number(data.yearsPlaying),
    //         discord: data.discord,
    //         weekDays: weekDays.map(Number),
    //         hourStart: data.hourStart,
    //         hourEnd: data.hourEnd,
    //         useVoiceChannel: useVoiceChannel
    // })
    try {
       await Axios.post(`https://aps-api-nlw.herokuapp.com/api/anun/postAnuns`, {
            gameId: Number(data.game),
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
        })
        alert('cadastro realizado com sucesso')
    } catch(err) {
        alert(err)
    }
} 