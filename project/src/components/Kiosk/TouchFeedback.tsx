import React, { useState } from 'react';

interface TouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onTouchStart?: () => void;
  ariaLabel?: string;
}

const TouchFeedback: React.FC<TouchFeedbackProps> = ({
  children,
  className = '',
  onClick,
  onTouchStart,
  ariaLabel,
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);

  const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    let x: number, y: number;

    if ('touches' in event) {
      const touch = event.touches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
    setIsPressed(true);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    setTimeout(() => {
      setIsPressed(false);
    }, 150);

    if (onTouchStart) onTouchStart();
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer select-none transition-transform duration-150 ${
        isPressed ? 'scale-95' : 'scale-100'
      } ${className}`}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {children}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-50 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
};

export default TouchFeedback;