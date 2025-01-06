/** routes/dashboard/components/RightSideBar/TextWidgets.tsx */

import Search from "antd/es/input/Search";
import Budget from "../../Widgets/TextWidgets/Budget";
import Otb from "../../Widgets/TextWidgets/Otb";
import Widget from "../Widget";

const widgets = [
  {
    key: "1",
    type: "budget",
    title: "Widget 1",
    explanation: "This is a widget 1",
    imageUrl: "/dashboard/first-dummy-widget.png",
    component: (
      <Budget
        title="Widget 1"
        explanation="loreum ipsum dolor sit amet consectetur"
        imageUrl="/dashboard/first-dummy-widget.png"
      />
    ),
  },
  {
    key: "2",
    type: "otb",
    title: "Main Things",
    explanation: "This is a widget 2",
    adr: "25",
    percentage: "60%",
    revenue: "$150",
    rn: "$205",
    imageUrl: "/dashboard/second-dummy-widget.png",
    component: (
      <Otb
        adr="25"
        percentage="60%"
        revenue="$150"
        rn="$205"
        title="Main Things"
      />
    ),
    itemLayout: {
      x: 0,
      y: 0,
      w: 4,
      h: 4,
    },
  },
  {
    key: "3",
    type: "otb",
    title: "OTB",
    percentage: "45.4%",
    rn: "6,279",
    adr: "€196.8",
    revenue: "€1.236 M",
    imageUrl: "/dashboard/third-dummy-widget.png",
    component: (
      <Otb
        title="OTB"
        percentage="45.4%"
        rn="6,279"
        adr="€196.8"
        revenue="€1.236 M"
      />
    ),
    itemLayout: {
      none: "2",
      x: 4,
      y: 0,
      w: 4,
      h: 4,
    },
  },
  {
    key: "4",
    type: "otb",
    title: "OTB STLY",
    percentage: "56.4%",
    rn: "7,803",
    adr: "€225.4",
    revenue: "€1.750 M",
    imageUrl: "/dashboard/fourth-dummy-widget.png",
    component: (
      <Otb
        title="OTB STLY"
        percentage="56.4%"
        rn="7,803"
        adr="€225.4"
        revenue="€1.750 M"
      />
    ),
    itemLayout: {
      none: "3",
      x: 8,
      y: 0,
      w: 4,
      h: 4,
    },
  },
  {
    key: "5",
    type: "otb",
    title: "ACTUALS LY",
    percentage: "63.2%",
    rn: "8,741",
    adr: "€223.5",
    revenue: "€1.954 M",
    imageUrl: "/dashboard/fourth-dummy-widget.png",
    component: (
      <Otb
        title="ACTUALS LY"
        percentage="63.2%"
        rn="8,741"
        adr="€223.5"
        revenue="€1.954 M"
      />
    ),
    itemLayout: {
      none: "4",
      x: 12,
      y: 0,
      w: 6,
      h: 6,
    },
  },
  {
    key: "6",
    type: "otb",
    title: "LIVE FORECAST",
    percentage: "54.9%",
    rn: "7,592",
    adr: "€201.4",
    revenue: "€1.529 M",
    imageUrl: "/dashboard/fourth-dummy-widget.png",
    component: (
      <Otb
        title="LIVE FORECAST"
        percentage="54.9%"
        rn="7,592"
        adr="€201.4"
        revenue="€1.529 M"
      />
    ),
    itemLayout: {
      none: "5",
      x: 0,
      y: 4,
      w: 4,
      h: 4,
    },
  },
  {
    key: "7",
    type: "otb",
    title: "FORECAST",
    percentage: "61.5%",
    rn: "8,500",
    adr: "€197.0",
    revenue: "€1.674 M",
    imageUrl: "/dashboard/fourth-dummy-widget.png",
    component: (
      <Otb
        title="FORECAST"
        percentage="61.5%"
        rn="8,500"
        adr="€197.0"
        revenue="€1.674 M"
      />
    ),
    itemLayout: {
      none: "6",
      x: 4,
      y: 4,
      w: 4,
      h: 4,
    },
  },
  {
    key: "8",
    type: "otb",
    title: "BUDGET",
    percentage: "63.9%",
    rn: "8,841",
    adr: "€214.3",
    revenue: "€1.895 M",
    imageUrl: "/dashboard/fifth-dummy-widget.png",
    component: (
      <Otb
        title="BUDGET"
        percentage="63.9%"
        rn="8,841"
        adr="€214.3"
        revenue="€1.895 M"
      />
    ),
    itemLayout: {
      none: "7",
      x: 8,
      y: 4,
      w: 4,
      h: 4,
    },
  },
  {
    key: "9",
    type: "otb",
    title: "OTB % OTB STLY",
    percentage: "29.7%",
    rn: "24",
    adr: "125",
    revenue: "25",
    imageUrl: "/dashboard/fifth-dummy-widget.png",
    details: [
      { label: "OCC", value: "-19.5%" },
      { label: "ADR", value: "-12.7%" },
      { label: "Rev", value: "-28.7%" },
    ],
    highlight: true,
    component: (
      <Otb
        title="OTB % OTB STLY"
        percentage="42%"
        rn="24"
        adr="125"
        revenue="25"
        details={[
          { label: "OCC", value: "-19.5%" },
          { label: "ADR", value: "-12.7%" },
          { label: "Rev", value: "-28.7%" },
        ]}
        highlight
      />
    ),
    itemLayout: {
      none: "8",
      x: 12,
      y: 6,
      w: 4,
      h: 4,
    },
  },
  {
    key: "10",
    type: "otb",
    title: "OTB % ACT LY",
    percentage: "20%",
    rn: "24",
    adr: "124",
    revenue: "4552",
    imageUrl: "/dashboard/third-dummy-widget.png",
    details: [
      { label: "OCC", value: "-28.2%" },
      { label: "ADR", value: "-11.8%" },
      { label: "Rev", value: "-38.7%" },
    ],
    highlight: true,
    component: (
      <Otb
        title="OTB % ACT LY"
        percentage="78%"
        rn="54"
        adr="53"
        revenue="512"
        details={[
          { label: "OCC", value: "-28.2%" },
          { label: "ADR", value: "-11.8%" },
          { label: "Rev", value: "-38.7%" },
        ]}
        highlight
      />
    ),
    itemLayout: {
      none: "9",
      x: 0,
      y: 8,
      w: 4,
      h: 4,
    },
  },
  {
    key: "11",
    type: "otb",
    title: "OTB % BUDGET",
    percentage: "29184%",
    rn: "12048",
    adr: "12084",
    revenue: "902101",
    imageUrl: "/dashboard/second-dummy-widget.png",
    details: [
      { label: "OCC", value: "-29.0%" },
      { label: "RN", value: "-29.0%" },
      { label: "ADR", value: "-18.2%" },
      { label: "Rev", value: "-34.5%" },
    ],
    highlight: true,
    component: (
      <Otb
        title="OTB % BUDGET"
        percentage="97%"
        rn="12476 "
        adr="214"
        revenue="552"
        details={[
          { label: "OCC", value: "-29.0%" },
          { label: "RN", value: "-29.0%" },
          { label: "ADR", value: "-18.2%" },
          { label: "Rev", value: "-34.5%" },
        ]}
        highlight
      />
    ),
    itemLayout: {
      none: "10",
      x: 4,
      y: 8,
      w: 4,
      h: 4,
    },
  },
];

export default function TextWidgets({ addGridItem }) {
  return (
    <>
      {/* <div className="search-box mb-4">
        <Search placeholder="Search" className="bg-gray-600" />
      </div> */}

      <div className="text-widgets">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className="widget-item bg-gray-600 text-white rounded p-2 mb-2"
            onClick={() =>
              addGridItem(widget, widget.component, widget.itemLayout)
            }
          >
            <Widget
              title={widget.title}
              explanation={widget.explanation}
              imageUrl={widget.imageUrl}
            />
          </div>
        ))}
      </div>
    </>
  );
}
