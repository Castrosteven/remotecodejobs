"use client";
import { useFormState } from "@/context/FormContext";
import { ChangeEvent, FormEvent, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

const JobPostingDetails = () => {
  const { next, formState, changeHandler, setFormState } = useFormState();

  const submitHanlder = (e: FormEvent) => {
    e.preventDefault();
    // setNewJobFields(initialValue);
    log();
    // notify({ msg: "Complete" });
    next();
  };
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      changeHandler({
        target: {
          name: "description",
          value: editorRef.current.getContent(),
        },
      } as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <form
      onSubmit={submitHanlder}
      className="w-full md:w-3/4 flex flex-col gap-5 "
    >
      <div className="flex gap-5">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <input
            required
            name="title"
            value={formState.title}
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
            value={formState.location}
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
        <Editor
          apiKey="37cs1s4f8xbvm39jkg981ytbyb2g9ykyqmuai6pud6o8iojq"
          plugins="wordcount"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={formState.description}
          init={{
            height: 500,
            menubar: false,
          }}
        />
      </div>
      <div>
        <button className="btn btn-primary">Create Listing</button>
      </div>
    </form>
  );
};

export default JobPostingDetails;
