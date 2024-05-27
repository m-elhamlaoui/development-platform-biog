// import React, { useState, useEffect } from 'react';
// import { StarIcon } from '@heroicons/react/24/outline';
// import StudentService from '../services/StudentService';

// const Rating = ({ value, max, onRate, disabled }) => {
//   return (
//     <div>
//       {[...Array(max)].map((_, index) => (
//         <span
//           key={index}
//           onClick={() => !disabled && onRate(index + 1)}
//           style={{
//             cursor: disabled ? 'not-allowed' : 'pointer',
//             color: index < value ? 'gold' : 'grey',
//             fontSize: '24px',
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );
// };

// const UserRating = ({ id, token, onNewRating }) => {
//   const [rating, setRating] = useState(0);
//   const [rated, setRated] = useState(false);

//   useEffect(() => {
//     if (id && token) {
//       StudentService.getEvent(token, id)
//         .then((response) => {
//           const eventRating = response.data.eventRating;
//           const newRatingCount = response.data.ratingCount;
//           const newEventRating = (eventRating * newRatingCount + rating) / (newRatingCount + 1);
//           setRating(eventRating);
//           setRated(true);
//           onNewRating(newEventRating);
//           console.log(response);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [id, token, onNewRating]);

//   const handleRate = (newRating) => {
//     if (!rated) {
//       setRating(newRating);
//       setRated(true);
//       onNewRating(newRating);
//     }
//   };

//   return (
//     <div>
//       <div style={{ fontSize: '22px', fontWeight: 'bold' }}>Leave a Rating</div>
//       <Rating value={rating} max={5} onRate={handleRate} disabled={rated} />
//     </div>
//   );
// };

// export default UserRating;

export {};
