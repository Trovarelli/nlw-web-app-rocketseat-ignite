import { Check, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useState, useEffect, FormEvent } from 'react'
import { handleCreatedAd } from '../utils/createAdd'
import { useForm, useFormState } from 'react-hook-form'


// import * as Select from '@radix-ui/react-select'

export function AdModal(props: any) {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)
  const [weekDaysValidation, setWeekDaysValidation] = useState<boolean>(false)

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = (data: any) => {
   if(watch(weekDays).length === 0) {
    console.log(useForm())
    setWeekDaysValidation(true)
   } else {
    handleCreatedAd(data).then(() => {
      props.callBackParent()
      resetFrom()
    })
   }
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
    setWeekDaysValidation(false)
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
                <select id='game' {...register("game", { required: true })} className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
                  <option disabled defaultValue="">Selecione o game que deseja jogar</option>
                  {props.games.map((game: any) => {
                    return (
                      <option key={game.id} value={game.id}>{game.title}</option>
                    )
                  })}
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
                  <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} value={weekDays}>
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
                  {weekDaysValidation && <p className='text-red-500'>Campo Obrigatório</p>}
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
                <Dialog.Close onClick={() => resetFrom()} className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                  Cancelar
                </Dialog.Close>
                <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'><GameController size={24} /> Encontrar duo</button>
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
