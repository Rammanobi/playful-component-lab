
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
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
import { checkEmailExists } from '@/lib/storage/auth';

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
      
      // In a real app, this would send an email with a reset link
      toast.success(`Password reset link sent to ${values.email}`);
      toast.info("In a real app, an email would be sent with a reset link");
      
      setTimeout(() => {
        setIsForgotPassword(false);
        setIsResetPassword(true);
      }, 1500);
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="your@email.com" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Send Reset Link"}
          </Button>
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
