"use client";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteList = ({ id, onDelete }) => {
  const router = useRouter();
  console.log("DeleteList ID:", id);
  const deleteList = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/todo?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete data");
      }

      console.log(`Todo with id ${id} deleted successfully`);

      // Call the onDelete callback to update the UI after deletion
      if (onDelete) {
        onDelete(id);
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="bg-red-800 text-white px-4 py-2 rounded-md"
      onClick={deleteList}
    >
      Delete
    </button>
  );
};

export default DeleteList;
