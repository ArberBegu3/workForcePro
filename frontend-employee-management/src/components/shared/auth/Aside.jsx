import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Logo from "@/assets/img/WorkForceProLogo.png"


const Aside = () => {
  return (
    <div className="relative overflow-hidden md:flex hidden w-1/4  flex-col justify-between p-10">
      <img src={Logo} alt="fxf" className="w-1/3" />

      <div className="space-y-1">
        <h1 className="text-white font-bold text-4xl">
          WorkForce Pro
        </h1>
        <p className="text-white">the most popular crm in the world</p>
 

      <Link to="/" className="nt-2">
      <Button variant="secondary" size="sm" className="nt-3" >Landing page</Button>
      </Link>

      </div>
    </div>
  )
}

export default Aside