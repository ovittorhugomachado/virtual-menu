import { CategoryData, StyleStorePage, MenuItem, OptionGroup, Option } from "./types-menu.d";
import { OpeningHour } from "./types-schedules.d";

export type Address = {
  city: string;
  neighborhood: string;
  number: string;
  street: string;
  id?: number;
  storeId?: number;
};

export type UserData = {
  id: number;
  ownersName: string;
  restaurantName: string;
  email: string;
  password: string;
  phoneNumber: string;
  cnpj: string;
  cpf: string;
  createdAt: string;
  refreshToken: string;
  status: string;
  // ...outros campos se necessário
};

export type RestaurantData = {
  id: number;
  user: UserData;
  address: Address;
  logoUrl: string;
  bannerUrl: string | null;
  delivery: boolean;
  pickup: boolean;
  openingHours: OpeningHour[];
  style: StyleStorePage;
  MenuCategory: CategoryData[];
  MenuItem: MenuItem[];
  MenuItemOption: Option[];
  MenuItemOptionGroup: OptionGroup[];
};

export type RestaurantContainerProps = {
  onSubmit: (data: RestaurantData) => void;
  isLoading: boolean;
  error?: string;
  initialValues?: Partial<RestaurantData>;
}

export type RestaurantsGrid = {
  restaurants: RestaurantData[];
}

export type UpdateMyStorePayload = {
  store: {
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
    };
    delivery: boolean;
    pickup: boolean;
  };
  ownerUser: {
    restaurantName: string;
    phoneNumber: string;
  };
};

export type RestaurantDataContextType = {
  restaurantData: RestaurantData | null;
  updateRestaurantData: (payload: UpdateMyStorePayload) => Promise<void>;
  updateRestaurantSchedules: (body: { schedule: OpeningHour[] }) => Promise<void>;
  logoUrl: string | undefined;
  setLogoUrl: (url: string) => void;
  bannerUrl: string | undefined;
  setBannerUrl: (url: string) => void;
}