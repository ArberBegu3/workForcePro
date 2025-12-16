import React from 'react'
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import Aside from '@/components/shared/auth/Aside';
import Loginform from '@/components/shared/auth/Loginform';

const LoginPage = () => {
return (
    <div className='h-screen md:flex'>
    <Aside />

      <div className='flex md:w-1/2 h-screen justify-center py-10 items-center bg-white'>
       <Link to="/register" className="absolute top-10 right-10">
       <Button variant="ghost" className="cursor-pointer">Register</Button>
       </Link>

      <Loginform />
      </div>

    </div>
  )
}

export default LoginPage