import React from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

const reportsData = [
  {
    title: '1:Reports',
    items: [
      { name: 'RevPAR' },
      { name: 'Rooms Sold/Occupancy' },
      { name: 'Average Daily Rate' },
      { name: 'Channel Production' },
      { name: 'Reservations by Rate Plan' },
      { name: 'Reservations By Country' },
    ],
  },
  {
    title: '2:Reports',
    items: [
      { name: 'Payment Processing Report' },
      { name: 'Payouts Report' },
      { name: 'Future Payout' },
      { name: 'Monthly Statements' },
    ],
  },
  {
    title: '3:Reports',
    items: [
      { name: 'Account Balances' },
      { name: 'Arrivals Report' },
      { name: 'Departures Report' },
      { name: 'In-House Report' },
      { name: 'No-Show Report' },
      { name: 'Cancelations Report' },
      { name: 'Room assignments' },
      { name: 'Notes' },
      { name: 'Payment Reconciliation Report' },
      { name: 'User Reconciliation Report' },
      { name: 'Daily Revenue Report' },
      { name: 'Room Move Report' },
    ],
  },
  {
    title: '4:Reports',
    items: [{ name: 'Police Report' }],
  },
  {
    title: 'Others',
    items: [{ name: 'Stock & Inventory Report' }],
  },
];

function Reports() {
  const navigate = useNavigate();

  return (
    <AppLayout Children={  
      <div className="p-4 bg-white">
        <Row gutter={[16, 16]}>
          {reportsData.map((section) => (
            <Col key={section.title} xs={24} md={8} lg={6}>
              <Card
                title={<span style={{ color: 'black', fontSize: '18px', fontWeight: 'bold' }}>{section.title}</span>}
                bordered={false}
                className="bg-white shadow-md"
                hoverable
              >
                <ul style={{ padding: '0', listStyleType: 'none' }}>
                  {section.items.map((item) => (
                    <li key={item.name} className="hover:text-gray-200">
                      <div
                        onClick={() => navigate(`/newreports/`)}
                        style={{
                          color: '#007bff', // Blue color
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: '10px',
                          borderRadius: '4px',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f8ff')} // Light blue background on hover
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')} // Remove background when not hovering
                      >
                        {item.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    } />
  );
}

export default Reports;
