import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/page-login";
import { RegisterPage } from "../pages/page-signup";
import { RecoverPasswordPage } from "../pages/page-recover-password";
import { CreateNewPasswordPage } from "../pages/page-create-new-password";
import { AdminDashboard } from "../pages/page-dashboard";
import { CustomizeMenuPage } from "../pages/page-customize-menu";
import { PageListOfStores } from "../pages/page-list-of-stores";
import { StorePage } from "../pages/page-store";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/entrar" element={<LoginPage />} />
                <Route path="/criar-conta" element={<RegisterPage />} />
                <Route path="/personalizar-cardapio" element={<CustomizeMenuPage />} />
                <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
                <Route path="/create-new-password/:token" element={<CreateNewPasswordPage />} />
                <Route path="/restaurantes" element={<PageListOfStores />} />
                <Route path="/restaurante/:id" element={<StorePage />} />
            </Routes>
        </BrowserRouter>
    )
};
