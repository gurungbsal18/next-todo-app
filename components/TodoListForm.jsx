"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TodoListForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to update ");
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-2xl my-5">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="To do list"
          className="border border-gray-500 p-2 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="To do list description"
          className="border border-gray-500 p-2 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-800 py-2 rounded-md text-white hover:bg-gray-950"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TodoListForm;
