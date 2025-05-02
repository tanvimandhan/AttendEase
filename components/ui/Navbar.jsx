import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User } from "lucide-react";
import { useRouter } from 'next/navigation';
import { UserButton } from "@stackframe/stack";
import Image from 'next/image';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

  const goToDashboard = () => {
    router.push('/dashboard');
  };
  return (
    <nav className="bg-white shadow-sm py-4 fixed w-full z-10">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-attendance-primary to-attendance-secondary bg-clip-text text-transparent">
            <Image src={'/logo.svg'} width={180} height={50} alt='logo'/>
          </h1>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={() => console.log("Dashboard clicked")}>
            About
          </Button>
          <Button variant="ghost" onClick={() => console.log("Features clicked")}>
            Features
          </Button>
          <Button variant="ghost" onClick={() => console.log("Contact clicked")}>
            Contact
          </Button>
          <div className="flex items-center space-x-2">
            <Button 
              className="bg-[#7dd3fc] hover:bg-[#7dd3fc]/90"
              onClick={goToDashboard}>
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Button>
            {/* <Button 
              className="bg-attendance-primary hover:bg-attendance-primary/90"
              onClick={() => console.log("User ID clicked")}>
              <User className="mr-2 h-4 w-4" /> User ID
            </Button> */}
            <UserButton/>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md mt-2 py-4">
          <div className="flex flex-col space-y-2 px-4">
            <Button variant="ghost" onClick={() => console.log("About clicked")}>
              About
            </Button>
            <Button variant="ghost" onClick={() => console.log("Features clicked")}>
              Features
            </Button>
            <Button variant="ghost" onClick={() => console.log("Contact clicked")}>
              Contact
            </Button>
            <div className="flex flex-col space-y-2 pt-2">
              <Button 
                className="bg-attendance-secondary hover:bg-attendance-secondary/90 w-full"
                onClick={() => {goToDashboard}}>
                <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
              </Button>
              {/* <Button 
                className="bg-attendance-primary hover:bg-attendance-primary/90 w-full"
                onClick={() => console.log("User ID clicked")}>
                <User className="mr-2 h-4 w-4" /> User ID
              </Button> */}
              <UserButton/>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;