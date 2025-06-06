
import React from 'react';
import { Moon } from 'lucide-react';
import TimeSection from './TimeSection';
import TaskItem from './TaskItem';

interface NightRoutineProps {
  pilgrimToner: boolean;
  setPilgrimToner: (value: boolean) => void;
  vitaminB5Night: boolean;
  setVitaminB5Night: (value: boolean) => void;
}

const NightRoutine: React.FC<NightRoutineProps> = ({
  pilgrimToner,
  setPilgrimToner,
  vitaminB5Night,
  setVitaminB5Night
}) => {
  return (
    <TimeSection
      title="Night Wind-Down"
      time="9:00 PM"
      icon={Moon}
      color="border-l-indigo-400"
    >
      <TaskItem
        label="Apply Pilgrim Toner"
        checked={pilgrimToner}
        onChange={setPilgrimToner}
      />
      <TaskItem
        label="Apply Vitamin B5 10% Moisturizer"
        checked={vitaminB5Night}
        onChange={setVitaminB5Night}
      />
      <p className="text-xs text-gray-600 italic mt-3">
        "You've earned this rest. Your skin is healing and you deserve to glow."
      </p>
    </TimeSection>
  );
};

export default NightRoutine;
