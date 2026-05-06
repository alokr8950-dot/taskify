import React, { useState } from "react";
import {
  useCreateTaskMutation,
  useGetAllTaskQuery,
  useDeleteRestoreTaskMutation,
} from "../redux/slices/api/taskApiSlice";

const Admin = () => {
  const [title, setTitle] = useState("");

  const { data, refetch, isLoading } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "",
    search: "",
  });

  const [createTask, { isLoading: creating }] =
    useCreateTaskMutation();

  const [deleteTask] = useDeleteRestoreTaskMutation();

  // ➕ Add Task
  const handleAdd = async () => {
    if (!title) return alert("Enter task");

    try {
      await createTask({
        title,
        stage: "todo",
        priority: "low",
        date: new Date(),
        team: [],
      }).unwrap();

      setTitle("");
      refetch();
    } catch (err) {
      console.log(err);
      alert("Error creating task");
    }
  };

  // ❌ Delete Task
  const handleDelete = async (id) => {
    try {
      await deleteTask({
        id,
        actionType: "delete",
      }).unwrap();

      refetch();
    } catch (err) {
      console.log(err);
      alert("Error deleting task");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">
        Admin Panel
      </h1>

      <div className="mt-6 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          className="border p-2 rounded w-80"
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={creating}
        >
          {creating ? "Adding..." : "Add Task"}
        </button>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.tasks?.length > 0 ? (
          data.tasks.map((task) => (
            <div
              key={task._id}
              className="flex justify-between border p-3 mb-2 rounded"
            >
              <span>{task.title}</span>

              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default Admin;