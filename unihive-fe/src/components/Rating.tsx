import React, { useState } from 'react';

const Rating = ({ value, max, onRate }) => {
  return (
    <div>
      {[...Array(max)].map((_, index) => (
        <span
          key={index}
          onClick={() => onRate(index + 1)}
          style={{
            cursor: 'pointer',
            color: index < value ? 'gold' : 'grey',
            fontSize: '24px'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const UserRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <Rating value={rating} max={5} onRate={setRating} />
    </div>
  );
};

export default UserRating;
