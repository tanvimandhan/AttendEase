
import { 
    CalendarCheck, 
    BarChart3, 
    BellRing, 
    FileCheck,
    UserCheck,
    ClipboardCheck 
  } from "lucide-react";
  
  const features = [
    {
      icon: <CalendarCheck className="h-10 w-10 text-[#2563eb]" />,
      title: "Easy Attendance Tracking",
      description: "Quickly mark attendance with just a few clicks. Save time and focus on teaching."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-[#2563eb]" />,
      title: "Comprehensive Reports",
      description: "Generate detailed attendance reports and analyze patterns to improve student engagement."
    },
    {
      icon: <BellRing className="h-10 w-10 text-[#2563eb]" />,
      title: "Automated Notifications",
      description: "Send automatic alerts to students and parents about absences and attendance issues."
    },
    {
      icon: <FileCheck className="h-10 w-10 text-[#2563eb]" />,
      title: "Data Export",
      description: "Export attendance data in multiple formats for integration with your existing systems."
    },
    {
      icon: <UserCheck className="h-10 w-10 text-[#2563eb]" />,
      title: "User Management",
      description: "Manage teacher and student accounts with flexible permission controls."
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-[#2563eb]" />,
      title: "Batch Processing",
      description: "Process multiple classes or students at once to speed up your workflow."
    }
  ];
  
  const FeatureSection = () => {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features for <span className="text-#2563eb">Effortless Attendance</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our attendance tracking system comes packed with tools designed to simplify administrative tasks and improve educational outcomes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm card-hover border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-20 p-8 bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] rounded-lg text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Streamline Your Attendance Process?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of educational institutions already using our system to save time and improve outcomes.
            </p>
            <button 
              className="bg-white text-[#2563eb] py-3 px-8 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              onClick={() => console.log("Start Free Trial clicked")}
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default FeatureSection;