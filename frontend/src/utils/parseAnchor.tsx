import React from "react";

export const parseAnchors = (
  text: string,
  onAnchorClick: (postNumber: number) => void
): React.ReactNode[] => {
  const parts = text.split(/(>>\d+)/g);

  return parts.map((part, index) => {
    const match = part.match(/^>>(\d+)$/);
    if (match) {
      const postNumber = parseInt(match[1], 10);
      return (
        <span
          key={index}
          style={{ color: "#4a90e2", cursor: "pointer" }}
          onClick={() => onAnchorClick(postNumber)}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};
