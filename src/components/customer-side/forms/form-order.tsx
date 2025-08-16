import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useCart } from "../../../context/cart-context/cart-context";
import { createOrder } from "../../../services/service-manage-orders";
import { toMoney } from "../../../utils/function-transform-to-money";
import { OrderFormData } from "../../../types/types-data-forms.d";
import { OrderDataFormProps } from "../../../types/types-data-forms.d";
import { InputCustomerName } from "../inputs/input-customer-name";
import { InputCustomerPhoneNumber } from "../inputs/input-customer-phone";
import { InputCustomerAddress } from "../inputs/input-customer-address";
import { RadioOrderDeliveryTypesInput } from "../inputs/input-customer-delivery-type";
import { RadioOrderPaymentMethodInput } from "../inputs/input-customer-payment-method";
import { IoCloseOutline } from "react-icons/io5";

export const OrderForm: React.FC<OrderDataFormProps> = ({
    backgroundColor,
    order,
    onClose,
    initialValues = {},
}) => {

    const { id } = useParams<{ id: string }>();

    const numericId = Number(id);

    const {
        register,
        clearErrors,
        control,
        formState: { errors },
        handleSubmit
    } = useForm<OrderFormData>({
        defaultValues: {
            customerName: "",
            customerAddress: "",
            customerPhone: "",
            paymentMethod: "",
            deliveryType: "delivery",
            ...order,
        },
    });

    const { cart, clearCart } = useCart();

    const onSubmit = async (data: OrderFormData) => {
        try {
            await createOrder({
                storeId: numericId,
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                typeOfDelivery: data.deliveryType,
                address: data.customerAddress,
                paymentMethod: data.paymentMethod as "pix" | "cartao" | "dinheiro",
                items: cart.items.map(item => ({
                    menuItemId: item.id,
                    note: "",
                    optionIds: [],
                })),
            });

            clearCart();
            onClose();
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div className={`${backgroundColor === 'white' ? 'text-black' : 'text-white'} fixed inset-0 z-50 max-h-screen flex items-center justify-center overflow-y-auto`}>
            <div className="fixed inset-0 z-40 bg-white/10 backdrop-blur-sm"></div>
            <form
                id="confirm-order-form"
                onSubmit={handleSubmit(onSubmit)}
                className={`w-120 max-w-115 mx-3 mt-10 mb-10 px-5 py-8 text-base border border-zinc-400 rounded-xl ${backgroundColor === 'white' ? 'bg-white' : 'bg-black'} relative z-50 max-h-[75vh] translate-y-[-9vh] flex flex-col items-center overflow-y-auto`}>
                <button
                    type="button"
                    className="top-2 right-2 p-2 rounded-full border-0 bg-red-600 text-white absolute cursor-pointer transition-all duration-200"
                    onClick={onClose}
                >
                    <IoCloseOutline className="text-lg" />
                </button>
                <h3 className="mb-3 text-lg md:text-2xl text-center">Confirmação do Pedido</h3>
                <div className="w-full max-w-105 mt-5 mb-5 flex flex-col gap-1">
                    <InputCustomerName
                        backgroundColor={backgroundColor}
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        initialValues={initialValues}
                    />
                    <InputCustomerPhoneNumber
                        backgroundColor={backgroundColor}
                        errors={errors}
                        control={control}
                        initialValues={initialValues}
                    />
                    <InputCustomerAddress
                        backgroundColor={backgroundColor}
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                        initialValues={initialValues}
                    />
                    <RadioOrderPaymentMethodInput
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                    <RadioOrderDeliveryTypesInput
                        register={register}
                        errors={errors}
                        clearErrors={clearErrors}
                    />
                </div>
                <h1 className="text-base">Resumo do Pedido</h1>
                <ul className="w-full px-2.5 pt-2.5 border-t-2">
                    {cart.items.map((item, index) => (
                        <li key={index} className="w-full flex justify-between">
                            <span>{item.name}</span>
                            <span>{toMoney(Number(item.price))}</span>
                        </li>
                    ))}
                    <li className="w-full flex items-center justify-between font-extrabold">
                        <span>Total</span>
                        <div className={`flex-1 mx-2 h-px ${backgroundColor === 'white' ? 'bg-black' : 'bg-white'} translate-y-1.5`} />
                        <span>{toMoney(cart.total)}</span>
                    </li>
                </ul>
            </form >
            <div className="w-full max-w-76 px-2 absolute left-1/2 -translate-x-1/2 z-50 flex flex-col justify-center gap-2" style={{ bottom: "4vh" }}>
                <button
                    type="submit"
                    form="confirm-order-form"
                    className="border-2 border-black primary-button"
                >
                    Confirmar pedido
                </button>
                <button
                    onClick={() => {
                        clearCart();
                        onClose();
                    }}
                    className="cancel-button"
                >
                    Limpar carrinho
                </button>
            </div>
        </div >
    );
}