import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(2, { message: "Username must be at least 2 characters" }),
});

const EditDepartmentCard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { setValue, reset } = form;

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/departments/${id}`, {
            
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load department");

        const data = await response.json();
        setValue("name", data.name || "");
      } catch (error) {
        toast.error("Error", { description: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/departments/update/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify(data), // data is the object with the new department details (e.g., name)
});


      if (!response.ok) {
        throw new Error("Failed to update department.");
      }

      const result = await response.json();
      toast.success("Success", {
        description: `Department "${result.name}" updated successfully.`,
      });

      reset({ name: result.name });
    } catch (error) {
      toast.error("Error", {
        description: error.message || "Failed to update department.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="lg:w-96 w-full">
      <CardHeader>
        <CardTitle>Edit Department</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Department"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditDepartmentCard;
