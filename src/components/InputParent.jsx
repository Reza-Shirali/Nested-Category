import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const createNewInput = (value = "", parentValue = "") => ({
  id: Math.random(),
  value,
  parentValue,
  children: [],
  isCopy: false,
});

const InputParent = () => {
  const [inputs, setInputs] = useState([createNewInput()]);

  const copyInput = (input) => {
    return {
      ...input,
      id: Math.random(),
      isCopy: true,
      children: input.children.map((child) => copyInput(child)),
    };
  };

  const handleInputChange = (id, event) => {
    const updateInputs = (inputsList) =>
      inputsList.map((input) => {
        if (input.id === id) {
          return { ...input, value: event.target.value };
        } else if (input.children.length > 0) {
          return { ...input, children: updateInputs(input.children) };
        }
        return input;
      });
    setInputs(updateInputs(inputs));
  };

  const handleUpdateInput = (id, newValue) => {
    const updateInputs = (inputsList) =>
      inputsList.map((input) => {
        if (input.id === id || input.isCopy) {
          return { ...input, value: newValue };
        } else if (input.children.length > 0) {
          return { ...input, children: updateInputs(input.children) };
        }
        return input;
      });
    setInputs(updateInputs(inputs));
  };

  const addNewInput = (parentId, parentValue) => {
    const updateInputs = (inputsList) =>
      inputsList.map((input) => {
        if (input.id === parentId) {
          return {
            ...input,
            children: [...input.children, createNewInput("", input.value)],
          };
        } else if (input.children.length > 0) {
          return { ...input, children: updateInputs(input.children) };
        }
        return input;
      });
    setInputs(updateInputs(inputs));
  };

  const handleCopyInput = (inputId) => {
    const updateInputs = (inputsList) => {
      let newInputsList = [...inputsList];
      const findAndCopyInput = (list) => {
        return list.flatMap((input) => {
          if (input.id === inputId) {
            const copiedInput = copyInput(input);
            return [input, copiedInput];
          } else if (input.children.length > 0) {
            return {
              ...input,
              children: findAndCopyInput(input.children),
            };
          }
          return input;
        });
      };
      newInputsList = findAndCopyInput(newInputsList);
      return newInputsList;
    };
    setInputs(updateInputs(inputs));
  };

  const handleDeleteInput = (inputId) => {
    if (inputId === inputs[0].id) {
      alert("You cannot delete the root input!");
      return;
    }
    const updateInputs = (inputsList) =>
      inputsList
        .filter((input) => input.id !== inputId)
        .map((input) => ({
          ...input,
          children: updateInputs(input.children),
        }));
    setInputs(updateInputs(inputs));
  };

  const renderInputs = (inputsList, level = 0) => {
    return inputsList.map((input) => (
      <div
        key={input.id}
        className="w-full"
        style={{
          position: "relative",
          border: input.isCopy ? "2px dashed #FF0000" : "none",
          borderRadius: input.isCopy ? "8px" : "0",
          padding: input.isCopy ? "10px" : "0",
        }}
      >
        {input.isCopy && (
          <span
            style={{
              position: "absolute",
              top: "-12px",
              right: "10px",
              backgroundColor: "#FF0000",
              color: "#FFF",
              padding: "2px 8px",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            Copy
          </span>
        )}
        <div
          className="p-3 w-full flex gap-3 justify-between items-center border-[#EBD3F8] border-4 rounded-2xl"
          style={{ marginLeft: `${level * 20}px`, marginBottom: "10px" }}
        >
          <input
            type="text"
            value={input.value}
            onChange={(event) => handleInputChange(input.id, event)}
            placeholder={
              input.parentValue
                ? `${input.parentValue} -> New Child`
                : "New Parent"
            }
            className="w-[90%] text-white font-bold text-xl h-14 rounded-lg border-4 bg-transparent outline-none px-2 border-[#2E073F]"
          />
          <button
            onClick={() => addNewInput(input.id, input.value)}
            className="border-4 text-[#7A1CAC] py-2 hover:bg-slate-300 px-3 rounded-lg font-bold"
          >
            Add
          </button>
          <button
            onClick={() => handleUpdateInput(input.id, input.value)}
            className="border-4 text-[#7A1CAC] py-2 hover:bg-slate-300 px-3 rounded-lg font-bold"
          >
            Update
          </button>
          <button
            onClick={() => handleCopyInput(input.id)}
            className="border-4 text-[#7A1CAC] py-2 hover:bg-slate-300 px-3 rounded-lg font-bold"
          >
            Copy
          </button>
          <button
            onClick={() => handleDeleteInput(input.id)}
            className="border-4 text-[#7A1CAC] py-2 hover:bg-slate-300 px-3 rounded-lg font-bold"
          >
            <FaRegTrashAlt className="text-2xl" />
          </button>
        </div>
        {input.children.length > 0 && (
          <div className="ml-8">{renderInputs(input.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-4 max-w-[1400px] m-auto">
      {renderInputs(inputs)}
    </div>
  );
};

export default InputParent;
