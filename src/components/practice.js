import React, { useState } from 'react';

function Counter() {
  // Declare a state variable called "count", starting at 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* When button is clicked, increase count by 1 */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}