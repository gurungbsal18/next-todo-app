"use client";
import React, { useEffect, useState } from "react";
import DeleteList from "./DeleteList";
import Link from "next/link";

export const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/todo");
        const data = await response.json(); // Parse the JSON response
        setTodoList(data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item._id !== id)); // Use _id instead of id
  };

  return (
    <div className="w-2xl py-4">
      {todoList.map((list) => (
        <div
          className="flex justify-between items-center gap-4 mb-5 p-4 rounded-md shadow-lg bg-gray-200" // Fixed className
          key={list._id} // Use _id as the key
        >
          <div>
            <p className="font-bold">{list.title}</p>
            <p>{list.description}</p>
          </div>

          <div className="flex gap-2 items-center">
            <Link href={`/edit/${list._id}`}>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                Edit
              </button>
            </Link>
            <DeleteList id={list._id} onDelete={handleDelete} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
