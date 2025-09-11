import React from 'react';

interface HighlightProps {
  text: string;
  highlight: string;
}

const Highlight: React.FC<HighlightProps> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }

  // Function to escape special characters for RegExp
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\\]/g, '\$&'); // $& means the whole matched string
  };

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 text-black">
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export default Highlight;