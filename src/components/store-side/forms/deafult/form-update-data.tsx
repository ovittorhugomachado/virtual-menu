import React from "react";
import { LoadingComponent } from "../../../component-loading";
import { ErrorComponent } from "../../../component-error";
import { UpdateStoreFormProps } from "../../../../types/types-form-default.d";
import { IoCloseOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { createPortal } from "react-dom";

export const UpdateDataForm = ({
    onClose,
    error,
    fieldErrors,
    loading,
    isLoadingSubmit = false,
    formIcon,
    title,
    submitFunction,
    textButtonSubmit,
    successMessage,
    children
}: UpdateStoreFormProps) => {

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-white/10 backdrop-blur-sm overflow-hidden"
            onClick={onClose} // Fecha ao clicar fora
        >
            <div className="h-full w-full overflow-y-auto">
                <div className="min-h-full min-w-full flex justify-center items-center">
                    <div
                        className="w-[90%] max-w-[950px] flex flex-col my-4 md:shadow-2xl transition-all duration-300 ease-in-out"
                        onClick={e => e.stopPropagation()} // Impede fechar ao clicar dentro
                    >
                        <div className="h-30 bg-primary dark:bg-[#161a21] flex justify-center items-center rounded-t-xl relative overflow-hidden">
                            <div className="flex">
                                <div className="text-white dark:text-primary mx-2 hidden md:block">
                                    {formIcon && React.isValidElement(formIcon)
                                        ? React.cloneElement(formIcon, { size: 40 })
                                        : formIcon}
                                </div>
                                <h1 className="text-center dark:text-white">{title}</h1>
                            </div>
                            <button
                                type="button"
                                className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                                onClick={onClose}
                            >
                                <IoCloseOutline className="text-lg" />
                            </button>
                        </div>
                        {loading ? (
                            <div className="w-full relative rounded-xl rounded-t-none pb-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white">
                                <LoadingComponent />
                            </div>
                        ) : (successMessage ?? "").length > 0 ? (
                            <div className="w-full relative rounded-xl rounded-t-none py-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white">
                                <FaCheckCircle className="text-[100px] text-green-800" />
                                <h4 className="text-black dark:text-white text-center">{successMessage}</h4>
                            </div>
                        ) : (
                            <>
                                {error && !fieldErrors && (
                                    <div className="w-full relative rounded-xl rounded-t-none pb-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white">
                                        <ErrorComponent message={error} />
                                    </div>
                                )}
                                <form
                                    onSubmit={submitFunction}
                                    noValidate
                                    className="w-full min-h-75 relative rounded-xl rounded-t-none pb-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white"
                                >
                                    <div className="w-full max-w-105 mt-4 flex flex-1 flex-col justify-center gap-2">
                                        {children}
                                    </div>
                                    {error && (
                                        <p className="text-red-600 text-sm text-center mt-2">{error}</p>
                                    )}
                                    {textButtonSubmit && (
                                        <div className="w-full flex justify-center z-50">
                                            <button
                                                type="submit"
                                                className="w-[220px] primary-button"
                                                disabled={isLoadingSubmit}
                                            >
                                                {isLoadingSubmit ? "Carregando..." : `${textButtonSubmit}`}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};