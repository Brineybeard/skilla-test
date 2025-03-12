import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ArrowSvg, CalendarSvg } from './SvgElements';
import getPeriod from '../../../services/getPeriod';
import { fetchCallDetails } from '../../../slices/callsStateSlice';
import styles from './callsFilter.module.css';

const CallsFilter = () => {
  const dispatch = useDispatch();
  const [dropdownTypeCallsOpen, setDropdownTypeCallsOpen] = useState(false);
  const [dropdownCalendarOpen, setDropdownCalendarOpen] = useState(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('3 дня');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(getPeriod()[1]);
  const dropdownRef = useRef(null);

  const filterOptions = ['Все типы', 'Входящие', 'Исходящие'];
  const dateOptions = ['3 дня', 'Неделя', 'Месяц', 'Год'];

  const filter =
    selectedFilterIndex === 0 ? null : selectedFilterIndex === 1 ? 1 : 0;

  useEffect(() => {
    if (startDate && endDate && new Date(startDate) <= new Date(endDate)) {
      dispatch(
        fetchCallDetails({
          inOut: filter,
          dateStart: startDate,
          dateEnd: endDate,
        })
      );
    }
  }, [startDate, endDate, filter, dispatch]);

  const handleFilterSelect = (index) => {
    setSelectedFilterIndex(index);
    const currentFilter =
      filterOptions[index] === 'Все типы'
        ? null
        : filterOptions[index] === 'Входящие'
        ? 1
        : 0;

    const period = getPeriod(selectedPeriod);

    dispatch(
      fetchCallDetails({
        inOut: currentFilter,
        dateStart: period[0],
        dateEnd: period[1],
      })
    );
    setDropdownTypeCallsOpen(false);
  };

  const handleArrowClick = (direction) => {
    const currentIndex = dateOptions.indexOf(selectedPeriod);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
      newIndex = dateOptions.length - 1;
    } else if (newIndex >= dateOptions.length) {
      newIndex = 0;
    }
    setSelectedPeriod(dateOptions[newIndex]);

    dispatch(
      fetchCallDetails({
        inOut: filter,
        dateStart: getPeriod(dateOptions[newIndex])[0],
        dateEnd: getPeriod(dateOptions[newIndex])[1],
      })
    );
  };

  const toggleDropdown = () => {
    setDropdownTypeCallsOpen((prev) => !prev);
  };

  const toggleCalendarDropdown = () => {
    setDropdownCalendarOpen((prev) => !prev);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    const result = getPeriod(period);
    toggleCalendarDropdown();
    dispatch(
      fetchCallDetails({
        inOut: filter,
        dateStart: result[0],
        dateEnd: result[1],
      })
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownTypeCallsOpen(false);
        setDropdownCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.filterCalls} ref={dropdownRef}>
      <div className={styles.filterType} onClick={toggleDropdown}>
        {filterOptions[selectedFilterIndex]}
        <ArrowSvg
          styles={styles.arrow}
          style={{
            transform: dropdownTypeCallsOpen
              ? 'rotate(180deg)'
              : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
          }}
          fill={dropdownTypeCallsOpen ? '#002cfb' : '#ADBFDF'}
        />
      </div>
      {filterOptions[selectedFilterIndex] !== 'Все типы' && (
        <button
          className={styles.resetButton}
          onClick={() => handleFilterSelect(0)}
        >
          Сбросить фильтр 🗙
        </button>
      )}

      {dropdownTypeCallsOpen && (
        <div className={styles.dropdown}>
          {filterOptions.map((filter, index) => (
            <button
              key={filter}
              onClick={() => handleFilterSelect(index)}
              className={
                selectedFilterIndex === index ? styles.dropdownActive : ''
              }
            >
              {filter}
            </button>
          ))}
        </div>
      )}
      <div className={styles.filterCalendar}>
        <div onClick={() => handleArrowClick(-1)}>
          <ArrowSvg
            styles={styles.activeFilterCalendar}
            style={{ transform: 'rotate(90deg)' }}
          />
        </div>
        <div className={styles.filterCalendar} onClick={toggleCalendarDropdown}>
          <CalendarSvg
            styles={`${styles.activeFilterCalendar} ${styles.calendarHover}`}
          />
          <p className={styles.activeFilterCalendar}>{selectedPeriod}</p>
        </div>

        <div onClick={() => handleArrowClick(1)}>
          <ArrowSvg
            styles={styles.activeFilterCalendar}
            style={{ transform: 'rotate(270deg)' }}
          />
        </div>
      </div>
      {dropdownCalendarOpen && (
        <div className={styles.dropdownCalendar}>
          {dateOptions.map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodSelect(period)}
              className={selectedPeriod === period ? styles.dropdownActive : ''}
            >
              {period}
            </button>
          ))}
          <div>
            <p className={styles.calendarHead}>Указать даты</p>
            <input
              className={styles.dateField}
              type='date'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              placeholder='__.__.__'
              size='12'
            />
            <input
              className={styles.dateField}
              type='date'
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              size='12'
              placeholder='__.__.__'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CallsFilter;
