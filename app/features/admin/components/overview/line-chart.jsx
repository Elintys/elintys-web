const LineChart = ({ series }) => {
  const max = Math.max(...series, 1);
  const min = 0;
  const xStart = 8;
  const xEnd = 98;
  const yStart = 90;
  const yEnd = 10;
  const points = series
    .map((value, index) => {
      const x = xStart + (index / (series.length - 1)) * (xEnd - xStart);
      const y = yStart - ((value - min) / (max - min)) * (yStart - yEnd);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        points={points}
        className="text-indigo-700"
      />
    </svg>
  );
};

export default LineChart;
