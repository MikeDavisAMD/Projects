import React, { useRef, useEffect } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { CalendarMonth, Close } from '@mui/icons-material';
import { Box } from '@mui/material';

export const DatePickerUi = ({value, onChange, label, disabled = false, theme}) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const wrapper = wrapperRef.current.querySelector('.react-date-picker__wrapper');
      if (wrapper) {
        wrapper.style.minWidth = '0';
        wrapper.style.width = '100%';
        wrapper.style.borderRadius = '2px';
        wrapper.style.border = disabled ? `1.5px solid transparent` : `1.5px solid ${theme.primaryAccent}` ;
        wrapper.style.boxShadow = 'none';
        wrapper.style.background = theme.primaryBg;
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
        inputGroup.style.color = theme.primaryText;
      }
      const iconButtonStyle = {
        outline: 'none',
        border: 'none',
        background: theme.primaryBg,
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
  }, [theme,disabled]);

  
  
  useEffect(() => {
    const observer = new MutationObserver(() => {

      const calendars = document.querySelectorAll('.react-calendar');
      calendars.forEach(cal => {
        cal.style.background = theme.primaryBg;
        cal.style.border = `1.5px solid ${theme.primaryAccent}`;
        cal.style.borderRadius = '12px';
        cal.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';

        // Weekday labels
        const weekdays = cal.querySelectorAll('.react-calendar__month-view__weekdays__weekday');
        weekdays.forEach(day => {
          day.style.color = theme.secondaryText;
          day.style.fontWeight = '500';
        });

        // Days
        const days = cal.querySelectorAll('.react-calendar__tile');
        days.forEach(day => {
          day.style.color = theme.primaryText;
          day.style.background = 'transparent';
          day.style.borderRadius = '6px';
          day.onmouseover = () => (day.style.background = theme.hoverAccent || 'rgba(0,0,0,0.05)');
          day.onmouseout = () => (day.style.background = 'transparent');
        });

        // Active/selected day
        const activeDays = cal.querySelectorAll('.react-calendar__tile--active');
        activeDays.forEach(day => {
          day.style.background = theme.primaryAccent;
          day.style.color = theme.primaryBg;
        });
      });

      const navArrows = document.querySelectorAll('.react-calendar__navigation button');
      navArrows.forEach(btn => {
        btn.style.width = '28px';
        btn.style.height = '28px';
        btn.style.borderRadius = '5%';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';
        btn.style.margin = '0 2px';
        btn.style.background = theme.primaryBg;
        btn.style.color = theme.secondaryText
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
  }, [theme]);

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
      <Box component="span" sx={{color:theme.primaryText}}>
        {label}
      </Box>
      <DatePicker
        onChange={onChange}
        value={value}
        calendarIcon={<CalendarMonth style={{ fontSize: 26, color:theme.secondaryText }} />}
        clearIcon={<Close style={{ fontSize: 26,color:theme.secondaryText }} />}
        format="dd/MM/yyyy"
        disabled={disabled}
      />
    </div>
  );
};