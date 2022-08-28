import React from "react";

export type EditContactProps = {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: boolean;
  set: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
};
