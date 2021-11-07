import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useMutation, useQueryClient } from "react-query";
import * as auth from "utils/auth-provider";
import { AuthForm } from "src/types";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const mutation = useMutation((form: AuthForm) => auth.login(form));

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      mutation.mutate(values);
    } catch (e: any) {
      onError(e);
    }
  };

  if (mutation.isSuccess) {
    useQueryClient().setQueryData("auth", mutation.data);
    console.log("login success");
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
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
