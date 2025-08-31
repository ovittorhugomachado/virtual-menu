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
                        className={`${errors.categories ? "input-error" : ""} checkbox-primary`}
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