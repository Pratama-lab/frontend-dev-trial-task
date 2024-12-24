import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "pages/login";
import DashboardPage from "pages/dashboard";
import AuthProvider from "contexts/authContext";
import PrivateRoute from "components/commons/protectedRoutes";

function AppRoute() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<DashboardPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default AppRoute;