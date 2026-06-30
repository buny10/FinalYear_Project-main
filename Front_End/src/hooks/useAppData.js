import { useState, useEffect } from 'react';
import { INITIAL_DATA } from '../data/mockData';
import { employeeAPI } from '../api/employeeAPI';

export function useAppData() {
  const [data, setData] = useState(INITIAL_DATA);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const employees = await employeeAPI.getAll({});
        setData(prev => ({ ...prev, employees }));
      } catch (err) {
        console.error("Failed to load employees:", err);
      }
    }
    loadEmployees();
  }, []);

  return { data, setData };
}