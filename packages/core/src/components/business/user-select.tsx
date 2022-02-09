import React from "react";
import { useUsers } from "~/hooks/http/useUsers";
import { IdSelect } from "~/components/business/id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
