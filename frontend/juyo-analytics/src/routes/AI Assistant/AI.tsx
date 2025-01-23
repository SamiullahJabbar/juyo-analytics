import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AppLayout from "../../components/Layout/AppLayout";
import { Input, Button, Spin } from "antd";
import { SmileOutlined, RobotOutlined, AudioOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice";

export default function AI() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // Tracks recording state
  const [audioBlob, setAudioBlob] = useState(null); // Stores the recorded audio
  const recorderRef = useRef(null); // Ref to store the MediaRecorder instance

  const darkMode = useSelector(selectDarkMode); // Get darkMode state

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            ...messages.map((msg) => ({
              role: msg.sender === "ai" ? "assistant" : "user",
              content: msg.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error fetching AI response:", error.response || error.message);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I couldn't process that request." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop the recording
      recorderRef.current.stop();
    } else {
      // Start the recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        recorderRef.current = mediaRecorder;

        const audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          setAudioBlob(audioBlob);
          // You can send the audioBlob to an API here if needed
        };

        mediaRecorder.start();
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }
    setIsRecording((prev) => !prev);
  };

  return (
    <AppLayout
      Children={
        <div
          className={`p-6 min-h-screen ${
            darkMode ? "bg-gray-900" : "bg-gradient-to-r from-blue-100 to-purple-200"
          }`}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center items-center gap-4">
              <motion.div
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <RobotOutlined style={{ fontSize: "2rem" }} />
              </motion.div>
              <h1 className="text-5xl font-extrabold text-blue-900">
                Chat with AI
              </h1>
              <motion.div
                className="bg-yellow-400 text-white p-4 rounded-full shadow-lg"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <SmileOutlined style={{ fontSize: "2rem" }} />
              </motion.div>
            </div>

            <p className="mt-4 text-gray-700 text-lg">
              Engage in meaningful conversations with your AI assistant. Ask
              anything!
            </p>
          </motion.div>

          <motion.div
            className={`shadow-2xl rounded-xl p-6 max-w-3xl mx-auto ${
              darkMode ? "bg-gray-900 shadow-lg shadow-gray-500" : "bg-white"
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="h-96 overflow-y-auto border-b border-gray-200 p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg max-w-md ${
                    msg.sender === "ai"
                      ? "bg-gradient-to-r from-purple-200 to-purple-300 text-purple-900 self-start shadow-lg"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white self-end shadow-lg"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex items-center mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Input.TextArea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className={`flex-grow mr-4 rounded-lg resize-none shadow-md focus:ring-2 focus:ring-blue-400 ${
                  darkMode ? "bg-gray-900 text-black" : ""
                }`}
                disabled={loading}
              />
              <Button
                type="primary"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                onClick={sendMessage}
                disabled={loading}
              >
                {loading ? <Spin size="small" /> : "Send"}
              </Button>
              <Button
                type="default"
                className={`ml-4 ${
                  isRecording ? "bg-red-500 text-white" : "bg-gray-200"
                } px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105`}
                onClick={toggleRecording}
              >
                <AudioOutlined /> {isRecording ? "Stop" : "Voice"}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      }
    />
  );
}
