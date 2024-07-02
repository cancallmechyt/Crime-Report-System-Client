import { useState } from "react";
import useAxios from "../../useAxios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await useAxios.post(
        "/members/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/admin/home";
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow p-6 sm:p-8 w-full">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Sign in to your account
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full text-white bg-customBlue hover:bg-customYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
