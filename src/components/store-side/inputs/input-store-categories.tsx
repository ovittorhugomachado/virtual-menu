import { Categories } from "../../../types/types-input.d"

export const InputCategories = ({
    categories,
    register,
    errors,
    clearErrors,
    selectedCategories,
    onChangeFunction
}: Categories & {
    selectedCategories: number[],
    onChangeFunction: (categoryId: number, isChecked: boolean) => void
}) => {

    const handleChange = (categoryId: number, isChecked: boolean) => {
        onChangeFunction(categoryId, isChecked);
        
        if (errors.categories) {
            clearErrors('categories');
        }
    }

    return (
        <>
            {categories?.map(cat => (
                <label key={cat.id} className="flex font-medium items-center gap-1">
                    <input
                        type="checkbox"
                        value={cat.id}
                        checked={selectedCategories.includes(cat.id)}
                        className={`${errors.categories ? "input-error" : ""} flex items-center justify-center peer appearance-none w-5 h-5 min-w-[20px] min-h-[20px] rounded-full border border-black dark:border-white checked:bg-primary  checked:border-none mr-2 relative cursor-pointer before:content-['✔'] before:absolute before:text-[#161a21] before:text-[12px] before:opacity-0 checked:before:opacity-100`}
                        {...register('categories', {
                            required: "Selecione pelo menos uma categoria",
                        })}
                        onChange={(e) => {
                            handleChange(cat.id, e.target.checked);
                            register('categories').onChange?.(e);
                        }}
                    />
                    {cat.name}
                </label>
            ))}
            {errors.categories && (
                <p className="text-error text-sm">{errors.categories.message}</p>
            )}
        </>
    )
};