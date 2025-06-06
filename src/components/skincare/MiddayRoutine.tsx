
import React from 'react';
import { Clock } from 'lucide-react';
import TimeSection from './TimeSection';
import TaskItem from './TaskItem';

interface MiddayRoutineProps {
  sunscreenReapply: boolean;
  setSunscreenReapply: (value: boolean) => void;
}

const MiddayRoutine: React.FC<MiddayRoutineProps> = ({
  sunscreenReapply,
  setSunscreenReapply
}) => {
  return (
    <TimeSection
      title="Midday Recharge"
      time="1:00 PM"
      icon={Clock}
      color="border-l-orange-400"
    >
      <TaskItem
        label="Reapply Photostable SPF 55++ Sunscreen"
        checked={sunscreenReapply}
        onChange={setSunscreenReapply}
      />
      <p className="text-xs text-gray-600 italic mt-3">
        "Protected and ready to shine—your glow is your armor."
      </p>
    </TimeSection>
  );
};

export default MiddayRoutine;
