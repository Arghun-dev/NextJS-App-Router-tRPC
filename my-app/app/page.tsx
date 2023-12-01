import { serverClient } from "@/app/_trpc/serverClient";

import TodoList from "@/components/TodoList";

export default async function Home() {
  const todos = await serverClient.getTodos();
  return (
    <div className="container m-16">
      <TodoList initialTodos={todos} />
    </div>
  );
}
