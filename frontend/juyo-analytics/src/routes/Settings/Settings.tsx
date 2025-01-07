import React from 'react'
import { Switch,Input } from 'antd'
import AppLayout from '../../components/Layout/AppLayout'
import { Form, Button } from 'antd';
import { toast } from 'react-toastify';

export default function Settings() {
  const [dark, setDark] = React.useState(false);
  const [form] = Form.useForm();

  const onFinish = (values:never) => {
    toast.success('Password changed successfully!');
    console.log("Values Submitted",values)
  };
  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
}

  return (
    <AppLayout Children ={

      <div className={`p-8 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-4xl font-semibold  mb-8">Settings</h2>

        <div className="space-y-8">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 transition-all hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Switch
                  checked={dark}
                  onChange={darkModeHandler}
                  className="mr-3"
                  size="large"
                />
                <span className="text-lg text-gray-700">Enable Dark Mode</span>
              </div>
              <span className="text-gray-500 text-sm">Toggle to switch between light/dark mode</span>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 transition-all hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
                <input
                  type="text"
                  className="mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <Input
                  type="email"
                  className="mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>
           <div className="bg-white shadow-lg rounded-lg p-8 transition-all hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h3>
      
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Previous Password"
          name="previousPassword"
          rules={[
            { required: true, message: 'Please input your previous password!' },
          ]}
        >
          <Input.Password placeholder="Enter previous password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your new password!' },
            { min: 6, message: 'Password must be at least 6 characters long' }
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item
          label="Confirm New Password"
          name="confirmPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
          <div className="bg-white shadow-lg rounded-lg p-8 transition-all hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Notification Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500 transition-all"
                />
                <label className="ml-4 text-lg text-gray-700">Email Notifications</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500 transition-all"
                />
                <label className="ml-4 text-lg text-gray-700">SMS Notifications</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    }
    />
  )
}

