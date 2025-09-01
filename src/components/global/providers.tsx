import { ClerkProvider } from "@clerk/nextjs";
import React, { PropsWithChildren } from "react";
import { SWRConfig } from "swr";

type Props = PropsWithChildren<object>;

const Providers = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          revalidateIfStale: false,
        }}
      >
        {children}
      </SWRConfig>
    </ClerkProvider>
  );
};

export default Providers;
