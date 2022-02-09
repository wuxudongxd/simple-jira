import { Button, Form, Input } from 'antd';
import { useLogin } from '~/hooks/http/useAuth';

interface setError {
  onError: (error: Error) => void;
}

export const LoginScreen = ({ onError }: setError) => {
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
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button className="w-full" htmlType="submit" type="primary">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
