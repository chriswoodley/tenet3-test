import React from 'react'

function StopButton({hasStopped, onClick, className}) {
  const text = hasStopped ? 'Reset' : 'Stop';

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  )
}

export default StopButton