import { Outlet } from "react-router-dom";
import { AuthModal } from "./AuthModal/AuthModal";
import { useAuth } from "../context"; // ✅ correct

export const Layout = () => {
  const { isAuthModalOpen } = useAuth();

  return (
    <>
      <Outlet /> {/* This renders current route page like Home, Hotel etc */}
      {isAuthModalOpen && <AuthModal />} {/* This makes modal available on all pages */}
    </>
  );
};
