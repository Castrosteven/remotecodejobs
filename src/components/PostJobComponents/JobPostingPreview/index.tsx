import { useFormState } from "@/context/FormContext";

const PreviewJobPost = () => {
  const { formState, back, next } = useFormState();
  return (
    <div className="w-full md:w-3/4 flex flex-col gap-5 h-full">
      <div className="card shadow-xl border w-full flex-1  overflow-y-scroll  ">
        <div className="flex flex-col gap-2 ">
          <div className="card-body">
            <span className="card-title"> {formState.title}</span>
            <span className="text-sm">{formState.companyName}</span>
            <div className="divider"></div>
            <div
              className="prose  max-w-full p-5"
              dangerouslySetInnerHTML={{ __html: formState.description }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
        <button onClick={back} className="btn btn-secondary">
          Back
        </button>
        <button onClick={next} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PreviewJobPost;
