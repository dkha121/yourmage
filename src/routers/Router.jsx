import React from "react";
import { Routes, Route } from "react-router-dom";

import Introduction from "../pages/Introduction";

import UserLayout from "../layouts/UserLayout";
import Home from "../pages/Home";
import AiGenerations from "../pages/AiGenerations";
import Settings from "../pages/Settings";
import UpgradeLevel from "../pages/UpgradeLevel"
import Payment from "../pages/Payment";

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminTransaction from "../pages/AdminTransaction";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Introduction />} />

      <Route element={<UserLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ai-generations" element={<AiGenerations />} />
      </Route>

      <Route path="/upgrade-level" element={<UpgradeLevel/>}/>
      <Route path="/payment" element={<Payment/>}/>

      <Route element={<AdminLayout />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-transaction" element={<AdminTransaction />} />
      </Route>
      
    </Routes>
  )
};

export default Router;
