import React from 'react';

export const ArrowSvg = ({ styles = null, style = {}, fill = '#ADBFDF' }) => (
  <svg
    className={styles}
    width='12'
    height='8'
    viewBox='0 0 12 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={style}
  >
    <path
      opacity='0.8'
      d='M1.41 0.590088L6 5.17009L10.59 0.590088L12 2.00009L6 8.00009L0 2.00009L1.41 0.590088Z'
      fill={fill}
    />
  </svg>
);

export const CalendarSvg = ({
  styles = null,
  style = {},
  fill = '#ADBFDF',
}) => (
  <svg
    className={styles}
    width='16'
    height='18'
    viewBox='0 0 16 18'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={style}
  >
    <path
      d='M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z'
      fill={fill}
    />
  </svg>
);
