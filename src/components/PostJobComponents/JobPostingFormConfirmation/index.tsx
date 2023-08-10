import { useFormState } from "@/context/FormContext";

const JobPostingFormConfirmation = () => {
  const { formState } = useFormState();
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title">Job Posted for {formState.title} !</h1>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Share</button>
        </div>
      </div>
    </div>
  );
};
export default JobPostingFormConfirmation;
