import  Axios  from "axios"
import { FormEvent } from "react"

export async function handleCreatedAd(event: FormEvent) {
    event.preventDefault()
    const weekDays = JSON.parse(window.sessionStorage.getItem("weekDays")!)
    const useVoiceChannel = JSON.parse(window.sessionStorage.getItem("useVoiceChannel")!)
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if(!data.name) return

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