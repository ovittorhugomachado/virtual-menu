import { UpdateOptionGroupForm } from "../components/store-side/forms/form-create-update-option-group";
import { useManageMenu } from "../context/manage-menu/manage-menu-context";
import { MenuItem } from "../types/types-menu.d";

export const TestPage = () => {
    const { optionGroups } = useManageMenu();

    // Exemplo: pegar o primeiro menuItem e buscar o optionGroup com id 5
    // const optionGroupId = 5;
    // // Procura o optionGroup no primeiro menuItem que tem esse grupo
    // const optionGroup = menuItems
    //     .flatMap(item => item.optionGroups)
    //     .find(group => group?.id === optionGroupId);
    // console.log("Option Group:", optionGroup);
    const optionGroupId = 5;
    const optionGroup = optionGroups.find(group => group.id === optionGroupId);
    console.log(optionGroup);
    const mappedOptionGroup = {
        ...optionGroup,
        menuItemIds: Array.isArray(optionGroup?.menuItem)
            ? optionGroup.menuItem
                .filter((item): item is MenuItem => typeof item.id === "number")
                .map(item => item.id as number)
            : [],
    };
    return (
        <>
            {optionGroup && (
                <UpdateOptionGroupForm
                    optionGroup={optionGroup}
                    optionGroupId={optionGroup.id}
                    onClose={() => { }}
                />
            )}
        </>
    );
};