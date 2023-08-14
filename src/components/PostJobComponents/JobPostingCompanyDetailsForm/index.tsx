"use client";
import { useFormState } from "@/context/FormContext";
import { FormEvent } from "react";

const CompanyDetails = () => {
  const { back, changeHandler, formState, next, setFormState } = useFormState();

  type EmptyCheckableFields = Record<string, string>;

  const areAnyFieldsEmpty = (fields: EmptyCheckableFields): boolean => {
    for (const key in fields) {
      if (fields.hasOwnProperty(key) && fields[key] === "") {
        return true; // Return true if any field is empty
      }
    }
    return false; // Return false if all fields are non-empty
  };

  const submitHanlder = (e: FormEvent) => {
    e.preventDefault();
    next();
  };

  return (
    <form
      onSubmit={submitHanlder}
      className="w-full md:w-3/4 flex flex-col gap-5"
    >
      <div className="flex gap-5">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            required
            name="companyName"
            value={formState.companyName}
            onChange={changeHandler}
            type="text"
            placeholder="ABC COMPANY"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <input
            required
            name="companyAddress"
            value={formState.companyAddress}
            onChange={changeHandler}
            type="text"
            placeholder="123 Fake Street"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Website</span>
          </label>
          <input
            required
            name="companyWebsite"
            value={formState.companyWebsite}
            onChange={changeHandler}
            placeholder="www.abcompany.com"
            className="input w-full input-bordered"
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Company Size</span>
          </label>
          <input
            required
            name="companySize"
            value={formState.companySize}
            onChange={changeHandler}
            placeholder="Company Size"
            className="input w-full input-bordered"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={back} className="btn btn-primary">
          Back
        </button>
        <button
          disabled={areAnyFieldsEmpty(formState)}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CompanyDetails;
