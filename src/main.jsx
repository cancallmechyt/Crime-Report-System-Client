import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import App from "./App.jsx";

// LIFF APP.................................................//

// Menu
import Layout from "./LIFF_APP/Menu/Layout.jsx";

// Auth
import Login from "./LIFF_APP/Auth/Login.jsx";
import Register from "./LIFF_APP/Auth/Register.jsx";

// Pages
import Home from "./LIFF_APP/Pages/Home.jsx";
import Guide from "./LIFF_APP/Pages/Guide.jsx";
import Profile from "./LIFF_APP/Pages/Profile.jsx";
import LostItem from "./LIFF_APP/Pages/LostItem.jsx";
import FindItem from "./LIFF_APP/Pages/FindItem.jsx";
import MyIncidence from "./LIFF_APP/Pages/MyIncidence.jsx";

// Form
import SingleForm from "./LIFF_APP/Form/SingleForm.jsx";
import FormIncidence from "./LIFF_APP/Form/addIncidence.jsx";
import FormLostItem from "./LIFF_APP/Form/addLostItem.jsx";
import EditForm from "./LIFF_APP/Form/EditForm.jsx";

// Officer (RSU_Police)
import StaffHome from "./LIFF_APP/Police/StaffHome.jsx";
import Emergency from "./LIFF_APP/Police/addEmergency.jsx";
import CheckList from "./LIFF_APP/Police/ChecklistInc.jsx";
import CheckFindItem from "./LIFF_APP/Police/ChecklistFindItem.jsx";
import EditStaff from "./LIFF_APP/Police/EditStaff.jsx";

// .........................................................//

// Admin Dashboard ..........................................//

// Menu
import ADBLayout from "./ADMIN_DB/SideBar/Layout.jsx";

// Auth
import ADBLogin from "./ADMIN_DB/Login/Login.jsx";

// Pages
import ADBHome from "./ADMIN_DB/Pages/Home.jsx";
import ADBMember from "./ADMIN_DB/Pages/Member.jsx";
import ADBIncidence from "./ADMIN_DB/Pages/Incidence.jsx";
import ADBAddIncidence from "./ADMIN_DB/Form/AddIncidence.jsx";
import ADBAddEmergency from "./ADMIN_DB/Form/AddEmergency.jsx";
import ADBListLocation from "./ADMIN_DB/Pages/ListLocation.jsx";
import ADBListMember from "./ADMIN_DB/Pages/ListMember.jsx";
import ADBListIncidence from "./ADMIN_DB/Pages/ListIncidence.jsx";
import ADBEditIncidence from "./ADMIN_DB/Form/EditIncidence.jsx";
import ADBEditMember from "./ADMIN_DB/Form/EditMember.jsx";
import ADBSingleMember from "./ADMIN_DB/Single/SingleMember.jsx";

// .........................................................//

// Import Styles
import "./index.css";

// Token Check Component
const TokenCheck = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

// Token Check Component (Admin)
const TokenAdmin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return children;
};

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TokenCheck>
        <App />
      </TokenCheck>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <TokenCheck>
        <Layout>
          <Home />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/form",
    element: (
      <TokenCheck>
        <Layout>
          <FormIncidence />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/formlostitem",
    element: (
      <TokenCheck>
        <Layout>
          <FormLostItem />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/list",
    element: (
      <TokenCheck>
        <Layout>
          <MyIncidence />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/lostitem",
    element: (
      <TokenCheck>
        <Layout>
          <LostItem />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/finditem",
    element: (
      <TokenCheck>
        <Layout>
          <FindItem />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/guide",
    element: (
      <TokenCheck>
        <Layout>
          <Guide />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/profile",
    element: (
      <TokenCheck>
        <Layout>
          <Profile />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/staffhome",
    element: (
      <TokenCheck>
        <Layout>
          <StaffHome />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/checklist",
    element: (
      <TokenCheck>
        <Layout>
          <CheckList />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/checkfinditem",
    element: (
      <TokenCheck>
        <Layout>
          <CheckFindItem />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/emergency",
    element: (
      <TokenCheck>
        <Layout>
          <Emergency />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/posts/:pid",
    element: (
      <TokenCheck>
        <Layout>
          <SingleForm />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/posts/edit/:pid",
    element: (
      <TokenCheck>
        <Layout>
          <EditForm />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/posts/editstaff/:pid",
    element: (
      <TokenCheck>
        <Layout>
          <EditStaff />
        </Layout>
      </TokenCheck>
    ),
  },
  {
    path: "/admin/login",
    element: <ADBLogin />,
  },
  {
    path: "/admin/home",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBHome />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/member",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBMember />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/incidence",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBIncidence />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/new/incidence",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBAddIncidence />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/new/emergency",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBAddEmergency />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/statistic/location",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBListLocation />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/statistic/member",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBListMember />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/statistic/incidence",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBListIncidence />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/single/member/:uid",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBSingleMember />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/incidence/edit/:pid",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBEditIncidence />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
  {
    path: "/admin/member/edit/:uid",
    element: (
      <TokenAdmin>
        <ADBLayout>
          <ADBEditMember />
        </ADBLayout>
      </TokenAdmin>
    ),
  },
]);

// Render Application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
