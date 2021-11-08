import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useMutation, useQueryClient } from "react-query";
import * as auth from "utils/auth-provider";
import { AuthForm } from "src/types";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const mutation = useMutation((form: AuthForm) => auth.register(form));
  const queryClient = useQueryClient();

  const handleSubmit = async ({
    password2,
    ...values
  }: {
    username: string;
    password: string;
    password2: string;
  }) => {
    if (password2 !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      mutation.mutate(values);
    } catch (e: any) {
      onError(e);
    }
  };

  if (mutation.isSuccess) {
    queryClient.invalidateQueries("auth");
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"password2"}
        rules={[{ required: true, message: "请确认密码" }]}>
        <Input placeholder={"确认密码"} type="password" id={"password2"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
