import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";
import jwt_decode from "jwt-decode";

import "./App.scss";

import { LoginPage } from "./layouts/LoginPage";
import { RootLayout } from "./layouts/RootLayout";
import { AddAgentPage } from "./layouts/admin/AddAgentPage";
import { AddClientPage } from "./layouts/agent/AddClientPage";
import { DashboardPage } from "./layouts/DashboardPage";
import { OrderListPage } from "./layouts/admin/OrderListPage";
import { OrderDetailPage } from "./layouts/admin/OrderDetailPage";
import { AgentListPage } from "./layouts/admin/AgentListPage";
import { AgentDetailPage } from "./layouts/admin/AgentDetailPage";
import { ClientListPage } from "./layouts/admin/ClientListPage";
import { ClientDetailPage } from "./layouts/admin/ClientDetailPage";
import { CreateOrder } from "./components/agents/create-order/CreateOrder";
import { AddDescription } from "./components/agents/add-description/AddDescription";
import { SettingsPage } from "./layouts/SettingsPage";

function App() {
  const authCtx = useContext(AuthContext);
  const storedToken = localStorage.getItem("token");
  const isLoggedIn = false || authCtx.isLoggedIn;
  const isAdmin = false || authCtx.isAdmin;

  useEffect(() => {
    if (storedToken) {
      const decodeToken = jwt_decode(storedToken);
      authCtx.setAdmin(decodeToken.IsAdmin);
      authCtx.setUsername(decodeToken.first_name);
    }
  }, [storedToken, authCtx]);
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? <Route path="/login" element={<LoginPage />} /> : null}
        {!isLoggedIn ? (
          <Route path="/" element={<Navigate to="/login" />} />
        ) : null}
        {isLoggedIn ? (
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<DashboardPage />} />
            <Route path="/agents/add" element={<AddAgentPage />} />
            <Route path="/clients/add" element={<AddClientPage />} />
            <Route path="/orders/:Id" element={<OrderDetailPage />} />
            <Route path="/orders/add" element={<CreateOrder />} />
            <Route path="/clients/:Id" element={<ClientDetailPage />} />
            <Route path="/description" element={<AddDescription />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        ) : null}
        {isLoggedIn && isAdmin ? (
          <Route path="/" element={<RootLayout />}>
            <Route path="/orders" element={<OrderListPage />} />
            <Route path="/agents" element={<AgentListPage />} />
            <Route path="/agents/:Id" element={<AgentDetailPage />} />
            <Route path="/clients" element={<ClientListPage />} />
          </Route>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
