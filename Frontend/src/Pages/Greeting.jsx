import React, { useState, useEffect } from 'react';

function Greeting() {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const currentTime = new Date().getHours();
    if (currentTime >= 6 && currentTime < 12) {
      setTimeOfDay('morning');
    } else if (currentTime >= 12 && currentTime < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);

  return (
    <div className='text-gray-700 font-medium text-xl'>
      {timeOfDay === 'morning' && <h1>Good morning</h1>}
      {timeOfDay === 'afternoon' && <h1>Good afternoon</h1>}
      {timeOfDay === 'evening' && <h1>Good evening</h1>}
    </div>
  );
}

export default Greeting;
