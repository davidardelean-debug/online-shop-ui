import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login-form/login-form";
import { AUTH_ENDPOINT } from "../../constants";
import { UserLoginData } from "../../entities/UserLoginData";
import { UserFormData, UserFormResolver } from "../../entities/UserSchema";
import { useAuth } from "../../hooks/use-auth";
import APIClient from "../../services/api-client";

const Login = () => {
  const { login, accessToken } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: UserFormResolver,
  });
  const navigate = useNavigate();

  const apiClient = new APIClient(AUTH_ENDPOINT + "login", accessToken);
  const handleLogin = (data: UserFormData) => {
    apiClient
      .add<UserLoginData>(data)
      .then((res) => res.json())
      .then((res) => {
        if (res.accessToken) {
          login(res);
        }
        setLoading(false);
        navigate("/products");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Username or password is incorrect.");
        setLoading(false);
      });
  };
  return (
    <LoginForm
      register={register}
      handleSubmit={handleSubmit(handleLogin)}
      errors={errors}
      isSubmitting={isSubmitting}
      loginError={error}
      isLoading={isLoading}
    />
  );
};

export default Login;
