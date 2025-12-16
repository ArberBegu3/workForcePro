import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import Header from '@/components/shared/dashboard/Header';
import CreateTaskDialog from './CreateTaskDialog';
import Stats from '@/components/shared/dashboard/stats/Stats';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ListTodo } from 'lucide-react';
import TasksList from './TasksList';

const TasksPage = () => {
  const [isListView, setIsListView] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks initially
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error(data.message || "Failed to fetch tasks");
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <DashboardLayout>
      <Header title="Tasks" subtitle="Manage all tasks and assignments.">
        <CreateTaskDialog onTaskCreated={(newTask) => setTasks(prev => [newTask, ...prev])} />
      </Header>

      <Stats />

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">List of all Tasks</h1>
          <div className="flex space-x-2">
            <Button variant={isListView ? "" : "outline"} size="icon" onClick={() => setIsListView(true)}>
              <ListTodo />
            </Button>
            <Button variant={isListView ? "outline" : ""} size="icon" onClick={() => setIsListView(false)}>
              <LayoutDashboard />
            </Button>
          </div>
        </div>

        <TasksList tasks={tasks} isListView={isListView} setTasks={setTasks} />
      </div>
    </DashboardLayout>
  );
};

export default TasksPage;
