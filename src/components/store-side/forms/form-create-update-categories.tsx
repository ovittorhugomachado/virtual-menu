import React, { useEffect, useState } from "react";
import { categoryFormProps } from "../../../types/types-data-forms.d";
import { UpdateDataForm } from "./deafult/form-update-data";
import { IoIosAddCircle, IoIosArrowDown } from "react-icons/io";
import { BsFillTrash3Fill } from "react-icons/bs";
import { ConfirmDeletion } from "./deafult/confirm-deletion"
import { deleteCategoryService, getMenuItemsMyStore } from "../../../services/service-manage-menu-store";
import { MenuItem } from "../../../types/types-menu.d";

export const CreateCategoryForm = ({
    onClose,
    onSubmit,
}: categoryFormProps) => {

    const [name, setName] = useState("");
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [openArrayItems, setOpenArrayItems] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSubmit(name.trim(), selectedItems); // Agora envia nome e itens selecionados
            setName("");
            setSelectedItems([]);
            setSuccessMessage("Categoria criada com sucesso!");
        }
    };

    const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedItems(prev => [...prev, itemId]);
        } else {
            setSelectedItems(prev => prev.filter(id => id !== itemId));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await getMenuItemsMyStore();
                setMenuItems(items.data);
            } catch (error) {
                console.error("Erro ao buscar itens:", error);
            }
        };
        fetchData();
    }, []);

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
            {menuItems.length > 0 &&
                <div className="w-full flex flex-col items-center mt-4">
                    <button
                        className="flex items-center px-8 gap-2 bg-zinc-300 dark:bg-[#161a21] rounded-2xl cursor-pointer mb-2 hover:scale-103 transition-all duration-300"
                        onClick={() => setOpenArrayItems(!openArrayItems)}
                        style={{ fontSize: '18px' }}
                    >
                        <IoIosArrowDown className={`${openArrayItems ? 'rotate-180' : ''} transition-all duration-300`} />
                        Itens disponíveis
                    </button>
                    {selectedItems.length > 0 && <p>({selectedItems.length} itens selecionados)</p>}
                    <div className={`${openArrayItems ? 'opacity-100 mt-3' : 'opacity-0 max-h-0'} transition-all duration-300 ease-in-out`}>
                        <p className="text-zinc-600 dark:text-zinc-400 font-extralight text-sm mb-2">
                            Você pode usar os items abaixo na nova categoria
                        </p>
                        <ul className="space-y-2 mt-3">
                            {menuItems.map((item: MenuItem) => (
                                <li key={item.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`item-${item.id}`}
                                        value={item.id}
                                        checked={selectedItems.includes(item.id)}
                                        onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                                        className="checkbox-primary mr-2"
                                    />
                                    <label htmlFor={`item-${item.id}`} className="text-md text-gray-700 dark:text-gray-200">
                                        {item.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }
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
