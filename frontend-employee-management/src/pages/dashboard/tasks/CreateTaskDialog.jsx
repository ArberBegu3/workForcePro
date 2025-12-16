import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const CreateTaskDialog = ({ onTaskCreated }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', assigned_to: '', due_date: '', status: 'pending' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/employees/all-users`, {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error(data.message || "Failed to fetch users");
        setUsers(data.filter(u => u.status === 'employee'));
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tasks/create`, {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create task");

      toast.success("Task created");
      setOpen(false);
      setForm({ title: '', description: '', assigned_to: '', due_date: '', status: 'pending' });

      // Call parent callback to update tasks immediately
      if (onTaskCreated) onTaskCreated(data);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create task");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input 
            placeholder="Title" 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
            required 
          />
          <Input 
            placeholder="Description" 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
          />
          <select 
            value={form.assigned_to} 
            onChange={e => setForm({...form, assigned_to: e.target.value})} 
            className="w-full p-2 border rounded"
          >
            <option value="">Unassigned</option>
            {users.map(u => <option key={u.user_id} value={u.user_id}>{u.user_name}</option>)}
          </select>
          <Input 
            type="date" 
            value={form.due_date} 
            onChange={e => setForm({...form, due_date: e.target.value})} 
          />
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;

