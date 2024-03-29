import { useState } from "react";

import FormPrompt from "../../ui/FormPrompt";
import { useLogin } from "./useLogin";
import { TLoginSchema } from "../../lib/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/schemas";

const LoginForm = () => {
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const toggleEyeVisibility = () => setIsEyeVisible(!isEyeVisible);
  const { login, isLoggingIn } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: TLoginSchema) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: void reset(),
      },
    );
  };

  return (
    //eslint-disable-next-line
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        isRequired
        {...register("email")}
        type="email"
        variant="bordered"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        label="Email"
        className="mb-5 placeholder:text-black"
        color="warning"
        endContent={<FontAwesomeIcon color="lightgray" icon={faEnvelope} />}
      />
      <Input
        {...register("password")}
        className="mb-5"
        label="Password"
        color="warning"
        isRequired
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleEyeVisibility}
          >
            {isEyeVisible ? (
              <FontAwesomeIcon color="gray" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon color="gray" icon={faEye} />
            )}
          </button>
        }
        type={isEyeVisible ? "text" : "password"}
      />
      <div className="mb-10 flex justify-between">
        <Controller
          name="remember"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              color="warning"
              onValueChange={field.onChange}
              isSelected={field.value}
            >
              Remember me?
            </Checkbox>
          )}
        />

        <Link href="/reset" color="foreground">
          Forgot password?
        </Link>
      </div>
      <Button
        isLoading={isLoggingIn}
        type="submit"
        size="lg"
        radius="sm"
        className="mb-3 w-full bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white focus:border-none"
      >
        Login
      </Button>
      <FormPrompt to="signup" />
    </form>
  );
};

export default LoginForm;
