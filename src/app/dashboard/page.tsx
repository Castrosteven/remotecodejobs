"use client";
import CompanyDetails from "@/components/CompanyDetailsForm";
import JobPostingDetails from "@/components/JobPostingDetailsForm";
import { useFormState } from "@/context/FormContext";

const Page = () => {
  const { step } = useFormState();
  const RenderStep = () => {
    switch (step) {
      case "JOB":
        return <JobPostingDetails />;
      case "COMPANY":
        return <CompanyDetails />;

      case "PREVIEW":
        return <>PREVIEW</>;
      case "CONFIRMATION":
        return <>CONFIRMATION</>;

      default:
        return <></>;
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center flex-col">
        <ul className="steps">
          <li className={`step ${step === "JOB" ? "step-primary" : ""} `}>
            Job Details
          </li>
          <li className={`step ${step === "COMPANY" ? "step-primary" : ""} `}>
            Company Details
          </li>
          <li className={`step ${step === "PREVIEW" ? "step-primary" : ""} `}>
            Preview
          </li>
          <li
            className={`step ${step === "CONFIRMATION" ? "step-primary" : ""} `}
          >
            Confirmation
          </li>
        </ul>
        <>{RenderStep()}</>
      </div>
    </div>
  );
};

export default Page;
