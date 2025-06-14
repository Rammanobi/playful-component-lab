
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Lock, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import FormFieldWithIcon from './FormFieldWithIcon';

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormProps = {
  resetEmail: string;
  setIsResetPassword: (value: boolean) => void;
  onSuccess?: () => void;
  setIsLogin?: (value: boolean) => void;
};

const ResetPasswordForm = ({ 
  resetEmail, 
  setIsResetPassword, 
  onSuccess,
  setIsLogin 
}: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    
    try {
      // Use Supabase's updateUser to change password
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });

      if (error) {
        toast.error("Failed to update password. Please try the reset process again.");
        console.error('Password update error:', error);
      } else {
        toast.success("Password updated successfully!");
        toast.info("You can now log in with your new password");
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        setTimeout(() => {
          setIsResetPassword(false);
          if (setIsLogin) {
            setIsLogin(true);
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error("Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4 text-sm text-gray-600 text-center">
            <p>Enter your new password for: <strong>{resetEmail}</strong></p>
          </div>

          <FormFieldWithIcon
            form={form}
            name="password"
            label="New Password"
            placeholder="••••••"
            type="password"
            Icon={Lock}
          />
          
          <FormFieldWithIcon
            form={form}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••"
            type="password"
            Icon={KeyRound}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => {
            setIsResetPassword(false);
            if (setIsLogin) {
              setIsLogin(true);
            }
          }} 
          className="text-app-blue hover:underline focus:outline-none"
        >
          Back to Login
        </button>
      </div>
    </>
  );
};

export default ResetPasswordForm;
