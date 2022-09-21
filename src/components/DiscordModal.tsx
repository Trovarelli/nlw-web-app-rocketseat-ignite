import * as Dialog from '@radix-ui/react-dialog'
import { CheckCircle, XCircle } from 'phosphor-react';
export const DiscordModal = (props: any) => {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[490px] shadow-lg shadow-black/25'>
                    <XCircle size={40} className="cursor-pointer -translate-x-6 -translate-y-4" weight="bold" onClick={props.click} />
                    <Dialog.Title className='text-3xl font-black flex flex-col justify-center items-center'>
                        <CheckCircle size={70} className='text-emerald-400 mb-8' weight="bold" />
                        Let's Play ?
                    </Dialog.Title>
                    <div className=' font-thin'>Agora é só começar a jogar!</div>
                    <div className='font-semibold mt-6'>Adicione no Discord</div>
                    <div className="mt-3 bg-zinc-900 py-3 text-xl text-center">exemplo#555</div>
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    )
}