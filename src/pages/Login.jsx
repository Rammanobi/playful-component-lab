
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const getCardContent = () => {
    if (isForgotPassword) {
      return {
        title: "Recover Your Account",
        description: "Enter your email to receive a password reset link",
        component: (
          <ForgotPasswordForm 
            setIsForgotPassword={setIsForgotPassword}
            setIsResetPassword={setIsResetPassword}
            setResetEmail={setResetEmail}
          />
        )
      };
    } else if (isResetPassword) {
      return {
        title: "Create New Password",
        description: "Enter your new password below",
        component: (
          <ResetPasswordForm 
            resetEmail={resetEmail}
            setIsResetPassword={setIsResetPassword}
            setIsLogin={setIsLogin}
          />
        )
      };
    } else if (isLogin) {
      return {
        title: "Welcome Back",
        description: "Please sign in to access your health data",
        component: (
          <LoginForm 
            setIsLogin={setIsLogin}
            setIsForgotPassword={setIsForgotPassword}
          />
        )
      };
    } else {
      return {
        title: "Create Account",
        description: "Register to start tracking your wellness journey",
        component: (
          <RegisterForm 
            setIsLogin={setIsLogin}
          />
        )
      };
    }
  };

  const { title, description, component } = getCardContent();
  
  const headerTitle = isForgotPassword 
    ? "Forgot Password" 
    : isResetPassword 
      ? "Reset Password" 
      : isLogin 
        ? "Login" 
        : "Register";

  return (
    <div className="app-container page-transition">
      <Header title={headerTitle} showBackButton />
      
      <div className="px-5 py-8">
        <AuthCard 
          title={title}
          description={description}
        >
          {component}
        </AuthCard>
      </div>
    </div>
  );
};

export default Login;
