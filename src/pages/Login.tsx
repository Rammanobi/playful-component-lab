
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/layout/Header';
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
import { Card } from '@/components/ui/card';
import { Lock, Mail } from 'lucide-react';
import { saveUserCredentials, getUserCredentials } from '@/lib/storage/auth';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      if (isLogin) {
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
      } else {
        // Handle registration
        await saveUserCredentials({
          email: values.email,
          password: values.password,
        });
        
        toast.success("Account created successfully");
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(isLogin ? "Login failed" : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container page-transition">
      <Header title={isLogin ? "Login" : "Register"} showBackButton />
      
      <div className="px-5 py-8">
        <Card className="p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-app-darkGray">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLogin 
                ? "Please sign in to access your health data" 
                : "Register to start tracking your wellness journey"}
            </p>
          </div>

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
                {isLoading ? "Processing..." : isLogin ? "Login" : "Register"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-app-blue hover:underline focus:outline-none"
            >
              {isLogin ? "Need an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
