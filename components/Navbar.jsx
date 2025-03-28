import Link from "next/link";
import React from "react";
import TodoListForm from "./TodoListForm";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-2xl mt-5 border-b border-gray-300 pb-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">To Do App</h1>
      </Link>
      <Link href="/add">
        <button className="bg-gray-900 text-white py-2 px-4 rounded-md">
          Add New
        </button>
      </Link>
    </div>
  );
};

export default Navbar;
