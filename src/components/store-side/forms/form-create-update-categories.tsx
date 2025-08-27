import React, { useEffect, useState } from "react";
import { categoryFormProps } from "../../../types/types-data-forms.d";
import { UpdateDataForm } from "./deafult/form-update-data";
import { IoIosAddCircle } from "react-icons/io";
import { BsFillTrash3Fill } from "react-icons/bs";
import { ConfirmDeletion } from "./deafult/confirm-deletion"
import { deleteCategoryService } from "../../../services/service-manage-menu-store";

export const CreateCategoryForm = ({
    onClose,
    onSubmit,
}: categoryFormProps) => {

    const [name, setName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
            setName("");
            setSuccessMessage("Categoria criada com sucesso!");
        }
    };

    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<IoIosAddCircle />}
            title="Criar categoria"
            textButtonSubmit="Criar categoria"
            successMessage={successMessage}
            submitFunction={handleSubmit}
        >
            <div className="w-full flex flex-col items-start justify-center">
                <label htmlFor="category-name" className="text-md ml-2">
                    Nome
                </label>
                <input
                    type="text"
                    id="category-name"
                    placeholder="Nome da categoria"
                    className="input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                />
            </div>
        </UpdateDataForm>
    );
};

export const UpdateCategoryForm = ({
    onClose,
    onSubmit,
    initialName = "",
    categoryId,
}: categoryFormProps & { initialName?: string }) => {

    const [name, setName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim());
            setName("");
            setSuccessMessage("Categoria atualizada com sucesso!");
        }
    };

    const deleteCategory = async (categoryId: number) => {
        try {
            await deleteCategoryService(categoryId);
            setSuccessMessage("Categoria excluída com sucesso!");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UpdateDataForm
            onClose={onClose}
            formIcon={<IoIosAddCircle />}
            title="Editar categoria"
            textButtonSubmit="Atualizar categoria"
            successMessage={successMessage}
            submitFunction={handleSubmit}
        >
            <div className="w-full flex flex-col items-start justify-center">
                <label htmlFor="category-name" className="text-md ml-2">
                    Nome
                </label>
                <input
                    type="text"
                    id="category-name"
                    placeholder="Nome da categoria"
                    className="input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                />
            </div>
            <button
                type="button"
                className="w-50 mt-2 mx-auto bg-red-600 px-3 flex justify-center items-center rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setShowConfirm(true)}
            >
                <BsFillTrash3Fill />
                Excluir categoria
            </button>
            {showConfirm && (
                <ConfirmDeletion
                    question="Tem certeza de que deseja excluir esta categoria?"
                    description="Os items que só existem aqui também serão excluidos permanentemente."
                    close={() => setShowConfirm(false)}
                    onDelete={() => {
                        if (typeof categoryId === "number") {
                            deleteCategory(categoryId);
                        }
                    }}
                />
            )}
        </UpdateDataForm>
    );
};
