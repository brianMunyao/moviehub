import React from "react";

import { IconType } from "@/types/IconType";
import { FileWarning } from "lucide-react";

type Props = {
  Icon: IconType;
  title: string;
  description?: string;
};

const NotFoundSection = ({ Icon = FileWarning, title = "Not Found", description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
      <Icon className="size-10" />

      <h2 className="text-2xl font-bold text-gray-300">{title}</h2>

      {description && <p className="text-gray-500">{description}</p>}
    </div>
  );
};

export default NotFoundSection;
