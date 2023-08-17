"use client";

interface Framework {
  value: string;
  label: string;
  language: string;
}
interface Language {
  value: string;
  label: string;
}
import Select from "react-select";
import React, { useEffect, useMemo, useReducer } from "react";
type State = {
  language: Language;
  framework: Framework;
  programmingLanugages: Language[];
  frameworks: Framework[];
};
type Action =
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "SET_FRAMEWORK"; payload: Framework };

const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
        frameworks: state.frameworks.filter(
          (framework) => framework.language === action.payload.value
        ),
        framework: {
          label: "",
          language: "",
          value: "",
        },
      };
    case "SET_FRAMEWORK":
      return { ...state, framework: action.payload };
    default:
      return state;
  }
};

const Settings = () => {
  const programmingLanugages = [
    {
      value: "Javascript",
      label: "Javascript",
    },
    {
      value: "Typescript",
      label: "Typescript",
    },
    {
      value: "Python",
      label: "Python",
    },
    {
      value: "C++",
      label: "C++",
    },
    {
      value: "C#",
      label: "C#",
    },
    {
      value: "Java",
      label: "Java",
    },
    {
      value: "PHP",
      label: "PHP",
    },
    {
      value: "Go",
      label: "Go",
    },
    {
      value: "Dart",
      label: "Dart",
    },
    {
      value: "Swift",
      label: "Swift",
    },
    {
      value: "Ruby",
      label: "Ruby",
    },
    {
      value: "Kotlin",
      label: "Kotlin",
    },
    {
      value: "Rust",
      label: "Rust",
    },
    {
      value: "Julia",
      label: "Julia",
    },
  ];
  const frameworks = [
    {
      value: "Angular",
      label: "Angular",
      language: "Javascript",
    },
    {
      value: "Next JS",
      label: "Next JS",
      language: "Javascript",
    },
    {
      value: "Express JS",
      label: "Express JS",
      language: "Javascript",
    },
    {
      value: "Svelte",
      label: "Svelte",
      language: "Javascript",
    },
    {
      value: "Vue Js",
      label: "Vue Js",
      language: "Javascript",
    },
    {
      value: "Gatsby",
      label: "Gatsby",
      language: "Javascript",
    },
    {
      value: "React JS",
      label: "React JS",
      language: "Javascript",
    },
    {
      value: "Flask",
      label: "Flask",
      language: "Python",
    },
    {
      value: "Django",
      label: "Django",
      language: "Python",
    },
  ];
  const initialState: State = {
    framework: {
      value: "",
      language: "",
      label: "",
    },
    language: {
      label: "",
      value: "",
    },
    frameworks: frameworks,
    programmingLanugages: programmingLanugages,
  };

  const [state, dispatch] = useReducer(counterReducer, initialState);

  const data = useMemo(() => {
    return frameworks.filter(
      (framework) => framework.language === state.language.value
    );
  }, [state]);

  return (
    <div className="container mx-auto p-5 flex flex-col gap-5">
      <div className="min-w-min">
        <div className="form-control">
          <label htmlFor="language" className="label">
            Language
          </label>
          <Select
            id="language"
            name="language"
            value={state.language}
            onChange={(e) => dispatch({ type: "SET_LANGUAGE", payload: e! })}
            options={programmingLanugages}
            className="w-1/4"
            placeholder="Select a programming language"
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="framework" className="label">
            Framework / Library
          </label>
          <Select
            name="framework"
            id="framework"
            isDisabled={state.language.label === ""}
            value={state.framework}
            onChange={(e) => dispatch({ type: "SET_FRAMEWORK", payload: e! })}
            options={data}
            className="w-1/4"
            placeholder="Select a framework"
          />
        </div>
      </div>
    </div>
  );
};
export default Settings;
