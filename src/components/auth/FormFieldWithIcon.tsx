
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface FormFieldWithIconProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  Icon: LucideIcon;
}

const FormFieldWithIcon: React.FC<FormFieldWithIconProps> = ({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Icon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                type={isPassword ? (showPassword ? 'text' : 'password') : type} 
                placeholder={placeholder} 
                className={`pl-10 ${isPassword ? 'pr-10' : ''}`} 
                {...field} 
              />
              {isPassword && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10 px-0"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted-foreground" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWithIcon;
