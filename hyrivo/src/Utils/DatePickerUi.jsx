import React, { useRef, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { CalendarMonth, Close } from '@mui/icons-material';
import { Box } from '@mui/material';

export const DatePickerUi = ({value, onChange, label, disabled = false}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current.querySelector('.react-date-picker__wrapper');
      if (wrapper) {
        wrapper.style.minWidth = '0';
        wrapper.style.width = '100%';
        wrapper.style.borderRadius = '12px';
        wrapper.style.border = '1.5px solid #ddd';
        wrapper.style.boxShadow = 'none';
        wrapper.style.background = '#fff';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.padding = '0 6px';
      }
      const inputGroup = wrapperRef.current.querySelector('.react-date-picker__inputGroup');
      if (inputGroup) {
        inputGroup.style.flex = 1;
        inputGroup.style.display = 'flex';
        inputGroup.style.justifyContent = 'flex-start';
        inputGroup.style.alignItems = 'center';
        inputGroup.style.fontSize = '17px';
      }
      const iconButtonStyle = {
        outline: 'none',
        border: 'none',
        background: '#fafafa',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        padding: 0,
        marginLeft: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        transition: 'background 0.2s',
      };
      const calendarButton = wrapperRef.current.querySelector('.react-date-picker__calendar-button');
      if (calendarButton) {
        Object.assign(calendarButton.style, iconButtonStyle);
      }
      const clearButton = wrapperRef.current.querySelector('.react-date-picker__clear-button');
      if (clearButton) {
        Object.assign(clearButton.style, iconButtonStyle);
      }
    }
  }, []);
  
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const navArrows = document.querySelectorAll('.react-calendar__navigation button');
      navArrows.forEach(btn => {
        btn.style.width = '28px';
        btn.style.height = '28px';
        btn.style.borderRadius = '5%';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.margin = '0 2px';
        btn.style.background = '#fafafa';
        btn.style.border = 'none';
        btn.style.boxShadow = '0 0.5px 2px rgba(0,0,0,0.04)';
        btn.style.cursor = 'pointer';
        btn.style.transition = 'background 0.18s';
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.style.width = '16px';
          svg.style.height = '16px';
        }
      });
    });

    observer.observe(document.body, { subtree: true, childList: true });
  
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <Box component="span" >
        {label}
      </Box>
      <DatePicker
        onChange={onChange}
        value={value}
        calendarIcon={<CalendarMonth style={{ fontSize: 26 }} />}
        clearIcon={<Close style={{ fontSize: 26 }} />}
        format="dd/MM/yyyy"
        disabled={disabled}
      />
    </div>
  );
};