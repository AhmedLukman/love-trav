import { useState } from "react";

import ImageUpload from "../../ui/ImageUpload";
import NationalitySelect from "../../ui/NationalitySelect";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { useForm } from "react-hook-form";
import FormPrompt from "../../ui/FormPrompt";

const SignupForm = () => {
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const toggleEyeVisibility = () => setIsEyeVisible(!isEyeVisible);

  const { register } = useForm();

  return (
    <form className="mt-8">
      <Input
        {...register("name")}
        isRequired
        type="text"
        variant="bordered"
        isInvalid={false}
        errorMessage=""
        label="Username"
        className="mb-5 placeholder:text-black"
        color="warning"
      />
      <Input
        {...register("email")}
        isRequired
        type="email"
        variant="bordered"
        isInvalid={false}
        errorMessage=""
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
        isInvalid={false}
        errorMessage=""
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

      <NationalitySelect />

      <ImageUpload />

      <Button
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
