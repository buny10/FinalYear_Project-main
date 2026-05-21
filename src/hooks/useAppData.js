import { useState } from 'react';
import { INITIAL_DATA } from '../data/mockData';

export function useAppData() {
  const [data, setData] = useState(INITIAL_DATA);

  return { data, setData };
}
