import { GoAlertFill } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

export const ConfirmDeletion = ({
    close,
    question,
    description,
    onDelete
}: { close: () => void; question: string; description: string; onDelete: () => void }) => {
    return (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm overflow-hidden z-80">
            <div className="h-full w-full overflow-y-auto">
                <div className="min-h-full min-w-full flex justify-center items-center">
                    <div className="min-h-50 m-3 px-8 flex flex-col justify-center items-center gap-2 absolute  bg-white dark:bg-[#161a21] p-4 rounded-md shadow-md">
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                            onClick={close}
                        >
                            <IoCloseOutline className="text-lg" />
                        </button><GoAlertFill className="text-6xl text-orange-500" />
                        <h3 className="text-center">{question}</h3>
                        <p className="text-center font-light">{description}</p>
                        <div className="flex gap-3 mt-8">   
                        <button
                            className="w-30 bg-red-600 rounded-full cursor-pointer"
                            onClick={onDelete}>
                            Excluir
                        </button>
                        <button
                            className="w-30 bg-gray-400 text-black rounded-full cursor-pointer"
                            onClick={close}>
                            Cancelar
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};