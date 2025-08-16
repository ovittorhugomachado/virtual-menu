import { OpeningHour } from "./types-schedules.d";

export type RestaurantData = {
  pageStyle(pageStyle: unknown): unknown;
  restaurantName: string;
  ownersName: string;
  email: string;
  address: string;
  logoUrl: string;
  bannerUrl: string;
  backgroundColor: string;
  cnpj: string,
  delivery: boolean;
  pickup: boolean;
  openingHours: OpeningHour[];
  cartValue: string,
  phoneNumber: string;
  message: string;
  error: unknown;
  id: number;
  password: string;
  name: string;
  activeAccount: boolean;
  plan: string;
  cratedAt: Date;
  cpf: string;
  isLogged: boolean;
  passwordResetToken: object;
  storeCustomization: object;
  primaryColor: string;
  textButtonColor: string;
  token: string;
}

export type RestaurantContainerProps = {
  onSubmit: (data: RestaurantData) => void;
  isLoading: boolean;
  error?: string;
  initialValues?: Partial<RestaurantData>;
}

export type RestaurantsGrid = {
  restaurants: RestaurantData[];
}