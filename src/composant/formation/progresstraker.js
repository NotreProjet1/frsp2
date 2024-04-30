import React from 'react';

const ProgressTracker = ({ progress }) => {
  return (
    <div>
      <h2>Progression</h2>
      <div style={{ width: '100%', background: '#ddd', padding: '5px' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '20px',
            backgroundColor: '#4caf50',
            borderRadius: '5px',
          }}
        >
          {progress > 0 && <span style={{ padding: '5px', color: 'white' }}>{progress}%</span>}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
