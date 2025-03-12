import CallsTabelHeader from './callsTabelHeader/СallsTabelHeader';
import CallsTabelBody from './callsTabelBody/CallsTabelBody';

import styles from './callsTabel.module.css';

const CallsTabel = () => {
  return (
    <div className={styles.callsTabel}>
      <CallsTabelHeader />
      <CallsTabelBody />
    </div>
  );
};

export default CallsTabel;
