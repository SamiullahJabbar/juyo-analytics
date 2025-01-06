import GraphWidget from "./GraphWidgets/GraphWidget";
import Budget from "./TextWidgets/Budget";
import Otb from "./TextWidgets/Otb";

export const componentMapping = {
  budget: (props: any) => {
    const { key, ...rest } = props;
    return <Budget key={key} {...rest} />;
  },
  otb: (props: any) => {
    const { key, ...rest } = props;
    return <Otb key={key} {...rest} />;
  },
  chart: (props: any) => {
    const { key, ...rest } = props;
    return <GraphWidget key={key} {...rest} />;
  },
  // Add other components here
};