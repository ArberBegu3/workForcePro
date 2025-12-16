import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';

const TasksList = ({ isListView, tasks, setTasks }) => {

  const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // must include this
      },
    });

    if (!res.ok) throw new Error("Delete failed");

    // Update UI immediately
    setTasks(tasks.filter(t => t.id !== id));
    toast.success("Task deleted");
  } catch (err) {
    toast.error(err.message);
  }
};


  return (
    <div className={isListView ? "space-y-4" : "grid grid-cols-3 gap-4"}>
      {tasks.map(task => (
        <div key={task.id} className="p-4 border rounded shadow flex justify-between items-center">
          <div>
            <h2 className="font-bold">{task.title}</h2>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <p className="text-xs text-muted-foreground">Assigned to: {task.assigned_to_name || "Unassigned"}</p>
            <p className="text-xs text-muted-foreground">Status: {task.status}</p>
          </div>
          <Button size="icon" onClick={() => deleteTask(task.id)}>
            <Trash/>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
