import Image from "next/image";
import { TodoList } from "../../components/TodoList";
import CompletedTask from "../../components/CompletedTask";

export default function Home() {
  return (
    <>
      <TodoList />
      <CompletedTask />
    </>
  );
}
