
import React from 'react';
import { Sun } from 'lucide-react';
import TimeSection from './TimeSection';
import TaskItem from './TaskItem';

interface MorningRoutineProps {
  ahaFaceWash: boolean;
  setAhaFaceWash: (value: boolean) => void;
  teaTreeToner: boolean;
  setTeaTreeToner: (value: boolean) => void;
  vitaminB5Morning: boolean;
  setVitaminB5Morning: (value: boolean) => void;
  sunscreenMorning: boolean;
  setSunscreenMorning: (value: boolean) => void;
}

const MorningRoutine: React.FC<MorningRoutineProps> = ({
  ahaFaceWash,
  setAhaFaceWash,
  teaTreeToner,
  setTeaTreeToner,
  vitaminB5Morning,
  setVitaminB5Morning,
  sunscreenMorning,
  setSunscreenMorning
}) => {
  return (
    <TimeSection
      title="Morning Routine"
      time="8:00 AM"
      icon={Sun}
      color="border-l-yellow-400"
    >
      <div className="space-y-2">
        <TaskItem
          label="Use AHA Glow S Face Wash"
          checked={ahaFaceWash}
          onChange={setAhaFaceWash}
        />
        <TaskItem
          label="Apply Pilgrim Tea Tree + Cica Toner"
          checked={teaTreeToner}
          onChange={setTeaTreeToner}
        />
        <TaskItem
          label="Apply Vitamin B5 10% Moisturizer"
          checked={vitaminB5Morning}
          onChange={setVitaminB5Morning}
        />
        <TaskItem
          label="Apply Photostable SPF 55++ Sunscreen"
          checked={sunscreenMorning}
          onChange={setSunscreenMorning}
        />
      </div>
      <p className="text-xs text-gray-600 italic mt-3">
        "You're refreshing your energy and clarity for the day."
      </p>
    </TimeSection>
  );
};

export default MorningRoutine;
