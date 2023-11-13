import React from 'react'

function StopButton({hasStopped, onClick, disabled, className}) {
  const text = hasStopped ? 'Reset' : 'Stop';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {text}
    </button>
  )
}

export default StopButton