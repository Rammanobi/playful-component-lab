
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { checkEmailExists } from '@/lib/storage/auth';
import FormFieldWithIcon from './FormFieldWithIcon';

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormProps = {
  setIsForgotPassword: (value: boolean) => void;
  setIsResetPassword: (value: boolean) => void;
  setResetEmail: (email: string) => void;
};

const ForgotPasswordForm = ({ 
  setIsForgotPassword, 
  setIsResetPassword,
  setResetEmail
}: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    
    try {
      console.log('Checking email:', values.email);
      
      // Check if email exists
      if (!checkEmailExists(values.email)) {
        toast.error("No account found with this email address");
        setIsLoading(false);
        return;
      }
      
      // Store email for reset password
      setResetEmail(values.email);
      
      // In a real app, this would send an actual email with OTP or reset link
      toast.success(`Recovery email sent to ${values.email}`);
      toast.info("Please check your Gmail inbox for the verification code");
      
      // Simulate sending an email with OTP
      // In a real app, this would trigger an API call to send an actual email
      localStorage.setItem('resetOTP', Math.floor(100000 + Math.random() * 900000).toString());
      
      // For demo purposes, we'll proceed to the reset screen after a delay
      setTimeout(() => {
        setIsForgotPassword(false);
        setIsResetPassword(true);
      }, 2000);
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error("Failed to process request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormFieldWithIcon
            form={form}
            name="email"
            label="Email"
            placeholder="your@email.com"
            Icon={Mail}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Send Verification Code"}
          </Button>
          
          <div className="mt-2 text-sm text-gray-500 text-center">
            In a real application, you would receive an email at your Gmail address 
            with a verification code to reset your password.
          </div>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setIsForgotPassword(false)} 
          className="text-app-blue hover:underline focus:outline-none"
        >
          Back to Login
        </button>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
