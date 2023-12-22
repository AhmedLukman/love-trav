import { FilePondFile } from "filepond";
import { Dispatch } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { loginSchema, resetSchema, signUpSchema, updateSchema } from "./schemas";

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

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TLoginSchema = z.infer<typeof loginSchema>;

export type TResetSchema = z.infer<typeof resetSchema>;

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
  setUserMessage: Dispatch<React.SetStateAction<string>>;
};

export type ChatHeaderProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};

export type ChatBodyProps = {
  isOpen: boolean;
};

export type ChatClient = {
  success: boolean;
  data: {
    id: number;
    slug: string;
    is_banned: boolean;
    image: string;
    created_at: Date;
    updated_at: Date;
  };
  message: string;
};

// export type User = {
//   id: string;
//   aud: string;
//   role: string;
//   email: string;
//   email_confirmed_at: string;
//   phone: string;
//   confirmation_sent_at: string;
//   confirmed_at: string;
//   last_sign_in_at: string;
//   app_metadata: {
//     provider: string;
//     providers: string[];
//   };
//   user_metadata: {
//     avatar: string;
//     clientChatSlug: string;
//     nationality: string;
//     username: string;
//   };
//   identities: Identity[];
//   created_at: string;
//   updated_at: string;
// };

// type Identity = {
//   identity_id: string;
//   id: string;
//   user_id: string;
//   identity_data: {
//     email: string;
//     email_verified: boolean;
//     phone_verified: boolean;
//     sub: string;
//   };
//   provider: string;
//   last_sign_in_at: string;
//   created_at: string;
//   updated_at: string;
//   email: string;
// };

export type ConversationResponse = {
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

export type ConversationInput = {
  input: string;
  output: string;
  bot_id: number;
  client_slug: string;
};

export type ConversationFetch = {
  data: Conversation;
  error: Error;
};

export type Conversation = {
  id: number;
  input: string;
  output: string;
  clients: { image: string };
  bot: { image: string; name: string };
}[];

export type ConversationParams = {
  clientChatSlug: string;
};
