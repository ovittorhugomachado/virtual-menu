import { useCart } from "../../../context/cart-context/cart-context";
import { MenuItem } from "../../../types/types-menu.d";

export const Item = ({
    storeId,
    id,
    photoUrl,
    name,
    description,
    price,
}: MenuItem) => {

    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({ storeId, id, name, price });
    };

    return (
        <button className="w-full h-[150px] flex cursor-pointer transition-all duration-300 hover:scale-102" onClick={handleAddToCart}>
            <div className="w-[150px] h-[150px] relative">
                <img src={photoUrl} alt={name} className="w-[150px] h-[150px] object-cover" />
            </div>
            <div className="py-4 px-4 flex flex-col items-start justify-between">
                <h1 className="text-base font-bold text-start">{name}</h1>
                <p className="text-base font-light text-start">{description}</p>
                <h3 className="text-base">R$ {Number(price.toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h3>
            </div>
        </button>
    );
};

