import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format, isToday, isYesterday } from 'date-fns';

import styles from './callsTabelBody.module.css';
import getCallRecord from '../../../../services/getCallRecord.js';

const CallItem = ({ call, audioUrl, playingCallId, setPlayingCallId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    setPlayingCallId(call.id);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setPlayingCallId(null);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setPlayingCallId(null);
  };

  return (
    <ul
      className={styles.body}
      key={call.id}
      onMouseEnter={() => {
        setIsHovered(true);
        if (!isPlaying) {
          setPlayingCallId(call.id);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isPlaying) {
          setPlayingCallId(null);
        }
      }}
    >
      <li className={styles.type}>
        <div className={styles[call.callType]}></div>
      </li>
      <li className={styles.time}>{call.callTime.split(' ')[1].slice(0, 5)}</li>
      <li className={styles.employee}>
        <img src={call.avatarUrl} alt='Avatar' className={styles.avatar} />
      </li>
      <li className={styles.call}>
        <p>{call.callersName}</p>
        <p>{call.callNumber}</p>
      </li>
      <li className={styles.source}>{call.source}</li>
      <li className={styles.result}>
        <div className={styles[call.score[1]]}>{call.score[0]}</div>
      </li>
      <li className={styles.duration}>
        {isHovered || isPlaying ? (
          <audio
            className={styles.duration}
            src={audioUrl[call.id]}
            controls
            onEnded={handleEnded}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        ) : (
          <div>{call.duration}</div>
        )}
      </li>
    </ul>
  );
};

const CallsTabelBody = () => {
  const callsData = useSelector((state) => state.callsState.callsState);
  const [audioUrl, setAudioUrl] = useState({});
  const [playingCallId, setPlayingCallId] = useState(null);

  const groupedCalls = {
    today: [],
    yesterday: [],
    earlier: [],
  };

  useEffect(() => {
    const loadAudio = async (recordId, partnershipId, id) => {
      const url = await getCallRecord(recordId, partnershipId);
      setAudioUrl((prev) => ({ ...prev, [id]: url }));
    };

    if (callsData.length > 0) {
      callsData.forEach((call) => {
        const { recordId, partnerId, id } = call;
        if (recordId) loadAudio(recordId, partnerId, id);
      });
    }
  }, [callsData]);

  callsData.forEach((call) => {
    const callDate = new Date(call.callTime);
    if (isToday(callDate)) {
      groupedCalls.today.push(call);
    } else if (isYesterday(callDate)) {
      groupedCalls.yesterday.push(call);
    } else {
      groupedCalls.earlier.push(call);
    }
  });

  const renderCalls = (calls, title) => {
    return (
      <>
        {title && (
          <div className={styles.formatDayContainer}>
            <h2 className={`${styles.formatDay} ${styles.type}`}>
              {title}
              <p className={styles.formatDayCounter}>{calls.length}</p>
            </h2>
          </div>
        )}
        {calls.map((call) => (
          <CallItem
            key={call.id}
            call={call}
            audioUrl={audioUrl}
            playingCallId={playingCallId}
            setPlayingCallId={setPlayingCallId}
          />
        ))}
      </>
    );
  };

  return (
    <>
      {groupedCalls.today.length > 0 && renderCalls(groupedCalls.today)}
      {groupedCalls.yesterday.length > 0 &&
        renderCalls(groupedCalls.yesterday, 'Вчера')}
      {groupedCalls.earlier.length > 0 &&
        renderCalls(
          groupedCalls.earlier,
          format(
            new Date(
              Math.min(
                ...groupedCalls.earlier.map((call) => new Date(call.callTime))
              )
            ),
            'dd.MM.yyyy'
          )
        )}
    </>
  );
};

export default CallsTabelBody;
