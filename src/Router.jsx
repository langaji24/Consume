import { createBrowserRouter} from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./components/TrashStuff";
import Inbound from "./pages/Inbound";
import InboundStore from "./pages/InboundStore";
import Lending from "./pages/Lending";
import LendingAdmin from "./pages/LendingAdmin";
import User from "./pages/User";
import TrashUser from "./components/User/TrashUser";

export const router = createBrowserRouter([
    { path: '/', element: <App />},
    { path: '/login', element: <Login />},
    { path: '/profile', element: <Profile />},
    { path: '/dashboard', element: <Dashboard />},
    { path: '/stuffs', element: <Stuff />},
    { path: '/stuffs/trash', element: <TrashStuff />},
    { path: '/inbound-stuff/', element: <Inbound />},
    { path: '/inbound-stuff/data', element: <InboundStore />},
    { path: '/lending/data', element: <Lending />},
    { path: '/lending', element: <LendingAdmin />},
    { path: '/user/data', element: <User />},
    { path: '/user/trash', element: <TrashUser />}
])

