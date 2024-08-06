import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { UserFormData } from "../../entities/UserSchema";

interface LoginFormProps {
  register: UseFormRegister<UserFormData>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<UserFormData>;
  isSubmitting: boolean;
  isLoading: boolean;
  loginError?: FetchBaseQueryError | SerializedError ;
}

const LoginForm = ({
  register,
  handleSubmit,
  errors,
  isSubmitting,
  isLoading,
  loginError
}: LoginFormProps) => {
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            placeholder="Alexander"
            {...register("username")}
          />
          {errors.username && (
            <p className="field-error">{errors.username.message}</p>
          )}
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="field-error">{errors.password.message}</p>
          )}
        </label>
        <input
          type="submit"
          className="btn"
          value="Login"
        />
        {(isSubmitting || isLoading)  && <p>Logging in....</p>}
      </form>
      {loginError && <p className="field-error">Invalid credentials.</p>}
    </div>
  );
};

export default LoginForm;
