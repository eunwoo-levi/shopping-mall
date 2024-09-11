import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../../features/user/userSlice";
import { useState } from "react";

export default function Register() {
  const dispatch = useDispatch<any>();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const { registrationError } = useSelector((state: any) => state.user);

  const register = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, policy } = formData;
    const checkConfirmPassword = password === confirmPassword;
    if (!checkConfirmPassword) {
      setPasswordError("비밀번호 중복확인이 일치하지 않습니다.");
      return;
    }
    if (!policy) {
      setPolicyError(true);
      return;
    }
    setPasswordError("");
    setPolicyError(false);
    dispatch(registerUser({ name, email, password, navigate }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let { id, value, type, checked } = event.target;
    if (id === "confirmPassword" && passwordError) setPasswordError("");
    if (type === "checkbox") {
      if (policyError) setPolicyError(false);
      setFormData((prevState) => ({ ...prevState, [id]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [id]: value }));
    }
  };

  return (
    <main className="w-full border min-h-screen flex flex-col items-center">
      {registrationError && <p className="text-red-600">{registrationError}</p>}
      <h1 className="text-[40px] font-bold mt-[40px]">Register</h1>
      <form onSubmit={register} className="form">
        <label className="mt-[60px] form-label">Name</label>
        <input
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          placeholder="user name"
          required
        />
        <label className="form-label">Email</label>
        <input
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="you@example.com"
          required
        />
        <label className="form-label">Password</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter 6 characters or more"
          required
        />
        <label className="form-label">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
          placeholder="Re-enter your password"
          required
        />
        {passwordError && <p className="text-red-600">{passwordError}</p>}
        <div className="flex gap-4">
          <input
            id="policy"
            type="checkbox"
            checked={formData.policy}
            onChange={handleChange}
          />
          <p>이용약관에 동의합니다.</p>
        </div>
        {policyError && (
          <p className="text-red-600">
            You must agree to the terms and conditions.
          </p>
        )}
        <button
          type="submit"
          className="bg-red-600 text-white p-[8px] rounded-lg mt-[40px] text-[20px] font-bold"
        >
          Register
        </button>
      </form>
    </main>
  );
}
