'use client';

import { useRouter } from 'next/navigation';
import { UserButton } from "@stackframe/stack";

export default function Home() {
  const router = useRouter();

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="p-4">
      <UserButton />
      <button 
        onClick={goToDashboard}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
