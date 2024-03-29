import { useState } from "react";

import ImageUpload from "../../ui/ImageUpload";
import NationalitySelect from "../../ui/NationalitySelect";
import FormPrompt from "../../ui/FormPrompt";
import { TSignUpSchema } from "../../lib/types";
import { useSignup } from "./useSignup";

import { FilePondFile } from "filepond";
import { Button, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../lib/schemas";

const SignupForm = () => {
  const [isPassEyeVisible, setIsPassEyeVisible] = useState(false);
  const [isConfirmPassEyeVisible, setIsConfirmPassEyeVisible] = useState(false);
  const togglePassEyeVisibility = () => setIsPassEyeVisible(!isPassEyeVisible);
  const toggleConfirmPassEyeVisibility = () =>
    setIsConfirmPassEyeVisible(!isConfirmPassEyeVisible);

  const [file, setFile] = useState<FilePondFile[]>([]); //State stored separately because problems arise with using react hook form

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { signup, isSigningUp } = useSignup();

  const onSubmit = (data: TSignUpSchema) => {
    const nationality = Array.from(data.nationality)[0]; //Nationality returns a set, converts the set to array and takes the first element
    const userData = {
      ...data,
      nationality,
      image: (file[0]?.file as File) || "",
    };
    signup(userData, {
      onSuccess: () => {
        setFile([]);
        reset();
      },
    });
  };

  // const onerror: SubmitErrorHandler<FormData> = (e) => console.log(e);

  return (
    //eslint-disable-next-line
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("username")}
        isRequired
        type="text"
        variant="bordered"
        isInvalid={!!errors.username}
        errorMessage={errors.username?.message}
        label="Username"
        className="mb-5 placeholder:text-black"
        color="warning"
      />
      <Input
        {...register("email")}
        isRequired
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
            onClick={togglePassEyeVisibility}
          >
            {isPassEyeVisible ? (
              <FontAwesomeIcon color="gray" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon color="gray" icon={faEye} />
            )}
          </button>
        }
        type={isPassEyeVisible ? "text" : "password"}
      />
      <Input
        {...register("confirmPassword")}
        className="mb-5"
        label="Confirm password"
        color="warning"
        isRequired
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleConfirmPassEyeVisibility}
          >
            {isConfirmPassEyeVisible ? (
              <FontAwesomeIcon color="gray" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon color="gray" icon={faEye} />
            )}
          </button>
        }
        type={isConfirmPassEyeVisible ? "text" : "password"}
      />
      <NationalitySelect formError={errors} control={control} />
      <ImageUpload file={file} setFile={setFile} />
      <Button
        isLoading={isSigningUp}
        type="submit"
        radius="sm"
        className="mb-3 w-full bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white"
      >
        Sign up
      </Button>
      <FormPrompt to="login" />
    </form>
  );
};

export default SignupForm;
