import { Link } from "react-router-dom";
import { RestaurantsGrid } from "../../types/types-restaurante-data.d";
import { MdRestaurantMenu } from "react-icons/md";
import { getExtension } from "../../utils/function-get-extension";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const StoreGrid = ({ restaurants }: RestaurantsGrid) => {

    return (
        <main className="w-full flex flex-col pt-6 px-8 text-black">
            <div className="w-full flex items-center justify-center">
                <MdRestaurantMenu className="text-4xl hidden sm:block" />
                <h1 className="text-4xl border-b-2 border-primary mx-3 text-center">Restaurantes</h1>
            </div>
            <div className="w-full max-w-[1450px] mt-8 mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                    <Link
                        key={restaurant.id}
                        to={`/restaurante/${restaurant.id}`}
                        className="min-w-50 p-4 rounded-lg border-[1px] border-zinc-500 shadow flex flex-col items-center cursor-pointer"
                    >
                        <img
                            src={
                                restaurant.logoUrl && restaurant.logoUrl.startsWith('https://s3.us-east-2.amazonaws.com/bucket.rangos/')
                                    ? restaurant.logoUrl
                                    : restaurant.logoUrl
                                        ? `${VITE_API_URL}/uploads/store${restaurant.id}-logo${getExtension(restaurant.logoUrl)}`
                                        : "/store-logo-default.png"
                            }
                            alt={restaurant.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <h2 className="text-md font-semibold">{restaurant.restaurantName}</h2>
                    </Link>
                ))}
            </div>
        </main>
    );
};