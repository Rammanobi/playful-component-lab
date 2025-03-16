
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

type RegisterFormProps = {
  setIsLogin: (value: boolean) => void;
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
      setIsLogin(true);
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
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input type="password" placeholder="••••••" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Register"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setIsLogin(true)} 
          className="text-app-blue hover:underline focus:outline-none"
        >
          Already have an account? Login
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
