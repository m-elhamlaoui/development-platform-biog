import { StarIcon } from "@heroicons/react/24/outline";

const RatingComponent = ({ value, max }: { value: number; max: number }) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="cont2">
      {Array.from(Array(max).keys()).map((_, i) => (
        <StarIcon key={i} className="star" />
      ))}
      <div className="overlay" style={{ width: 100 - percentage + "%" }} />
    </div>
  );
};

export default RatingComponent;
