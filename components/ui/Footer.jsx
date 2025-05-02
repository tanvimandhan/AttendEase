import { LayoutDashboard, User } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">AttendDash</h3>
            <p className="text-gray-400">
              The simple, efficient solution for tracking student attendance and improving educational outcomes.
            </p>
            {/* <div className="flex gap-4 mt-4">
              <button className="text-white bg-[#2563eb] hover:bg-[#2563eb]/90 p-2 rounded transition-colors">
                <LayoutDashboard className="h-5 w-5" />
              </button>
              <button className="text-white bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 p-2 rounded transition-colors">
                <User className="h-5 w-5" />
              </button>
            </div> */}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">Attendance Tracking</a></li>
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">Analytics & Reports</a></li>
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">Notifications</a></li>
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">User Management</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">API</a></li>
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-[#7dd3fc] transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>support@attenddash.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Education St, Learning City</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AttendDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;