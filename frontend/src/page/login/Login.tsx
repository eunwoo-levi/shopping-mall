export default function Login() {
  return (
    <main className="w-full border min-h-screen flex flex-col items-center">
      <h1 className="text-[40px] font-bold mt-[40px]">Login</h1>
      <form className="form">
        <label className="mt-[60px] form-label">Name</label>
        <input className="form-input" placeholder="user name" />
        <label className="form-label">Email</label>
        <input className="form-input" placeholder="you@example.com" />
        <label className="form-label">Password</label>
        <input className="form-input" placeholder="Enter 6 character or more" />
        <label className="form-label">Confirm Password</label>
        <input className="form-input" placeholder="Re-enter your password" />
        <div className="flex gap-4">
          <input type="checkbox" />
          <p>이용약관에 동의합니다.</p>
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
