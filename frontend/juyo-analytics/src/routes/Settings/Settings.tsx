import React from "react";
import { Switch, Input, Form, Button } from "antd";
import AppLayout from "../../components/Layout/AppLayout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../features/grid/gridSlice";
import { RootState, selectDarkMode } from "../../app/store"; // Ensure correct import for RootState
import { motion } from "framer-motion";

export default function Settings() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode); // Get the current dark mode state from Redux
  const [form] = Form.useForm();

  const onFinish = (values: never) => {
    toast.success("Password changed successfully!");
    console.log("Values Submitted", values);
  };

  // Dark Mode Toggle Handler
  const darkModeHandler = () => {
    dispatch(toggleDarkMode()); // Dispatch action to toggle dark mode in Redux store
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dark = useSelector((state: RootState) => state.grid.darkMode); // Select updated dark mode state
    document.body.classList.toggle("dark", dark); // Toggle 'dark' class on body for styling
  };

  return (
    <AppLayout
      Children={
        <motion.div
          className={`p-8 transition-all`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-semibold mb-8">Settings</h2>

          <div className="space-y-8">
            {/* Appearance Settings */}
            <motion.div
              className={` shadow-xl rounded-lg p-6 mb-8  ${
                darkMode ? "bg-gray-900 " : "bg-white"
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={darkMode}
                    onChange={darkModeHandler}
                    className="mr-3"
                    size="large"
                  />
                  <span className="text-lg text-gray-700">
                    Enable Dark Mode
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  Switch between dark and light mode
                </span>
              </div>
            </motion.div>

            {/* Account Settings */}
            <motion.div
              className={` shadow-xl rounded-lg p-8 mb-8 ${darkMode?"bg-gray-900 ":"bg-white"}  `}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Account Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    className={`mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all  ${darkMode?"bg-gray-900  text-white":"bg-white text-gray-900"}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`mt-2 p-4 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all  ${darkMode?"bg-gray-900  text-white":"bg-white text-gray-900"}`}
                  />
                </div>
              </div>
            </motion.div>

            {/* Change Password */}
            <motion.div
              className={` shadow-xl rounded-lg p-8 mb-8  ${darkMode?"bg-gray-900 ":"bg-white"}  `}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Change Password</h3>

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
                    {
                      required: true,
                      message: "Please input your previous password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter previous password" />
                </Form.Item>

                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter new password" />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password" />
                </Form.Item>

                <motion.div
                  className="flex justify-end space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="primary"
                    className="bg-indigo-600 text-white rounded-lg shadow-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-30 "
                  >
                    Save Changes
                  </Button>
                  <Button className="  px-8 py-3 rounded-lg shadow-xl focus:outline-none transition-all">
                    Cancel
                  </Button>
                </motion.div>
              </Form>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              className={` shadow-xl rounded-lg p-8 mb-8 ${darkMode?"bg-gray-900 ":"bg-white"} `}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6">
                Notification Settings
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500 transition-all"
                  />
                  <label className="ml-4 text-lg text-gray-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500 transition-all"
                  />
                  <label className="ml-4 text-lg text-gray-700">
                    SMS Notifications
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Save Changes Button */}
            <motion.div
              className="flex justify-end mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                type="primary"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg shadow-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              >
                Save Changes
              </Button>
            </motion.div>
          </div>
        </motion.div>
      }
    />
  );
}
