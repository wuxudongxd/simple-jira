import { Form, Input } from "antd";
import { LongButton } from "./index";
import { AuthForm } from "types/index";
import { useLogin } from "src/hooks/useAuth";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const mutation = useLogin();
  const handleSubmit = async (values: AuthForm) => {
    try {
      mutation.mutate(values);
    } catch (e: any) {
      onError(e);
    }
  };

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
