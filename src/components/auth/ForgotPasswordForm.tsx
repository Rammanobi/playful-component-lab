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
import { supabase } from '@/integrations/supabase/client';
import FormFieldWithIcon from './FormFieldWithIcon';
import DOMPurify from 'dompurify';

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
      // Sanitize email
      const email = DOMPurify.sanitize(values.email);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) {
        toast.error("Failed to send reset email. Please check if the email address is correct.");
        if (process.env.NODE_ENV !== "production") {
          console.error('Password reset error:', error);
        }
      } else {
        toast.success(`Password reset email sent to ${email}`);
        toast.info("Please check your email for the reset link");
        setResetEmail(email);
        setTimeout(() => {
          setIsForgotPassword(false);
        }, 2000);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error('Forgot password error:', error);
      }
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
            {isLoading ? "Sending..." : "Send Reset Email"}
          </Button>
          
          <div className="mt-2 text-sm text-gray-500 text-center">
            <p>
              A password reset link will be sent to your email address.
            </p>
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
