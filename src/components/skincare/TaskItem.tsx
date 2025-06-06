
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ label, checked, onChange, description }) => (
  <div className="flex items-start space-x-3 mb-3">
    <Checkbox checked={checked} onCheckedChange={onChange} className="mt-1" />
    <div className="flex-1">
      <label className="text-sm font-medium cursor-pointer" onClick={() => onChange(!checked)}>
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  </div>
);

export default TaskItem;
