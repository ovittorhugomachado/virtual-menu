import { AccountData } from "./types-account.d";

export type StandardFormProps = {
    icon: React.ReactNode;
    onSubmit: (data: AccountData) => void;
    isLoading: boolean;
    message: string;
    setError: (error: string) => void;
    error?: string;
    initialValues?: Partial<AccountData>;
    children?: React.ReactNode;
};

export type AccountFormProps = {
    onSubmit: (data: AccountData) => void;
    isLoading: boolean;
    message: string;
    setError: (error: string) => void;
    error?: string;
    initialValues?: Partial<AccountData>;
};

export type UpdateStoreDataFormProps = {
    onClose: () => void;
    isLoading?: boolean;
    error?: string;
    initialValues?: Partial<AccountData>;
    message?: string;
};

export type categoryFormProps = {
    onClose: () => void;
    onSubmit: (name: string, itemIds?: number[]) => void;
    isLoading?: boolean;
    error?: string;
    initialValues?: Partial<AccountData>;
    message?: string;
    categoryId?: number;
};

export type CreateMenuItemFormProps = {
    onClose: () => void;
    onCreated?: () => void;
    isLoading?: boolean;
    error?: string;
    message?: string;
    categoryId?: number;
    categories?: Array<{ id: number; name: string }>;
};

export type MenuItemFormData = {
    name: string;
    description: string;
    price: string;
    categories?: number[];
    itemId?: number;
    message: string;
    error: unknown;
};

export type UpdateMenuItemFormProps = {
    onClose: () => void;
    onUpdated?: () => void;
    categoryId: number;
    itemId: number;
    initialData: {
        name: string;
        description: string;
        price: number | string;
    };
};

export type OrderFormData = {
    customerName: string;
    customerPhone: string;
    deliveryType: "delivery" | "pickup";
    customerAddress: string;
    paymentMethod: string;
    items: Array<{
        id: number;
        name: string;
        price: number;
    }>;
    message: string;
    error: unknown;
};

export type OrderDataFormProps = {
    onClose: () => void;
    isLoading?: boolean;
    error?: string;
    initialValues?: Partial<OrderFormData>;
    order?: OrderFormData;
    backgroundColor?: string;
    message?: string;
};

export type UpdateSchedulesStoreFormProps = {
    onClose: () => void;
    isLoading?: boolean;
    error?: string;
    message?: string;
};