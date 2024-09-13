import { ReactNode, useEffect } from "react";
import ToastMessage from "../components/ToastMessage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginWithToken } from "../features/user/userSlice";
import Navbar from "../components/Navbar";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const { user } = useSelector((state: any) => state.user);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  return (
    <div>
      <ToastMessage />
      <Navbar user={user} />
      {children}
    </div>
  );
}
