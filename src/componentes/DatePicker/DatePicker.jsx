import React, { useState } from 'react';
import './DatePicker.css';  // Add styles as needed

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Generate the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Generate a simple 7x6 calendar grid
  const generateCalendar = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the month
    const startDay = new Date(year, month, 1).getDay(); // The first day of the month
    
    const days = [];
    let day = 1;
    for (let row = 0; row < 6; row++) {
      let rowDays = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < startDay) {
          rowDays.push(null); // Empty space before the first day
        } else if (day <= daysInMonth) {
          rowDays.push(day);
          day++;
        } else {
          rowDays.push(null); // Empty space after the last day
        }
      }
      days.push(rowDays);
    }
    return days;
  };

  const handleClickDate = (day) => {
    if (day) {
      const date = new Date(currentYear, currentMonth, day);
      setSelectedDate(date);
      setShowCalendar(false); // Hide the calendar after a date is clicked
    }
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const calendarDays = generateCalendar(currentMonth, currentYear);

  return (
    <div className="datepicker">
      <button onClick={toggleCalendar}>
        {selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
      </button>

      {showCalendar && (
        <div className="calendar">
          <div className="calendar-header">
            <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentYear}</span>
          </div>
          <div className="calendar-grid">
            {calendarDays.map((week, index) => (
              <div key={index} className="calendar-week">
                {week.map((day, idx) => (
                  <button
                    key={idx}
                    className={`calendar-day ${day ? 'active' : ''}`}
                    onClick={() => handleClickDate(day)}
                    disabled={!day}
                  >
                    {day || ''}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;