import { UseFormRegister, UseFormWatch, UseFormClearErrors, FieldErrors, Control } from "react-hook-form";
import { CategoryData } from "./types-menu.d";
import { Address, RestaurantData } from "./types-restaurante-data.d";
import { MenuItemFormData, OrderFormData } from "./types-data-forms.d";

export type InputNameProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
};

export type InputOwnersNameProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export type InputRestaurantNameProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export type InputCustomerNameProps = {
    backgroundColor?: string;
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
};

export type Categories = {
    categories: CategoryData[];
    register: UseFormRegister<MenuItemFormData>;
    errors: FieldErrors<MenuItemFormData>;
    clearErrors: UseFormClearErrors<MenuItemFormData>;
    initialValues?: Partial<MenuItemFormData>;
    selectedCategories?: number[];
    onChangeFunction?: (categoryId: number, isChecked: boolean) => void;
}

export type InputMenuItemNameProps = {
    register: UseFormRegister<MenuItemFormData>;
    errors: FieldErrors<MenuItemFormData>;
    clearErrors: UseFormClearErrors<MenuItemFormData>;
    initialValues?: Partial<MenuItemFormData>;
};

export type InputMenuItemPriceProps = {
    register: UseFormRegister<MenuItemFormData>;
    errors: FieldErrors<MenuItemFormData>;
    clearErrors: UseFormClearErrors<MenuItemFormData>;
    initialValues: Partial<MenuItemFormData>;
};

export type InputAddressProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<{ address: RestaurantData["address"] }>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: { address?: Address };
    requiredAddress?: boolean;
}

export type InputCustomerAddressProps = {
    backgroundColor?: string;
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
}

export type InputCNPJProps = {
    control: Control<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
}

export type InputCPFProps = {
    control: Control<RestaurantData>;
    initialValues: Partial<RestaurantData>;
    hasTriedToSubmit?: boolean;
    clearErrors?: UseFormClearErrors<RestaurantData>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export type InputPhoneNumberProps = {
    control: Control<RestaurantData>;
    initialValues: Partial<RestaurantData>;
    hasTriedToSubmit?: boolean;
    clearErrors?: UseFormClearErrors<RestaurantData>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export type InputCustomerPhoneNumberProps = {
    backgroundColor?: string;
    errors: FieldErrors<OrderFormData>;
    control: Control<OrderFormData>;
    initialValues: Partial<OrderFormData>;
}

export type InputEmailProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export type InputPasswordProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    watch: UseFormWatch<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
    hasTriedToSubmit?: boolean;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export type InputDeliveryTypeProps = {
    register: UseFormRegister<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors?: UseFormClearErrors<RestaurantData>;
}

export type InputDeliveryTypeOfOrderProps = {
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
}

export type InputPaymentMethodProps = {
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
}
