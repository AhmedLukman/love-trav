import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import { type Country } from "../../lib/types";
import ImageUpload from "../../ui/ImageUpload";

const SignupForm = () => {
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const toggleEyeVisibility = () => setIsEyeVisible(!isEyeVisible);
  const fetchCountries = async () => {
    const res = await fetch("https://flagcdn.com/en/codes.json");
    if (!res.ok) throw new Error("Smething wrong happened");
    const data = (await res.json()) as Country;
    if (!data) throw new Error("Country is empty");
    return data;
  };
  const { isLoading, data, error } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const countryArray = data ? Object.entries(data) : [];
  const sortedCountryArray = countryArray.sort((a, b) =>
    a[1].localeCompare(b[1]),
  );

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
      <Select
        isRequired
        isInvalid={!!error?.message}
        isLoading={isLoading}
        errorMessage={error?.message}
        items={sortedCountryArray}
        color="warning"
        label="Nationality"
        labelPlacement="outside"
        className="mb-5"
        classNames={{
          trigger: "h-14",
        }}
        variant="bordered"
        renderValue={(items) => {
          return items.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <Avatar
                alt={item.textValue}
                className="flex-shrink-0"
                size="sm"
                src={`https://flagcdn.com/${item.key}.svg`}
              />
              <span>{item.textValue}</span>
            </div>
          ));
        }}
      >
        {(country) => (
          <SelectItem
            key={country[0]} // Assuming the country key is the first element in the tuple
            startContent={
              <Avatar
                alt={country[1]} // Assuming the country value is the second element in the tuple
                className="h-6 w-6"
                src={`https://flagcdn.com/${country[0]}.svg`}
              />
            }
          >
            {country[1]}
          </SelectItem>
        )}
      </Select>

      <ImageUpload />

      <div className="mb-10 mt-5 flex justify-between">
        <Checkbox color="warning">Remember me?</Checkbox>
        <Link href="/reset" color="foreground">
          Forgot password?
        </Link>
      </div>
      <Button
        type="submit"
        radius="sm"
        className="mb-3 w-full bg-gradient-to-tr from-pink-500 to-yellow-500 font-bold text-white"
      >
        Sign up
      </Button>
      <p>
        Already have an account? Click{" "}
        <Link underline="always" href="/login" color="foreground">
          here
        </Link>{" "}
        to login
      </p>
    </form>
  );
};

export default SignupForm;
