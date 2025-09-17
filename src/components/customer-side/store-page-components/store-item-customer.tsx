import { MenuItemProps } from "../../../types/types-menu.d";

export const Item = ({
    name,
    image,
    description,
    price,
}: MenuItemProps) => {

    return (
        <>
            <div className="relative shrink-0">
                <img
                    src={image}
                    alt="item-image"
                    className="w-[130px] h-[115px] ms:w-[150px] ms:h-[140px] object-cover"
                    onError={e => (e.currentTarget.src = "/store-logo-default.png")}
                />
            </div>
            <div className="py-4 px-4 mr-1 flex flex-col justify-between overflow-x-hidden">
                <h5 className="font-bold line-clamp-2">{name}</h5>
                <p
                    style={{
                        fontSize: '13px',
                    }}
                    className="font-light line-clamp-2"
                >
                    {description}
                </p>
                <h5 className="mr-5">R$ {Number((price ?? 0).toString().replace(',', '.')).toFixed(2).replace('.', ',')}</h5>
            </div>
        </>
    );
};