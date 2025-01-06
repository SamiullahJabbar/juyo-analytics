/** routes/dashboard/widgets/textwidgets/budget.tsx */

import { Maximize2, MoreVertical, X } from "lucide-react";

export default function Budget({
  title,
  explanation,
  imageUrl,
  onRemove,
}: {
  title: string;
  explanation: string;
  imageUrl: string;
  onRemove?: () => void;
}) {
  // return (
  //   <div className="flex flex-row items-center justify-between h-full p-0 w-full">
  //     <div className="left-side">
  //       <div className="budget-keyword">BUDGET</div>
  //       <div className="budget-percentage font-bold text-lg">50%</div>
  //     </div>
  //     <div className="right-side flex flex-row gap-3">
  //       <div className="keywords flex flex-col">
  //         <div className="budget-adr-title">ADR</div>
  //         <div className="budget-revenue-title">REV</div>
  //         <div className="budget-rn-title">RN</div>
  //       </div>

  //       <div className="values flex flex-col">
  //         <div className="budget-adr-value font-bold">$100</div>
  //         <div className="budget-revenue-value font-bold">$100</div>
  //         <div className="budget-rn-value font-bold">$100</div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <Maximize2 className="h-5 w-5" />
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-500">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-row items-center justify-between h-full p-4 w-full text-black">
          <div className="left-side">
            <div className="budget-keyword">BUDGET</div>
            <div className="budget-percentage font-bold text-lg">50%</div>
          </div>
          <div className="right-side flex flex-row gap-3 text-black">
            <div className="keywords flex flex-col">
              <div className="budget-adr-title">ADR</div>
              <div className="budget-revenue-title">REV</div>
              <div className="budget-rn-title">RN</div>
            </div>

            <div className="values flex flex-col">
              <div className="budget-adr-value font-bold">$100</div>
              <div className="budget-revenue-value font-bold">$100</div>
              <div className="budget-rn-value font-bold">$100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
