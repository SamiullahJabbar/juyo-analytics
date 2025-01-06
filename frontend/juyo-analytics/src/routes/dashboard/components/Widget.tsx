/** routes/dashboard/components/Widget.tsx */

import { WidgetProps } from "../types";

export default function Widget({
  title,
  explanation,
  imageUrl,
}: WidgetProps): React.ReactElement<{}> {
  return (
    <>
      <div className="widget-container bg-gray-400 rounded shadow-md p-3">
        <div className="widget-header flex justify-between items-center">
          <span className="text-sm">{title}</span>
          <button className="text-xs text-gray-100 hover:text-red-50">
            Add Widget
          </button>
        </div>
        <div className="widget-content">
          <p className="text-sm text-gray-100">{explanation}</p>
        </div>
        <div className="widget-image mt-2">
          <img src={imageUrl} alt="widget" width={200} height={200} />
        </div>
      </div>
    </>
  );
}
