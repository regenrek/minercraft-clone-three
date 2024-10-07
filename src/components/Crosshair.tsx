import React from 'react'

const Crosshair: React.FC = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="9" y1="0" x2="9" y2="20" stroke="white" strokeWidth="2" />
        <line x1="0" y1="9" x2="20" y2="9" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}

export default Crosshair