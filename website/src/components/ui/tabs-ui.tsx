import { Nullable, StyleProps } from "@/types/general";
import { cn, compact } from "@/utils/general";
import { TabsList, Tabs, TabsContent, TabsTrigger } from "./tabs";
import { ReactNode, useEffect, useState } from "react";

export interface TabsUIItem {
  label: ReactNode;
  value: string;
  svg?: React.FunctionComponent<StyleProps>;
  content: React.ReactNode;
}

export interface TabsUIProps extends StyleProps {
  items: Array<Nullable<TabsUIItem>>;
  selected?: string;
  onSelect?: (value: string) => void;
  tabListClassName?: string;
  tabTriggerClassName?: string;
  tabContentClassName?: string;
}

export const TabsUI = ({
  items: itemsProps,
  className,
  selected,
  onSelect,
  tabListClassName,
  tabTriggerClassName,
  tabContentClassName,
}: TabsUIProps) => {
  const [state, setState] = useState<string>();

  const items = compact(itemsProps);

  useEffect(() => {
    setState(selected ?? items[0]?.value);
  }, [selected]);

  return (
    <Tabs
      value={state}
      onValueChange={(label) => {
        setState(label);
        onSelect?.(label);
      }}
      className={className}
    >
      <TabsList className={cn(tabListClassName)}>
        {items.map(({ label, svg: Svg, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className={cn(tabTriggerClassName)}
          >
            {Svg && (
              <Svg className="h-5 w-5 text-gray-400 data-[state=active]:text-indigo-600" />
            )}
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map(({ content, value }) => (
        <TabsContent
          key={value}
          value={value}
          className={cn(tabContentClassName)}
        >
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
