
import React from 'react';
import { Sunset } from 'lucide-react';
import TimeSection from './TimeSection';
import TaskItem from './TaskItem';

interface EveningRoutineProps {
  currentDay: string;
  eveningRoutineType: string;
  shouldShowClayMask: boolean;
  poreSerum: boolean;
  setPoreSerum: (value: boolean) => void;
  salicylicSerum: boolean;
  setSalicylicSerum: (value: boolean) => void;
  niacinamideSerum: boolean;
  setNiacinamideSerum: (value: boolean) => void;
  clayMask: boolean;
  setClayMask: (value: boolean) => void;
  vitaminB5Evening: boolean;
  setVitaminB5Evening: (value: boolean) => void;
}

const EveningRoutine: React.FC<EveningRoutineProps> = ({
  currentDay,
  eveningRoutineType,
  shouldShowClayMask,
  poreSerum,
  setPoreSerum,
  salicylicSerum,
  setSalicylicSerum,
  niacinamideSerum,
  setNiacinamideSerum,
  clayMask,
  setClayMask,
  vitaminB5Evening,
  setVitaminB5Evening
}) => {
  return (
    <TimeSection
      title={`Evening Actives - ${currentDay}`}
      time="4:00-6:00 PM"
      icon={Sunset}
      color="border-l-pink-400"
    >
      {eveningRoutineType === 'pore' && (
        <>
          <TaskItem
            label="Apply Pore Minimizing Serum (DermaCo)"
            checked={poreSerum}
            onChange={setPoreSerum}
          />
          <TaskItem
            label="Apply Vitamin B5 10% Moisturizer"
            checked={vitaminB5Evening}
            onChange={setVitaminB5Evening}
          />
        </>
      )}
      
      {eveningRoutineType === 'salicylic' && (
        <>
          <TaskItem
            label="Apply Salicylic Acid Serum"
            checked={salicylicSerum}
            onChange={setSalicylicSerum}
          />
          <TaskItem
            label="Apply Vitamin B5 10% Moisturizer"
            checked={vitaminB5Evening}
            onChange={setVitaminB5Evening}
          />
        </>
      )}
      
      {eveningRoutineType === 'niacinamide' && (
        <>
          <TaskItem
            label="Apply Niacinamide 10% Serum"
            checked={niacinamideSerum}
            onChange={setNiacinamideSerum}
          />
          <TaskItem
            label="Apply Vitamin B5 10% Moisturizer"
            checked={vitaminB5Evening}
            onChange={setVitaminB5Evening}
          />
        </>
      )}

      {shouldShowClayMask && (
        <TaskItem
          label="Dot & Key Clay Mask (6:30 PM)"
          checked={clayMask}
          onChange={setClayMask}
          description="Replace serum on this day"
        />
      )}
      
      <p className="text-xs text-gray-600 italic mt-3">
        "Every drop is a step toward clearer, healthier skin. You're glowing already!"
      </p>
    </TimeSection>
  );
};

export default EveningRoutine;
