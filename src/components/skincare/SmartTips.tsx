
import React from 'react';
import { Card } from '@/components/ui/card';

const SmartTips: React.FC = () => {
  return (
    <Card className="p-4 bg-blue-50 border border-blue-200 mb-4">
      <h4 className="font-medium text-blue-800 mb-2">💡 Smart Tips</h4>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• Don't layer salicylic acid and clay mask on the same day</li>
        <li>• Wait 2–3 mins after toner before applying serum</li>
        <li>• Massage moisturizer gently for deeper absorption</li>
      </ul>
    </Card>
  );
};

export default SmartTips;
