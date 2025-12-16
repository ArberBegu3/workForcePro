import React from 'react'
import DashboardLayout from '../DashboardLayout'
import Header from '@/components/shared/dashboard/Header'
import EditDepartmentCard from '@/components/shared/dashboard/department/EditDepartmentCard'
import DepartmentEmployees from '@/components/shared/dashboard/department/DepartmentEmployees'

const EditDepartmentPage = () => {
  return (
    <DashboardLayout >
        <Header title='Department details'
        subtitle="here u can edit departments name and assign or remove employees from this departemnt ">
            <div className='flex lg:flex-row flex-col gap-5'>
                 <EditDepartmentCard/>
               
            </div>

            <div className='w-full h-screen'>
                 <DepartmentEmployees/>
            </div>
        </Header>
    </DashboardLayout>
  )
}

export default EditDepartmentPage