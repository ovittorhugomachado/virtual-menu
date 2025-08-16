import { UseFormRegister, UseFormWatch, UseFormClearErrors, FieldErrors, Control } from "react-hook-form";
import { AccountData } from "./types-account.d";
import { RestaurantData } from "./types-restaurante-data.d";
import { MenuItemFormData, OrderFormData } from "./types-data-forms.d";

export type InputNameProps = {
    register: UseFormRegister<AccountData>;
    errors: FieldErrors<AccountData>;
    clearErrors: UseFormClearErrors<AccountData>;
    initialValues?: Partial<AccountData>;
};

export type InputOwnersNameProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
};

export type InputRestaurantNameProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
};

export type InputCustomerNameProps = {
    backgroundColor?: string;
    register: UseFormRegister<OrderFormData>;
    errors: FieldErrors<OrderFormData>;
    clearErrors: UseFormClearErrors<OrderFormData>;
    initialValues?: Partial<OrderFormData>;
};

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
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
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
}

export type InputPhoneNumberProps = {
    control: Control<RestaurantData>;
    initialValues: Partial<RestaurantData>;
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
}

export type InputPasswordProps = {
    register: UseFormRegister<RestaurantData>;
    errors: FieldErrors<RestaurantData>;
    clearErrors: UseFormClearErrors<RestaurantData>;
    watch: UseFormWatch<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
}

export type InputDeliveryTypeProps = {
    register: UseFormRegister<RestaurantData>;
    initialValues?: Partial<RestaurantData>;
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
