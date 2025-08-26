import React from "react";
import { LoadingComponent } from "../../component-loading";
import { ErrorComponent } from "../../component-error";
import { UpdateStoreFormProps } from "../../../types/types-form.d";
import { IoCloseOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export const UpdateDataForm = ({
    onClose,
    error,
    fieldErrors,
    loading,
    formIcon,
    mobileTitle,
    desktopTitle,
    titleWidthMobile,
    titleWidthDesktop,
    submitFunction,
    successMessage,
    children
}: UpdateStoreFormProps) => {
    
    return (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm overflow-hidden z-50">
            <div className="h-full w-full overflow-y-auto">
                <div className="min-h-full min-w-full flex justify-center items-center">
                    <div className="w-[90%] max-w-[950px] flex flex-col my-4 md:shadow-2xl">
                        <div className="h-30 bg-primary dark:bg-[#161a21] flex justify-center items-center rounded-t-xl relative overflow-hidden">
                            <div className="flex">
                                <div className="text-white dark:text-primary mx-2 hidden md:block">
                                    {formIcon && React.isValidElement(formIcon)
                                        ? React.cloneElement(formIcon, { size: 40 })
                                        : formIcon}
                                </div>
                                <picture className="flex">
                                    <source
                                        srcSet={mobileTitle}
                                        media="(max-width: 767px)"
                                        width={titleWidthMobile}
                                        className="" />
                                    <img
                                        src={desktopTitle}
                                        alt="Horários"
                                        width={titleWidthDesktop}
                                        className="max-h-[80px] h-auto object-contain"
                                    />
                                </picture>
                            </div>
                            <button
                                type="button"
                                className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white cursor-pointer transition-all duration-200"
                                onClick={onClose}
                            >
                                <IoCloseOutline className="text-lg" />
                            </button>
                        </div>
                        {error && !fieldErrors && (
                            <div className="w-full relative rounded-xl rounded-t-none pb-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white">
                                <ErrorComponent message={error} />
                            </div>
                        )}
                        {loading && (
                            <div className="w-full relative rounded-xl rounded-t-none pb-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white">
                                <LoadingComponent />
                            </div>
                        )}
                        {(successMessage ?? "").length > 0 ? (

                            <div className="w-full relative rounded-xl rounded-t-none py-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white">
                                <FaCheckCircle className="text-[100px] text-green-800" />
                                <h4 className="text-black dark:text-white text-center">{successMessage}</h4>
                            </div>
                        ) : (
                            <form
                                onSubmit={submitFunction}
                                noValidate
                                className="w-full min-h-130 md:min-h-150 relative rounded-xl rounded-t-none pb-8 px-4 flex flex-col justify-start md:justify-between items-center gap-4 bg-white dark:bg-[#202326] shadow-2xl md:shadow-none dark:text-white"
                            >
                                {children}
                                {error && (
                                    <p className="text-red-600 text-sm text-center mt-2">{error}</p>
                                )}
                                <div className="w-full flex justify-center z-50">
                                    <button
                                        type="submit"
                                        className="w-[320px] max-w-[90vw] primary-button"
                                    >
                                        Salvar horários
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};