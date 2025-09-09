
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import FormFieldWithIcon from './FormFieldWithIcon';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';
import DOMPurify from 'dompurify';
import GoogleIcon from "./GoogleIcon";
import { toast } from 'sonner';

const registerFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.string().min(2, { message: "Please enter your full name" }),
});

const SupabaseRegisterForm = () => {
  const { signUp, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);
    try {
      // Sanitize form input for fullName and email
      values.fullName = DOMPurify.sanitize(values.fullName);
      values.email = DOMPurify.sanitize(values.email);
      await signUp(values.email, values.password);
      // In a real app, we would store the full name in user metadata
    } catch (error) {
      // In production, avoid leaking error details in logs
      if (process.env.NODE_ENV !== "production") {
        console.error('Registration error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google authentication error:', error);
      // Extra toast for UI feedback
      toast.error("Google authentication failed. Please try again.");
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
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            Icon={User}
          />
          
          <FormFieldWithIcon
            form={form}
            name="email"
            label="Email"
            placeholder="your@email.com"
            Icon={Mail}
          />
          
          <FormFieldWithIcon
            form={form}
            name="password"
            label="Password"
            placeholder="••••••"
            type="password"
            Icon={Lock}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
            <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            aria-label="Sign up with Google"
          >
            <GoogleIcon />
            Sign up with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default SupabaseRegisterForm;

