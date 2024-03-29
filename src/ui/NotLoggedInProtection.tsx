import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Spinner } from "@nextui-org/react";
import { useUser } from "../hooks/useUser";
import { Children } from "../lib/types";

const NotLoggedInProtection = ({ children }: Children) => {
  const navigate = useNavigate();
  //Load the authenticated user
  const { isGettingUser, isAuthenticated } = useUser();

  //If no authenticated user, redirect
  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) navigate("/login");
  }, [isAuthenticated, isGettingUser, navigate]);

  if (isGettingUser)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );

  return isAuthenticated && children; 
};

export default NotLoggedInProtection;
