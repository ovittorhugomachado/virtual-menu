import { UpdateOptionGroupForm } from "../components/store-side/forms/form-create-update-option-group";
import { useManageMenu } from "../context/manage-menu/manage-menu-context";

export const TestPage = () => {
    const { optionGroups } = useManageMenu();

    const optionGroupId = 5;
    const optionGroup = optionGroups.find(group => group.id === optionGroupId);

    return (
        <>
            <h1>Teste</h1>
            {optionGroup && (
                <UpdateOptionGroupForm
                    optionGroup={optionGroup}
                    optionGroupId={optionGroupId}
                    onClose={() => { }}
                />
            )}
        </>
    );
};