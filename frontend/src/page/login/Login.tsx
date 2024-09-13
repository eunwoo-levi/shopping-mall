import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, loginWithEmail } from "../../features/user/userSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loginError } = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]); // user와 navigate를 종속성 배열에 추가하여 user 상태 변경 시 navigate 호출

  useEffect(() => {
    if (loginError) {
      dispatch(clearErrors());
    }
  }, [loginError, dispatch]); // loginError와 dispatch를 종속성 배열에 추가

  const handleLoginWithEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginWithEmail({ email, password }));
  };

  return (
    <main className="w-full border min-h-screen flex flex-col items-center">
      <h1 className="text-[40px] font-bold mt-[50px]">Login</h1>
      <form onSubmit={handleLoginWithEmail} className="form mt-[80px]">
        <label className="form-label">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder="you@example.com"
          required
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="Enter 6 character or more"
          required
        />
        {loginError && (
          <p className="text-red-600 text-center text-[18px] mb-[10px]">
            {loginError}
          </p>
        )}
        <div className="flex justify-center font-semibold gap-2">
          <p>Don't have an account?</p>
          <Link to={"/register"} className="text-blue-600">
            Register
          </Link>
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white p-[8px] rounded-lg mt-[40px] text-[20px] font-bold"
        >
          Login
        </button>
      </form>
    </main>
  );
}
