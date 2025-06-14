import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { getAllLogs } from '@/lib/storage';
import { useEffect, useState } from 'react';
import { Ring } from 'lucide-react';

// Use dynamic import to avoid build error if file is missing
let LogTabSection;
try {
  LogTabSection = require('../components/logs/LogTabSection.jsx').default;
} catch (e) {
  LogTabSection = () => (
    <div className="text-red-600 p-4 text-center">
      <b>Error:</b> The LogTabSection component is missing.<br />
      Please restore src/components/logs/LogTabSection.jsx to see log details.
    </div>
  );
}

const LogDetails = () => {
  const { type } = useParams();
  const [logs, setLogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true);
      const allLogs = await getAllLogs();
      setLogs(allLogs);
      setIsLoading(false);
    };

    fetchLogs();
  }, []);

  if (isLoading) {
    return (
      <div className="app-container page-transition flex flex-col items-center justify-center">
        <Ring className="h-12 w-12 animate-spin" />
        <p className="mt-4">Loading logs...</p>
      </div>
    );
  }

  if (!logs) {
    return (
      <div className="app-container page-transition flex flex-col items-center justify-center">
        <p className="text-red-500">Failed to load logs.</p>
      </div>
    );
  }

  const props = {
    sleepData: logs.sleepData,
    mealData: logs.mealData,
    stressLogs: logs.stressLogs,
    skincareRoutines: logs.skincareRoutines,
    dayDescriptions: logs.dayDescriptions,
  };

  return (
    <div className="app-container page-transition">
      <Header title="Log Details" showBackButton />
      <div className="px-5">
        {LogTabSection && <LogTabSection {...props} />}
      </div>
    </div>
  );
};

export default LogDetails;
