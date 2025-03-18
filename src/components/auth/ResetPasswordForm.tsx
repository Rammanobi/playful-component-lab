
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Lock, KeyRound, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { saveUserCredentials } from '@/lib/storage/auth';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import FormFieldWithIcon from './FormFieldWithIcon';

const resetPasswordSchema = z.object({
  otp: z.string().min(6, { message: "Please enter the 6-digit verification code" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormProps = {
  resetEmail: string;
  setIsResetPassword: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
};

const ResetPasswordForm = ({ 
  resetEmail, 
  setIsResetPassword, 
  setIsLogin 
}: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [otpVerified, setOtpVerified] = React.useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const verifyOTP = (enteredOTP: string) => {
    const storedOTP = localStorage.getItem('resetOTP');
    if (storedOTP && storedOTP === enteredOTP) {
      setOtpVerified(true);
      toast.success("Verification code confirmed");
      return true;
    } else {
      toast.error("Invalid verification code");
      return false;
    }
  };

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    
    try {
      // First verify OTP if not already verified
      if (!otpVerified) {
        const isOtpValid = verifyOTP(values.otp);
        if (!isOtpValid) {
          setIsLoading(false);
          return;
        }
      }
      
      // Update password
      await saveUserCredentials({
        email: resetEmail,
        password: values.password,
      });
      
      // Clear OTP from storage
      localStorage.removeItem('resetOTP');
      
      toast.success("Password reset successfully");
      toast.info("You can now log in with your new password");
      
      setTimeout(() => {
        setIsResetPassword(false);
        setIsLogin(true);
      }, 1500);
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
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email</span>
                    </div>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            {isLoading ? "Processing..." : "Reset Password"}
          </Button>

          <div className="mt-2 text-sm text-gray-500 text-center">
            {!otpVerified && "Enter the verification code sent to your Gmail account to reset your password."}
          </div>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => {
            setIsResetPassword(false);
            setIsLogin(true);
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
