import Loading from "@/component/Loading";
import VerifyOtp from "@/component/verifyOtp";
import { Suspense } from "react";

const VerifyPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyOtp />
    </Suspense>
  );
};

export default VerifyPage;
