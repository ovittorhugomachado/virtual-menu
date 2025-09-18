import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/page-login";
import { RegisterPage } from "../pages/page-signup";
import { RecoverPasswordPage } from "../pages/page-recover-password";
import { CreateNewPasswordPage } from "../pages/page-create-new-password";
import { AdminDashboard } from "../pages/page-dashboard";
import { CustomizeMenuPage } from "../pages/page-customize-menu";
import { PageListOfStores } from "../pages/page-list-of-stores";
import { StorePage } from "../pages/page-store";
import { ManageMenuProvider } from "../context/manage-menu/manage-menu-context.tsx";
import { RestaurantDataProvider } from "../context/restaurant-data/restaurant-data-context.tsx"
import { GetMenuProvider } from "../context/get-menu/get-menu-context.tsx";
import { CartProvider } from "../context/cart/cart-provider.tsx";
// import { Testpage } from "../pages/page-tests";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RestaurantDataProvider>
                            <AdminDashboard />
                        </RestaurantDataProvider>
                    }
                />
                <Route path="/entrar" element={<LoginPage />} />
                <Route path="/criar-conta" element={<RegisterPage />} />
                <Route
                    path="/personalizar-cardapio"
                    element={
                        <ManageMenuProvider>
                            <RestaurantDataProvider>
                                <CustomizeMenuPage />
                            </RestaurantDataProvider>
                        </ManageMenuProvider>
                    }
                />
                <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
                <Route path="/create-new-password/:token" element={<CreateNewPasswordPage />} />
                <Route path="/restaurantes" element={<PageListOfStores />} />
                <Route
                    path="/:restaurantName/73980911/:id"
                    element={
                        <GetMenuProvider>
                            <CartProvider>
                                <StorePage />
                            </CartProvider>
                        </GetMenuProvider>
                    }
                />
                {/* <Route path="/testes" element={<Testpage />} /> */}
            </Routes>
        </BrowserRouter>
    )
};
