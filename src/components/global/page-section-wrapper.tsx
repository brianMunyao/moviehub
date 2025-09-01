import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<object>;

const PageSectionWrapper = ({ children }: Props) => {
  return <div className="w-full max-w-7xl">{children}</div>;
};

export default PageSectionWrapper;
