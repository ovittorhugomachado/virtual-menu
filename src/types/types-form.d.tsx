import { ReactElement } from "react";
import { RestaurantData } from "./types-restaurante-data.d";

export type UpdateStoreFormProps = {
    onClose: () => void;
    isLoading?: boolean;
    loading: boolean;
    error?: string;
    message?: string;
    fieldErrors?: { [key: string]: string };
    formIcon?: ReactElement<{ size?: number }>;
    mobileTitle: string;
    desktopTitle: string;
    titleWidthMobile: number,
    titleWidthDesktop: number,
    submitFunction?: (e: React.FormEvent) => void;
    onSubmit?: (data: RestaurantData) => void;
    successMessage?: string;
    children?: React.ReactNode;
};