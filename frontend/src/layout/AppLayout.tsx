import { ReactNode } from "react";
import ToastMessage from "../components/ToastMessage";

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div>
      <ToastMessage />
      {children}
    </div>
  );
}
