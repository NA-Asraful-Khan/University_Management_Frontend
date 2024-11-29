import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  TUser,
  useCurrentToken,
} from "../../redux/features/auth/auth.slice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== (user as TUser)?.role) {
    if ((user as TUser)?.role !== "super-admin") {
      dispatch(logout());
      return <Navigate to={`/login`} replace={true} />;
    }
  }
  if (!token) {
    return <Navigate to={`/login`} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
