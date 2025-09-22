import { CreateOptionGroupForm } from "../components/store-side/forms/form-create-update-option-group"
import { useManageMenu } from "../context/manage-menu/manage-menu-context"

export const TestPage = () => {

    const { menuItems } = useManageMenu()
    console.log(menuItems)
    return (
        <>
            <CreateOptionGroupForm
                menuItemId={2}
            />
        </>
    )
}