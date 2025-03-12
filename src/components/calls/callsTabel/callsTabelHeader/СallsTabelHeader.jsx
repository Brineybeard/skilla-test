import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ArrowSvg } from '../../callsFilter/SvgElements';
import { setLocalCallDetails } from '../../../../slices/callsStateSlice';
import styles from './callsTabelHeader.module.css';

const CallsTabelHeader = () => {
  const [isSortDescending, setSortDescending] = useState(false);
  const [isSortDuration, setSortDuration] = useState(false);
  const dispatch = useDispatch();

  const callsData = useSelector((state) => state.callsState.callsState);

  const handleSortingDate = () => {
    const sortedData = [...callsData].sort((a, b) => {
      return isSortDescending
        ? new Date(b.callTime) - new Date(a.callTime)
        : new Date(a.callTime) - new Date(b.callTime);
    });

    setSortDescending(!isSortDescending);
    setSortDuration(false);
    dispatch(setLocalCallDetails(sortedData));
  };

  const handleSortingDuration = () => {
    const sortedDuration = [...callsData].sort((a, b) => {
      const durationA = a.duration
        ? a.duration.split(':').reduce((acc, time) => 60 * acc + +time)
        : 0;
      const durationB = b.duration
        ? b.duration.split(':').reduce((acc, time) => 60 * acc + +time)
        : 0;
      return isSortDuration ? durationB - durationA : durationA - durationB;
    });

    setSortDuration(!isSortDuration);
    setSortDescending(false);
    dispatch(setLocalCallDetails(sortedDuration));
  };

  return (
    <div>
      <ul className={styles.header}>
        <li className={styles.type}>Тип</li>
        <li className={styles.time} onClick={() => handleSortingDate()}>
          Время
          <ArrowSvg
            styles={styles.arrow}
            style={{
              transform: isSortDescending ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
            fill={isSortDescending ? '#002cfb' : '#ADBFDF'}
          />
        </li>
        <li className={styles.employee}>Сотрудник</li>
        <li className={styles.call}>Звонок</li>
        <li className={styles.source}>Источник</li>
        <li className={styles.result}>Оценка</li>
        <li className={styles.duration} onClick={() => handleSortingDuration()}>
          Длительность
          <ArrowSvg
            styles={styles.arrow}
            style={{
              transform: isSortDuration ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
            fill={isSortDuration ? '#002cfb' : '#ADBFDF'}
          />
        </li>
      </ul>
    </div>
  );
};

export default CallsTabelHeader;
