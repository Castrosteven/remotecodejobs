"use client";
import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  TextareaHTMLAttributes,
  createContext,
  useContext,
  useState,
} from "react";
type Steps = "JOB" | "COMPANY" | "PREVIEW" | "CONFIRMATION";

interface Context {
  next: () => void;
  back: () => void;
  changeHandler: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  step: Steps;
  formState: {
    description: string;
    location: string;
    title: string;
    companyName: string;
    companyWebsite: string;
    companyAddress: string;
    companySize: string;
  };
  setFormState: Dispatch<
    SetStateAction<{
      description: string;
      location: string;
      title: string;
      companyName: string;
      companyWebsite: string;
      companyAddress: string;
      companySize: string;
    }>
  >;
}
const FormContext = createContext<Context>({} as Context);

export const FormWrapper = ({ children }: { children: ReactNode }) => {
  const steps: Steps[] = ["JOB", "COMPANY", "PREVIEW", "CONFIRMATION"];
  const [step, setSteps] = useState<Steps>("JOB");
  const [formState, setFormState] = useState({
    description: "",
    location: "",
    title: "",
    companyName: "",
    companyWebsite: "",
    companyAddress: "",
    companySize: "",
  });
  const next = () => {
    const currentStep = steps.findIndex((value) => value === step);
    if (currentStep + 1 >= steps.length) {
      return;
    } else {
      const step = steps[currentStep + 1];
      setSteps(step);
    }
  };
  const back = () => {
    const currentStep = steps.findIndex((value) => value === step);
    setSteps(steps[currentStep - 1]);
  };
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };
  return (
    <FormContext.Provider
      value={{
        next,
        back,
        step,
        changeHandler,
        formState,
        setFormState,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormState = () => useContext(FormContext);
