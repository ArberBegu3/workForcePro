import React from 'react'
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import RegisterForm from '@/components/shared/auth/Registerform';
import Aside from '@/components/shared/auth/Aside';

const RegisterPage = () => {
return (
    <div className='h-screen md:flex'>
    <Aside />

      <div className='flex md:w-1/2 h-screen justify-center py-10 items-center bg-white'>
       <Link to="/login" className="absolute top-10 right-10">
       <Button variant="ghost" className="cursor-pointer">Login</Button>
       </Link>

      <RegisterForm />
       
      </div>

    </div>
  )
}

export default RegisterPage