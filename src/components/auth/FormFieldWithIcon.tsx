
import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

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
              <Input type={type} placeholder={placeholder} className="pl-10" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldWithIcon;
