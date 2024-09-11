import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="w-full border min-h-screen flex flex-col items-center">
      <h1 className="text-[40px] font-bold mt-[50px]">Login</h1>
      <form className="form mt-[80px]">
        <label className="form-label">Email</label>
        <input className="form-input" placeholder="you@example.com" />
        <label className="form-label">Password</label>
        <input className="form-input" placeholder="Enter 6 character or more" />
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
