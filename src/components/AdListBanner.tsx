

import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { GameController } from 'phosphor-react';

export const AdListBanner = (props :any) => {
    return (
        <div key={props.announcement.t_id} className="w-full h-auto px-4 bg-[#2A2634] rounded">
            <div className="flex flex-col py-3">
                <label className="font-light text-start text-sm">Nome</label>
                <span className="font-semibold">{props.announcement.t_name}</span>
            </div>
            <div className="flex flex-col py-3">
                <label className="font-light text-start text-sm">Tempo de jogo</label>
                <span className="font-semibold">{props.announcement.t_yearsPlaying} {props.announcement.t_yearsPlaying === 1 ? 'ano' : 'anos'}</span>
            </div>
            <div className="flex flex-col py-3">
                <label className="font-light text-start text-sm">Quais os dias que costuma jogar</label>
                <ToggleGroup.Root type='multiple' aria-readonly className='grid grid-cols-7 mt-2 gap-3'>
                    <ToggleGroup.Item
                        value='0'
                        className={`w-7 h-7 rounded ${props.announcement.weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title='Domingo'
                    >
                        D
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                        value='1'
                        className={`w-7 h-7 rounded ${props.announcement.weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title='Segunda-Feira'
                    >
                        S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                        value='2'
                        className={`w-7 h-7 rounded ${props.announcement.weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title='Terça-Feira'
                    >
                        T
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                        value='3'
                        className={`w-7 h-7 rounded ${props.announcement.weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title='Quarta-Feira'
                    >
                        Q
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                        value='4'
                        className={`w-7 h-7 rounded ${props.announcement.weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title='Quinta-Feira'
                    >
                        Q
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                        value='5'
                        className={`w-7 h-7 rounded ${props.announcement.weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title='Sexta-Feira'
                    >
                        S
                    </ToggleGroup.Item >
                    <ToggleGroup.Item
                        value='6'
                        className={`w-7 h-7 rounded  ${props.announcement.weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                        title='Sabado'
                    >
                        S
                    </ToggleGroup.Item >
                </ToggleGroup.Root>

            </div>
            <div className="flex flex-col py-3">
                <label className="font-light text-start text-sm">Em que horario costuma jogar</label>
                <span className="font-semibold">{props.announcement.hourStart}h até {props.announcement.hourEnd}h</span>
            </div>
            <div className="flex flex-col py-3">
                <label className="font-light text-start text-sm">Usa chat de voz?</label>
                <span className={`font-semibold ${props.announcement.t_useVoiceChannel ? 'text-emerald-400' : 'text-red-500'}`}>{props.announcement.t_useVoiceChannel ? 'Sim' : 'Não'}</span>
            </div>
            <button onClick={props.click} className='bg-violet-500 justify-center mb-3 h-12 w-full rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'><GameController size={24}/> Encontrar duo</button>
        </div>
    )
}