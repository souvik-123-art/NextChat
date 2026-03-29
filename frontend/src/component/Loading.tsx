import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900">
      <Loader2 className="h-12 w-12 animate-spin text-white" />
    </div>
  );
};

export default Loading;
