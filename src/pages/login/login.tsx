import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/login-form/login-form";
import { UserFormData, UserFormResolver } from "../../entities/UserSchema";
import { useLoginMutation } from "../../services/users-api";

const Login = () => {
  const [login, { error, isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: UserFormResolver,
  });
  const navigate = useNavigate();
  const handleLogin = async (data: UserFormData) => {
    try {
      await login(data).unwrap();
      navigate("/products");
    } catch (error) {
      alert("Failed to login");
    }
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
