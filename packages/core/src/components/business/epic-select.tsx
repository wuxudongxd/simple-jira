import React from "react";
import { IdSelect } from "./id-select";
import { useEpics } from "~/hooks/http";

export const EpicSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: epics } = useEpics();
  return <IdSelect options={epics || []} {...props} />;
};
