import React, { useState } from "react";
import { Card, Button, Select, Row, Col, DatePicker } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import AppLayout from "../components/Layout/AppLayout";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../features/grid/gridSlice";

const { Option } = Select;

export default function Droprate() {
  const [checkInDate, setCheckInDate] = useState<moment.Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<moment.Moment | null>(null);
  const [location, setLocation] = useState<string>("");
  const [budgetType, setBudgetType] = useState<string>("");

  const handleConfirm = () => {
    console.log("Confirmed Data:", { checkInDate, checkOutDate, location, budgetType });
  };
  
  const darkMode = useSelector(selectDarkMode);

  const hotelData = [
    { name: "Hotel A", score: 4.5, price: 1200, review: 250, address: "123 Main St, City A" },
    { name: "Hotel B", score: 4.2, price: 1500, review: 300, address: "456 Elm St, City B" },
    { name: "Hotel C", score: 4.7, price: 2000, review: 150, address: "789 Oak St, City C" },
    { name: "Hotel D", score: 4.7, price: 3400, review: 550, address: "789 Oak St, City C" },
    { name: "Hotel E", score: 4.7, price: 470, review: 450, address: "789 Oak St, City C" },
    { name: "Hotel F", score: 4.7, price: 5000, review: 200, address: "789 Oak St, City C" },
  ];

  return (
    <AppLayout
      Children={
        <div className={`p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
          <div className="header-container mb-6">
            <h1 className="header-title text-3xl font-bold mb-2">Drop Rate</h1>
            <p className="header-description text-lg">
              Find the best hotel deals at unbeatable prices.
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Button icon={<LeftOutlined />} />
              <Select defaultValue="February 2025" style={{ width: 150 }}>
                <Option value="February 2025">February 2025</Option>
              </Select>
              <Button icon={<RightOutlined />} />
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <label>Check-in</label>
                <DatePicker
                  value={checkInDate}
                  onChange={setCheckInDate}
                  format="YYYY-MM-DD"
                  style={{ width: 120 }}
                />
              </div>
              <div>
                <label>Check-out</label>
                <DatePicker
                  value={checkOutDate}
                  onChange={setCheckOutDate}
                  format="YYYY-MM-DD"
                  style={{ width: 120 }}
                />
              </div>
              <div>
                <label>Location</label>
                <Select
                  value={location}
                  onChange={setLocation}
                  style={{ width: 150 }}
                  placeholder="Select Location"
                >
                  <Option value="Location A">Location A</Option>
                  <Option value="Location B">Location B</Option>
                  <Option value="Location C">Location C</Option>
                </Select>
              </div>
              <div>
                <label>Budget</label>
                <Select
                  value={budgetType}
                  onChange={setBudgetType}
                  style={{ width: 120 }}
                  placeholder="Select Budget"
                >
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </div>
              <Button type="primary" onClick={handleConfirm}>Confirm</Button>
            </div>
          </div>

          <Row gutter={[16, 16]}  >
            {hotelData.map((hotel, index) => (
              <Col key={index} span={8}>
                <Card
                  hoverable
                  bordered
                  style={{backgroundColor:'#51cb51'}}
                  className={`shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                >
                  <Card.Meta
                    title={hotel.name}
                    description={
                      <>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Score: {hotel.score} | Reviews: {hotel.review}
                        </div>
                        <div className={`text-lg font-bold mt-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                          €{hotel.price}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                          {hotel.address}
                        </div>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      }
    />
  );
}
