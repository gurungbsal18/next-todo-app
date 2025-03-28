import connectMongo from "../../../../../lib/db";
import { NextResponse } from "next/server";
import TodoDB from "../../../../../models/todoSchema";

export async function PUT(req, { params }) {
  await connectMongo();
  const { id } = params; // Extract the id from the dynamic route
  const { title, description } = await req.json(); // Extract title and description from the request body

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const updatedTodo = await TodoDB.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "LIST UPDATED", updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 }
    );
  }
}
