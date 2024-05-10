import React from "react"; // Import React
import { formatDistanceToNow, parseISO } from "date-fns";

function Timeago({ timestamp }) {
  let time = "";
  const date = parseISO(timestamp);
  const timeago = formatDistanceToNow(date);
  time = `${timeago} ago`;
  return (
    <div>
      <span style={{ color: "grey", marginLeft: "170px" }}>&nbsp;{time}</span>
    </div>
  );
}

export default Timeago;
