import { Input } from "antd";
import { useState } from "react";
import { useAddBoard } from "~/hooks/http";

import { useBoardsQueryKey, useProjectIdInUrl } from "./util";

export const CreateBoard = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addBoard } = useAddBoard(useBoardsQueryKey());

  const submit = async () => {
    await addBoard({ name, projectId });
    setName("");
  };

  return (
    <div className="min-w-[27rem] border-8 bg-slate-200 flex flex-col p-3 mr-6">
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </div>
  );
};
