"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { toast } from "react-toastify";
type Steps = "JOB" | "COMPANY" | "PREVIEW" | "CONFIRMATION";

const JobPostingDetails = ({ next }: { next: () => void }) => {
  const initialValue = { description: "", location: "", title: "" };
  const [newJobFields, setNewJobFields] = useState(initialValue);

  type EmptyCheckableFields = Record<string, string>;

  const areAnyFieldsEmpty = (fields: EmptyCheckableFields): boolean => {
    for (const key in fields) {
      if (fields.hasOwnProperty(key) && fields[key] === "") {
        return true; // Return true if any field is empty
      }
    }
    return false; // Return false if all fields are non-empty
  };

  const notify = ({ cb, msg }: { msg: string; cb?: () => void }) =>
    toast.success(msg, {
      onClose: cb,
    });

  const submitHanlder = (e: FormEvent) => {
    e.preventDefault();
    // setNewJobFields(initialValue);

    // notify({ msg: "Complete" });
    next();
  };

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNewJobFields((current) => ({ ...current, [name]: value }));
  };
  return (
    <form onSubmit={submitHanlder} className="w-3/4 flex flex-col gap-5">
      <div className="flex gap-5">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            required
            name="title"
            value={newJobFields.title}
            onChange={changeHandler}
            type="text"
            placeholder="Front End Engineer"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            required
            name="location"
            value={newJobFields.location}
            onChange={changeHandler}
            type="text"
            placeholder="Remote"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          required
          name="description"
          value={newJobFields.description}
          onChange={changeHandler}
          placeholder="Front End Engineer"
          rows={10}
          className="textarea w-full textarea-bordered"
        />
      </div>
      <div>
        <button
          disabled={areAnyFieldsEmpty(newJobFields)}
          className="btn btn-primary"
        >
          Create Listing
        </button>
      </div>
    </form>
  );
};

const Page = () => {
  const [step, setSteps] = useState<Steps>("JOB");
  const steps: Steps[] = ["JOB", "COMPANY", "PREVIEW", "CONFIRMATION"];
  const next = () => {
    const currentStep = steps.findIndex((value) => value === step);
    if (currentStep + 1 >= steps.length) {
      return;
    } else {
      const step = steps[currentStep + 1];
      setSteps(step);
    }
  };
  const RenderStep = () => {
    switch (step) {
      case "JOB":
        return <JobPostingDetails next={next} />;
      case "COMPANY":
        return <>Company</>;
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
