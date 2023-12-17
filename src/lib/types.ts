import { FilePondFile } from "filepond";
import { Dispatch } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

// export enum UserKeys {
//   STATUS = "status",
//   NAME = "name",
// }

// export type UsePaginatedItemsProps<T> = {
//   queryKey: string[];
//   queryFn: () => Promise<T[]>;
//   rowsPerPage: number;
// };

// export type Country = Record<string, string>;

export type FormPrompt = {
  to: "login" | "signup";
};

export type Children = {
  children: React.ReactNode;
};

export type ClassName = {
  className?: string;
};

export type Heading = Children & ClassName;
export type FormData = {
  nationality: string;
  email: string;
  password: string;
  username: string;
  image: File;
  confirmPassword: string;
};
export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password length must be greater than 6"),
    nationality: z.set(z.string()),
    username: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password length must be greater than 6"),
  remember: z.boolean().optional(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const resetSchema = z.object({
  email: z.string().email(),
});

export type TResetSchema = z.infer<typeof resetSchema>;

export const updateSchema = z
  .object({
    password: z.string().min(6, "Password length must be greater than 6"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TUpdateSchema = z.infer<typeof updateSchema>;

export type NationalitySelectProps = {
  register?: UseFormRegister<TSignUpSchema>;
  control: Control<TSignUpSchema>;
  formError: FieldErrors<TSignUpSchema>;
};

export type ImageUploadProps = {
  file: FilePondFile[];
  setFile: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
};

export type ChatFormProps = {
  setUserMessages: Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean
  error: string
};

export type ChatHeaderProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export type ChatBodyProps = {
  userMessages: string[];
  setError: Dispatch<React.SetStateAction<string>>;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean
};

export type ChatClient = {
  success: boolean;
  data: {
    id: number,
    slug: string,
    is_banned: boolean,
    image: string,
    created_at: Date,
    updated_at: Date,
  };
  message: string
}

export type User = {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    avatar: string;
    clientChatSlug: string;
    nationality: string;
    username: string;
  };
  identities: Identity[];
  created_at: string;
  updated_at: string;
};

type Identity = {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
};

export type Conversation = {
  success: boolean;
  data: {
    conversation: {
      id: number;
      slug: string;
      input: string;
      output: string;
      topic: string;
    };
    bot: {
      id: number;
      slug: string;
      name: string;
      image: string;
    };
    client: {
      id: number;
      slug: string;
      is_banned: boolean;
      image: string;
    };
    features: unknown[];
    metadata: {
      version: string;
      date: string;
      duration: number;
    };
  };
  message: string;
};
