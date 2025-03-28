"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditPage = ({ params }: { params: { id; string } }) => {
  const { id } = params; // Get the id from the route parameter
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/todo/${id}`);
        const data = await response.json();
        setNewTitle(data.title);
        setNewDescription(data.description);
      } catch (error) {
        console.log("Error while fetching todo item", error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update todo");
      }

      router.push("/"); // Redirect back to the main page after updating
    } catch (error) {
      console.log("Error while updating todo", error);
    }
  };

  return (
    <div className="w-2xl my-5">
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-500 p-2 rounded-md"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border border-gray-500 p-2 rounded-md"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;
