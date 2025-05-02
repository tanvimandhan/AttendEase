'use client';

 import { useRouter } from 'next/navigation';
// import { UserButton } from "@stackframe/stack";

// export default function Home() {
//   const router = useRouter();

//   const goToDashboard = () => {
//     router.push('/dashboard');
//   };

//   return (
//     <div className="p-4">
//       <UserButton />
//       <button 
//         onClick={goToDashboard}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Go to Dashboard
//       </button>
//     </div>
//   );
// }
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components//ui/HeroSection";
import FeatureSection from "@/components/ui/FeatureSection";
import Footer from "@/components/ui/Footer";

const Index = () => {
  const router = useRouter();

  const goToDashboard = () => {
    router.push('/dashboard');
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <div className='p-4'>
        {/* <button 
        onClick={goToDashboard}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Dashboard
      </button> */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;