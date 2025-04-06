interface props {
  dateInfo: Date;
}
const YYDDMM: React.FC<props> = (props) => {
  const { dateInfo } = props;
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const date = {
    year: dateInfo.getFullYear(),
    month: dateInfo.getMonth() + 1,
    day: dateInfo.getDate(),
    dayOfWeek: daysOfWeek[dateInfo.getDay()],
    hours: dateInfo.getHours(),
    minutes: dateInfo.getMinutes(),
    seconds: dateInfo.getSeconds(),
  };
  return (
    <div>
      {`${date.year}/${String(date.month).padStart(2, "0")}/${String(
        date.day
      ).padStart(2, "0")}`}
      ({date.dayOfWeek})&nbsp;
      {`${String(date.hours).padStart(2, "0")}:${String(date.minutes).padStart(
        2,
        "0"
      )}:${String(date.seconds).padStart(2, "0")}`}
    </div>
  );
};

export default YYDDMM;
