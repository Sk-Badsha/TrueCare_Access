import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import {
  Home,
  About,
  AuthInput,
  Dashboard,
  Notification,
  ForgotPassword,
  ResetPassword,
} from "./components/index.js";
import {
  Register,
  Login,
  AddDoctor,
  Profile,
  BookingPage,
  UserAppointments,
  Appointments,
  UpdateProfile,
  ChangePassword,
} from "./pages/index.js";
import Doctors, { doctorsLoader } from "./pages/Admin/Doctors.jsx";
import JobOpen from "./pages/Temp/JobOpen.jsx";
import Users, { usersLoader } from "./pages/Admin/Users.jsx";
import Layout from "./Layout.jsx";
import store, { persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import React from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <AuthInput authentication={false}>
              <Home />
            </AuthInput>
          }
        />
        <Route
          path="about"
          element={
            <AuthInput authentication={false}>
              <About />
            </AuthInput>
          }
        />
        <Route
          path="register"
          element={
            <AuthInput authentication={false}>
              <Register />
            </AuthInput>
          }
        />
        <Route
          path="login"
          element={
            <AuthInput authentication={false}>
              <Login />
            </AuthInput>
          }
        />
        <Route
          path="/users/forgot-password"
          element={
            <AuthInput
              authentication={false}
              requiredRoles={["admin", "user", "doctor"]}
            >
              <ForgotPassword />
            </AuthInput>
          }
        />
        <Route
          path="/users/reset-password/:id/:token"
          element={
            <AuthInput authentication={false}>
              <ResetPassword />
            </AuthInput>
          }
        />
        <Route
          path="dashboard"
          element={
            <AuthInput
              authentication
              requiredRoles={["admin", "user", "doctor"]}
            >
              <Dashboard />
            </AuthInput>
          }
        />
        <Route
          path="/doctor/update-profile/:id"
          element={
            <AuthInput authentication requiredRoles={["doctor"]}>
              <Profile />
            </AuthInput>
          }
        />
        <Route
          path="/doctor/book-appointment/:doctorId"
          element={
            <AuthInput
              authentication
              requiredRoles={["doctor", "user", "admin"]}
            >
              <BookingPage />
            </AuthInput>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <AuthInput authentication>
              <AddDoctor />
            </AuthInput>
          }
        />

        <Route
          path="/notification"
          element={
            <AuthInput
              authentication
              requiredRoles={["admin", "user", "doctor"]}
            >
              <Notification />
            </AuthInput>
          }
        />
        <Route
          loader={usersLoader}
          path="/admin/users"
          element={
            <AuthInput authentication requiredRoles={["admin"]}>
              <Users />
            </AuthInput>
          }
        />
        <Route
          loader={doctorsLoader}
          path="/admin/doctors"
          element={
            <AuthInput authentication requiredRoles={["admin"]}>
              <Doctors />
            </AuthInput>
          }
        />

        <Route
          path="/user/appointments"
          element={
            <AuthInput authentication>
              <UserAppointments />
            </AuthInput>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <AuthInput authentication requiredRoles={["doctor"]}>
              <Appointments />
            </AuthInput>
          }
        />
        <Route
          path="/user/update-profile/:id"
          element={
            <AuthInput authentication requiredRoles={["admin", "user"]}>
              <UpdateProfile />
            </AuthInput>
          }
        />
        <Route
          path="/user/change-password"
          element={
            <AuthInput
              authentication
              requiredRoles={["admin", "user", "doctor"]}
            >
              <ChangePassword />
            </AuthInput>
          }
        />
        <Route
          path="/job-opening"
          element={
            <AuthInput authentication={false}>
              <JobOpen />
            </AuthInput>
          }
        />
      </Route>
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
