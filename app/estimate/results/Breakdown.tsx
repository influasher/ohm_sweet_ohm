import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EnergyDashboard = () => {
    const [activeTab, setActiveTab] = useState('cost');

    const costData = [
        { name: 'Room 1', value: 76, cost: 43.73, consumption: 92.58 },
        { name: 'Room 2', value: 24, cost: 43.73, consumption: 92.58 },
    ];

    const consumptionData = [
        { name: 'Generic Refrigerator - Large', consumption: 91.08, cost: 28.24 },
        { name: 'Generic Ceiling Fan with Light - Large', consumption: 42, cost: 13.02 },
        { name: 'Meyer MMEK1500D Kettle 1.5L', consumption: 1.5, cost: 0.47 },
    ];

    const COLORS = ['#d8b4fe', '#f0abfc'];

    const Tab = ({ id , label, isActive, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`px-4 py-2 font-semibold ${isActive ? 'text-purple-700 border-b-2 border-purple-700' : 'text-black'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
            <div className="flex mb-4 border-b">
                <Tab id="cost" label="Cost Breakdown" isActive={activeTab === 'cost'} onClick={setActiveTab} />
                <Tab id="consumption" label="Consumption Breakdown" isActive={activeTab === 'consumption'} onClick={setActiveTab} />
            </div>

            {activeTab === 'cost' && (
                <div className="text-black">
                    <h2 className="text-2xl font-bold mb-4 ">Monthly Cost Breakdown</h2>
                    <div className="flex">
                        <div className="w-1/2">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={costData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                        {costData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-1/2">
                            {costData.map((room, index) => (
                                <div key={index} className="mb-2">
                                    <div className="flex items-center">
                                        <div className={`w-4 h-4 mr-2 rounded-full`} style={{ backgroundColor: COLORS[index] }}></div>
                                        <span>{room.name}</span>
                                    </div>
                                    <div className="ml-6 text-sm text-gray-600">
                                        {room.value}% (${room.cost.toFixed(2)}, {room.consumption} kWh)
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {['Room 1', 'Room 2'].map((room, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="font-semibold">{room}</h3>
                            {consumptionData.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex justify-between items-center py-2">
                                    <div>
                                        <div>{item.name}</div>
                                        <div className="text-sm text-gray-600">{item.consumption} kWh/month</div>
                                    </div>
                                    <div>${item.cost.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'consumption' && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Highest Monthly Consumption</h2>
                    {consumptionData.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                            <div>
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-sm text-gray-600">{item.consumption} kWh/month</div>
                            </div>
                            <div>${item.cost.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnergyDashboard;