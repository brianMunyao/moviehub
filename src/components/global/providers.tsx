import { ClerkProvider } from "@clerk/nextjs";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<object>;

const Providers = ({ children }: Props) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Providers;
