// Tile.tsx
import React from 'react';
import { useSpring, animated } from 'react-spring';

interface TileProps {
  number: number | null;
  onClick: () => void;
}

const Tile: React.FC<TileProps> = ({ number, onClick }) => {
  const [style, set] = useSpring(() => ({
    transform: 'scale(1)',
    config: { tension: 1000, friction: 5 },
  }));

  const handleClick = () => {
    set.start({ transform: 'scale(1.05)' });
    setTimeout(() => set.start({ transform: 'scale(1)' }), 500);
    onClick();
  };

  return (
    <animated.div className={`tile ${number === null ? 'empty' : ''}`} style={style} onClick={handleClick}>
      {number !== null && number}
    </animated.div>
  );
};

export default Tile;
