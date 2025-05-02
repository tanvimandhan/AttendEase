import { Button } from "@/components/ui/button";
import { LayoutDashboard, User } from "lucide-react";
import { useRouter } from 'next/navigation';

const HeroSection = () => {
     const router = useRouter();
    
      const goToDashboard = () => {
        router.push('/dashboard');
      };
  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Track Student Attendance <br />
              <span className="bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] bg-clip-text text-transparent">
                Simply and Efficiently
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Streamline your classroom management with our intuitive attendance tracking system designed specifically for educators and institutions.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white px-8 py-6 text-lg"
                onClick={() => console.log("Get Started clicked")}>
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-[#2563eb] text-[#2563eb] px-8 py-6 text-lg"
                onClick={() => console.log("Learn More clicked")}>
                Learn More
              </Button>
            </div>
            {/* <div className="flex gap-4 pt-8 items-center">
              <Button 
                className="bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 gap-2"
                onClick={goToDashboard}>
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Button>
              <Button 
                className="bg-[#2563eb] hover:bg-[#2563eb]/90 gap-2"
                onClick={() => console.log("User ID clicked")}>
                <User className="h-5 w-5" /> User ID
              </Button>
            </div> */}
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#7dd3fc]/30 absolute top-4 left-4 animate-pulse"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] rounded-lg rotate-3 shadow-xl flex items-center justify-center relative animate-float 3s ease-in-out infinite">
                <div className="bg-white m-6 rounded p-6 shadow-inner">
                  <div className="space-y-4">
                    <div className="font-bold text-lg text-[#1e3a8a]">Class Attendance</div>
                    <div className="h-4 bg-[#7dd3fc] rounded w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">P</div>
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">P</div>
                      <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs">A</div>
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs">P</div>
                    </div>
                    <div className="h-4 bg-[#7dd3fc] rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;