import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CallsFilter from './callsFilter/CallsFilter';
import CallsTabel from './callsTabel/CallsTabel';
import { fetchCallDetails } from '../../slices/callsStateSlice';
import getPeriod from '../../services/getPeriod';
import styles from './calls.module.css';

const Calls = () => {
  const dispatch = useDispatch();
  const result = getPeriod();
  useEffect(() => {
    dispatch(
      fetchCallDetails({ inOut: '', dateStart: result[0], dateEnd: result[1] })
    );
  }, [dispatch]);

  return (
    <div className={styles.calls}>
      <CallsFilter />
      <CallsTabel />
    </div>
  );
};

export default Calls;
