import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserCircle, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DOMPurify from 'dompurify';

const SupabaseUserProfile = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };
  
  if (!user) return null;
  
  // Get user initials for avatar fallback
  const getInitials = () => {
    if (profile?.full_name) {
      // Sanitize output before displaying
      const sanitized = DOMPurify.sanitize(profile.full_name);
      return sanitized
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase();
    }
    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };
  
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-6">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{profile?.full_name || user.email}</p>
          <p className="text-xs text-gray-500">Wellness Tracker Account</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Settings</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default SupabaseUserProfile;
