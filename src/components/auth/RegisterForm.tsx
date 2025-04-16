
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';
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
import { saveUserCredentials, getUserCredentials } from '@/lib/storage/auth';
import { loginFormSchema } from './LoginForm';
import FormFieldWithIcon from './FormFieldWithIcon';

type RegisterFormProps = {
  setIsLogin?: (value: boolean) => void;
};

const RegisterForm = ({ setIsLogin }: RegisterFormProps) => {
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
      // Check if email already exists for registration
      const existingUser = getUserCredentials();
      if (existingUser && existingUser.email === values.email) {
        toast.error("An account with this email already exists");
        setIsLoading(false);
        return;
      }
      
      // Handle registration
      await saveUserCredentials({
        email: values.email,
        password: values.password,
      });
      
      toast.success("Account created successfully");
      if (setIsLogin) {
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed");
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
            {isLoading ? "Processing..." : "Register"}
          </Button>
        </form>
      </Form>

      {setIsLogin && (
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsLogin(true)} 
            className="text-app-blue hover:underline focus:outline-none"
          >
            Already have an account? Login
          </button>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
