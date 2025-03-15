
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getCurrentUserEmail, logoutUser } from '@/lib/storage/auth';
import { UserCircle, LogOut } from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const userEmail = getCurrentUserEmail();
  
  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  if (!userEmail) return null;
  
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-6">
      <div className="flex items-center">
        <UserCircle className="h-10 w-10 text-app-blue mr-3" />
        <div>
          <p className="font-medium">{userEmail}</p>
          <p className="text-xs text-gray-500">Wellness Tracker Account</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleLogout}
        className="flex items-center gap-1"
      >
        <LogOut className="h-4 w-4" />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default UserProfile;
