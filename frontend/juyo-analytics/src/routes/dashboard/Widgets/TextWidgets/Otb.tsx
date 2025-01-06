import React from "react";

type WidgetProps = {
  title: string;
  percentage: string;
  rn: string;
  adr: string;
  revenue: string;
  details?: { label: string; value: string }[];
  highlight?: boolean;
};

const Otb: React.FC<WidgetProps> = ({
  title,
  percentage,
  rn,
  adr,
  revenue,
  details,
  highlight = false,
}) => {
  return (
    <div
      className={`text-black p-4 rounded-lg shadow-md bg-white ${
        highlight ? "ring-2 ring-red-500" : ""
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="text-gray-800 hover:text-gray-300" aria-label="Info">
          ⓘ
        </button>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{percentage}</p>
        <div className="text-sm mt-2 space-y-1">
          <p>
            <span className="font-medium">RN:</span> {rn}
          </p>
          <p>
            <span className="font-medium">ADR:</span> {adr}
          </p>
          <p>
            <span className="font-medium">Rev:</span> {revenue}
          </p>
        </div>
      </div>
      {details && (
        <div className="mt-4 space-y-1">
          {details.map((detail, index) => (
            <p
              key={index}
              className={`flex justify-between ${
                detail.value.startsWith("-") ? "text-red-400" : ""
              }`}
            >
              <span className="font-medium">{detail.label}:</span>
              <span>{detail.value}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Otb;
