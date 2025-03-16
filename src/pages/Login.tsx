
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
import { KeyRound, Lock, Mail } from 'lucide-react';
import { saveUserCredentials, getUserCredentials } from '@/lib/storage/auth';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = async (values: z.infer<typeof loginFormSchema>) => {
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
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(isLogin ? "Login failed" : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    
    try {
      // Check if email exists
      const user = getUserCredentials();
      if (!user || user.email !== values.email) {
        toast.error("No account found with this email address");
        setIsLoading(false);
        return;
      }
      
      // Store email for reset password
      setResetEmail(values.email);
      
      // In a real app, this would send an email with a reset link
      // For this demo, we're simulating the email being sent
      toast.success(`Password reset link sent to ${values.email}`);
      
      // Show a message explaining what would happen in a real app
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

  const onResetPasswordSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsLoading(true);
    
    try {
      // Get current user
      const user = getUserCredentials();
      if (!user) {
        toast.error("User not found");
        setIsLoading(false);
        return;
      }
      
      // Update password
      await saveUserCredentials({
        email: resetEmail,
        password: values.password,
      });
      
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

  const renderLoginRegisterForm = () => (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
        <FormField
          control={loginForm.control}
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
          control={loginForm.control}
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
  );

  const renderForgotPasswordForm = () => (
    <Form {...forgotPasswordForm}>
      <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
        <FormField
          control={forgotPasswordForm.control}
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
  );

  const renderResetPasswordForm = () => (
    <Form {...resetPasswordForm}>
      <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-4">
        <FormField
          control={resetPasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
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
        
        <FormField
          control={resetPasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input type="password" placeholder="••••••" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className="app-container page-transition">
      <Header 
        title={
          isForgotPassword 
            ? "Forgot Password" 
            : isResetPassword 
              ? "Reset Password" 
              : isLogin 
                ? "Login" 
                : "Register"
        } 
        showBackButton 
      />
      
      <div className="px-5 py-8">
        <Card className="p-6 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-app-darkGray">
              {isForgotPassword 
                ? "Recover Your Account" 
                : isResetPassword 
                  ? "Create New Password" 
                  : isLogin 
                    ? "Welcome Back" 
                    : "Create Account"}
            </h2>
            <p className="text-gray-500 mt-2">
              {isForgotPassword 
                ? "Enter your email to receive a password reset link" 
                : isResetPassword 
                  ? "Enter your new password below" 
                  : isLogin 
                    ? "Please sign in to access your health data" 
                    : "Register to start tracking your wellness journey"}
            </p>
          </div>

          {isForgotPassword 
            ? renderForgotPasswordForm() 
            : isResetPassword 
              ? renderResetPasswordForm() 
              : renderLoginRegisterForm()}
          
          <div className="mt-4 text-center space-y-2">
            {!isForgotPassword && !isResetPassword && (
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-app-blue hover:underline focus:outline-none"
              >
                {isLogin ? "Need an account? Register" : "Already have an account? Login"}
              </button>
            )}
            
            {isLogin && !isForgotPassword && !isResetPassword && (
              <div>
                <button 
                  onClick={() => setIsForgotPassword(true)} 
                  className="text-app-blue hover:underline focus:outline-none"
                >
                  Forgot your password?
                </button>
              </div>
            )}
            
            {(isForgotPassword || isResetPassword) && (
              <div>
                <button 
                  onClick={() => {
                    setIsForgotPassword(false);
                    setIsResetPassword(false);
                    setIsLogin(true);
                  }} 
                  className="text-app-blue hover:underline focus:outline-none"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
