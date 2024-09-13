import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/user/userSlice";

interface UserProps {
  user: {
    name: string;
    email: string;
  } | null; // user가 null일 수 있도록 처리
}

export default function Navbar({ user }: UserProps) {
  const dispatch = useDispatch<any>();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-neutral-300 bg-opacity-30 w-full h-[60px] flex items-center justify-between px-[20px]">
      <div>로고</div>
      <div className="text-[20px] font-bold">은우의 쇼핑몰</div>
      <div className="border border-red-500 gap-[20px] flex items-center font-semibold">
        {user ? (
          <>
            <button onClick={handleLogout} className="font-bold">
              LOGOUT
            </button>
            <span className="text-[15px]">{user.name} 님</span>{" "}
            {/* user가 있을 때만 표시 */}
          </>
        ) : (
          <Link to="/login" className="font-bold">
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
