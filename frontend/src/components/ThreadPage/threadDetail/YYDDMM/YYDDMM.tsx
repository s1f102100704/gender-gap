import React from "react";

interface props {
  threadDate: {
    year: number;
    month: number;
    day: number;
    dayOfWeek: string;
    hours: number;
    minutes: number;
    seconds: number;
  };
}
const YYDDMM: React.FC<props> = (props) => {
  const { threadDate } = props;
  return (
    <div>
      {`${threadDate.year}/${String(threadDate.month).padStart(
        2,
        "0"
      )}/${String(threadDate.day).padStart(2, "0")}`}
      ({threadDate.dayOfWeek})
      {`${String(threadDate.hours).padStart(2, "0")}:${String(
        threadDate.minutes
      ).padStart(2, "0")}:${String(threadDate.seconds).padStart(2, "0")}`}
    </div>
  );
};

export default YYDDMM;
