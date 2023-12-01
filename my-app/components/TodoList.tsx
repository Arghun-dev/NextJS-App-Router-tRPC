"use client";

import { useState } from "react";
import { trpc } from "@/app/_trpc/client";

export default function TodoList() {
  const getTodos = trpc.getTodos.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });
  const [content, setContent] = useState("");

  const handleAddTodo = async () => {
    if (content.length == 0) return;

    addTodo.mutate(content);
    setContent("");
  };

  return (
    <div>
      <div className="mb-8">
        {getTodos?.data?.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              id={`check-${todo.id}`}
              type="checkbox"
              checked={!!todo.done}
              style={{ zoom: 1.5 }}
              onChange={async () => {
                setDone.mutate({
                  id: todo.id,
                  done: todo.done ? 0 : 1,
                });
              }}
            />
            <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-1/3 items-start">
        <label htmlFor="content">Content</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-black border border-gray-300 p-2 my-6"
          placeholder="enter content"
        />
        <button
          onClick={handleAddTodo}
          className="bg-slate-700 text-white p-2 rounded-md cursor-pointer"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
