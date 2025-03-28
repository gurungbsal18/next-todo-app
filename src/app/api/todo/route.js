import mongoose from "mongoose";
import connectMongo from "../../../../lib/db";
import { NextResponse } from "next/server";
import TodoDB from "../../../../models/todoSchema";

export async function POST(req) {
  const { title, description } = await req.json();
  await connectMongo();
  await TodoDB.create({ title, description });
  return NextResponse.json({ message: "TO DO Created" }, { status: 201 });
}

export async function GET(req) {
  await connectMongo();
  const todoList = await TodoDB.find();
  return NextResponse.json(todoList);
}

export async function DELETE(req) {
  await connectMongo();
  const id = req.nextUrl.searchParams.get("id");
  await TodoDB.findByIdAndDelete(id);
  return NextResponse.json({ message: "LIST DELETED" }, { status: 200 });
}

// export async function PUT(req) {
//   await connectMongo();
//   const { title, description } = await req.json();
//   const id = req.nextUrl.searchParams.get("id");
//   const newTodo = await TodoDB.findByIdAndUpdate(id, { title, description });
//   return NextResponse.json(
//     { message: "LIST UPDATED" },
//     { status: 200 },
//     newTodo
//   );
// }
