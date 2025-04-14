
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from '@/components/auth/SupabaseLoginForm';
import RegisterForm from '@/components/auth/SupabaseRegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const getTitle = () => {
    if (isForgotPassword) return "Recover Your Account";
    if (isResetPassword) return "Reset Password";
    return activeTab === "login" ? "Welcome Back" : "Create Account";
  };

  const getDescription = () => {
    if (isForgotPassword) return "Enter your email to receive a password reset link";
    if (isResetPassword) return "Enter your new password below";
    return activeTab === "login" 
      ? "Please sign in to access your health data" 
      : "Register to start tracking your wellness journey";
  };

  const renderContent = () => {
    if (isForgotPassword) {
      return (
        <ForgotPasswordForm 
          setIsForgotPassword={setIsForgotPassword}
          setIsResetPassword={setIsResetPassword}
          setResetEmail={setResetEmail}
        />
      );
    }

    if (isResetPassword) {
      return (
        <ResetPasswordForm 
          resetEmail={resetEmail}
          setIsResetPassword={setIsResetPassword}
          onSuccess={() => setActiveTab("login")}
        />
      );
    }

    return (
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm setIsForgotPassword={setIsForgotPassword} />
        </TabsContent>
        
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    );
  };

  const headerTitle = isForgotPassword 
    ? "Forgot Password" 
    : isResetPassword 
      ? "Reset Password" 
      : activeTab === "login" 
        ? "Login" 
        : "Register";

  return (
    <div className="app-container page-transition">
      <Header title={headerTitle} showBackButton />
      
      <div className="px-5 py-8">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-app-darkGray">{getTitle()}</h2>
              <p className="text-gray-500 mt-2">{getDescription()}</p>
            </div>
            
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
