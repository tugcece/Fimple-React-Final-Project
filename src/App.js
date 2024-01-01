import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Basvuru from "./pages/Basvuru";
import BasvuruBasarili from "./pages/BasvuruBasarili";
import BasvuruOlustur from "./pages/BasvuruOlustur";
import BasvuruSorgula from "./pages/BasvuruSorgula";
import Admin from "./pages/Admin";
import BasvuruListesi from "./pages/BasvuruListesi";
import { AuthContextProvider } from "./context/AuthContextProvider";
import NavBar from "./pages/NavBar";
import AuthRoute from "./components/AuthRoute";
import AdminBasvuruDetay from "./pages/AdminBasvuruDetay";



const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<BasvuruOlustur />} />
            <Route path="/basvuru-basarili" element={<BasvuruBasarili />} />
            <Route path="/basvuru-sorgula" element={<BasvuruSorgula />} />
            <Route path="/basvuru/:basvuruNo" element={<Basvuru />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/basvuru-listesi"
              element={
                <AuthRoute>
                  <BasvuruListesi />
                </AuthRoute>
              }
            />
            <Route
              path="/admin/basvuru/:basvuruNo"
              element={
                <AuthRoute>
                  <AdminBasvuruDetay />
                </AuthRoute>
              }
            />
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
