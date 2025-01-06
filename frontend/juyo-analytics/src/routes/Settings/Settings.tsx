import React from 'react'
import { Switch,Input } from 'antd'
import AppLayout from '../../components/Layout/AppLayout'

export default function Settings() {
  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
}

  return (
    <AppLayout Children ={

      <div className={`p-8 ${dark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-4xl font-semibold  mb-8">Settings</h2>

        <div className="space-y-8">
          {/* Section: Dark Mode Toggle */}
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

          {/* Section: Account Settings */}
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

          {/* Section: Privacy Settings */}
          <div className="bg-white shadow-lg rounded-lg p-8 transition-all hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Privacy Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Input
                  type="checkbox"
                  className="h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500 transition-all"
                />
                <label className="ml-4 text-lg text-gray-700">Enable Two-Factor Authentication</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-indigo-500 rounded focus:ring-indigo-500 transition-all"
                />
                <label className="ml-4 text-lg text-gray-700">Make Profile Private</label>
              </div>
            </div>
          </div>

          {/* Section: Notification Settings */}
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

          {/* Save Button */}
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

