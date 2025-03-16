
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
} from '@/components/ui/form';
import { getUserCredentials } from '@/lib/storage/auth';
import FormFieldWithIcon from './FormFieldWithIcon';

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormProps = {
  setIsLogin: (value: boolean) => void;
  setIsForgotPassword: (value: boolean) => void;
};

const LoginForm = ({ setIsLogin, setIsForgotPassword }: LoginFormProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);
    
    try {
      // Handle login
      const user = getUserCredentials();
      
      if (!user || user.email !== values.email || user.password !== values.password) {
        toast.error("Invalid email or password");
        setIsLoading(false);
        return;
      }
      
      // Successfully logged in
      toast.success("Login successful");
      
      // Store login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', values.email);
      
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error("Login failed");
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
          
          <FormFieldWithIcon
            form={form}
            name="password"
            label="Password"
            placeholder="••••••"
            type="password"
            Icon={Lock}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center space-y-2">
        <button 
          onClick={() => setIsLogin(false)} 
          className="text-app-blue hover:underline focus:outline-none"
        >
          Need an account? Register
        </button>
        
        <div>
          <button 
            onClick={() => setIsForgotPassword(true)} 
            className="text-app-blue hover:underline focus:outline-none"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
