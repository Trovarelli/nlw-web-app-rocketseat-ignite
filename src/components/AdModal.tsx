import { Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useState, useEffect} from 'react'
import { handleCreatedAd } from '../utils/createAdd'
import { useForm } from 'react-hook-form'

export function AdModal(props: any) {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  const weekValidation = () => {
    console.log(weekDays.length !== 0 )
    return weekDays.length !== 0 
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = (data: any) => {
   
    setLoading(true)
    handleCreatedAd(data).then(() => {
      props.callBackParent()
      resetFrom()
      setLoading(false)
    })
   
  }
  const resetFrom = () => {
    setWeekDays([])
    reset({
      name: '',
      game: '',
      yearsPlaying: '',
      discord: '',
      hourStart: '',
      hourEnd: '',
    })
  }
  
  useEffect(() => {
    window.sessionStorage.setItem("weekDays", JSON.stringify(weekDays))
    if(weekValidation()) {
      delete errors.weekDays
    }
    console.log(errors)
  }, [weekDays])

  useEffect(() => {
    window.sessionStorage.setItem("useVoiceChannel", JSON.stringify(useVoiceChannel))
  }, [useVoiceChannel])
  
  if (props !== undefined && props.games !== null) {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[490px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-start' htmlFor='game'>Qual o game?</label>
                <select defaultValue={props.specifyGame === undefined ? 'Selecione o game que deseja jogar' : props.specifyGame[0].id } id='game' {...register("game", {required: true})} className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
                  {props.specifyGame === undefined ? <option disabled hidden>Selecione o game que deseja jogar</option> : ''}
                  
                  {props.specifyGame === undefined ? props.games.map((game: any) => {
                    return (
                      <option key={game.id}  value={game.id}>{game.title}</option>
                    )
                  }) : <option value={props.specifyGame[0].id}>{props.specifyGame[0].title}</option>}
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-start' htmlFor='name'>Seu nome (ou nickname)</label>
                <input className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' id='name' placeholder='Como te chamam dentro do game?' {...register("name", { required: true })} />
                {errors?.name?.type === "required" && <p className='text-red-500'>Campo Obrigatório</p>}
              </div>
              <div className='grid gris-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-start' htmlFor='yearsPlaying'>Joga a quantos anos?</label>
                  <input className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' id='yearsPlaying' {...register("yearsPlaying", { required: true })} type='number' placeholder='Tudo bem ser ZERO' />
                  {errors?.yearsPlaying?.type === "required" && <p className='text-red-500'>Campo Obrigatório</p>}
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-start' htmlFor='discord'>Qual seu Discord?</label>
                  <input className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' id='discord' {...register("discord", { required: true })} placeholder='usuário#000' />
                  {errors?.discord?.type === "required" && <p className='text-red-500'>Campo Obrigatório</p>}
                </div>
              </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold text-start' htmlFor='weekDays'>Quando costuma jogar?</label>
                  <ToggleGroup.Root type='multiple' {...register("weekDays", { validate: weekValidation })} className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} value={weekDays}>
                    <ToggleGroup.Item
                      value='0'
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      title='Domingo'
                    >
                      D
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                      value='1'
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      title='Segunda-Feira'
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value='2'
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      title='Terça-Feira'
                    >
                      T
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                      value='3'
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      title='Quarta-Feira'
                    >
                      Q
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                      value='4'
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      title='Quinta-Feira'
                    >
                      Q
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                      value='5'
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      title='Sexta-Feira'
                    >
                      S
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                      value='6'
                      className={`w-8 h-8 rounded  ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                      title='Sabado'
                    >
                      S
                    </ToggleGroup.Item >
                  </ToggleGroup.Root>
                  {errors.weekDays && errors?.weekDays?.type === 'validate' && <p className='text-red-500'>Campo Obrigatório</p>}
                </div>
               
                <div className='flex flex-col gap-2 flex-1'>
                  <label className='font-semibold text-start' htmlFor='hourStart'>Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <input className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' id='hourStart'  type='time' placeholder='De' {...register("hourStart", { required: true })} />
                    <input className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' id='hourEnd'  type='time' placeholder='Até' {...register("hourEnd", { required: true })} />
                  </div>
                  {(errors?.hourStart?.type === "required" || errors?.hourEnd?.type === "required") && <p className='text-red-500'>Campo Obrigatório</p>}
                </div>
              </div>
              <label className='mt-2 flex items-center gap-2 text-sm'>
                <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900' checked={useVoiceChannel} onCheckedChange={(checked) => {
                  if (checked === true) setUseVoiceChannel(true)
                  else setUseVoiceChannel(false)
                }}>
                  <Checkbox.Indicator>
                    <Check className='w-4 h-4 text-emerald-400' />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close disabled={loading} onClick={() => resetFrom()} className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                  Cancelar
                </Dialog.Close>
                <button disabled={loading} className='bg-violet-500 w-48 px-5 h-12 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-violet-600' type='submit'>
                  
                  {loading ? <div role="status">
                    <svg aria-hidden="true" className="mr-2 w-6 h-6 text-white animate-spin fill-violet-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div> : <div className='flex items-center'><GameController size={24} className="mr-2" /> 
                          Encontrar duo</div>}
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    )
  } else {
    return (<div><h1>Loading</h1></div>)
  }
}
