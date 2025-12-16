import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch employees and departments
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [empRes, depRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/api/employees/all-users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_BASE_URL}/api/departments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!empRes.ok || !depRes.ok) throw new Error("Failed to fetch data");

        const employeesData = await empRes.json();
        const departmentsData = await depRes.json();

        setEmployees(Array.isArray(employeesData) ? employeesData : []);
        setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
      } catch (error) {
        toast.error("Error fetching data", { description: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update employee department
  const handleDepartmentChange = async (userId, departmentId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/employees/update-department`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, department_id: departmentId }),
      });

      if (!res.ok) throw new Error("Failed to update department");

      setEmployees((prev) =>
        prev.map((e) =>
          e.user_id === userId
            ? { ...e, department_name: departments.find(d => d.id === +departmentId)?.name || "UNassigned" }
            : e
        )
      );

      toast.success("Updated", { description: "Employee department updated" });
    } catch (error) {
      toast.error("Error", { description: error.message });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((emp, index) => (
          <TableRow key={emp.user_id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{emp.user_name}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.status}</TableCell>
            <TableCell>
              <Select
                defaultValue={emp.department_name === "UNassigned" ? "" : String(departments.find(d => d.name === emp.department_name)?.id)}
                onValueChange={(value) => handleDepartmentChange(emp.user_id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={String(dept.id)}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesList;
