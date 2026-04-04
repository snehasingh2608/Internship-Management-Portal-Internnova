import React from 'react';
import { Link } from 'react-router-dom';
import Greeting from '../../components/Greeting';
import StudentLayout from '../../layout/StudentLayout';

const StudentDashboard = () => {
    return (
        <StudentLayout>
            <div>
                <Greeting />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Dashboard Overview
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Track your applications and internship progress here.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/student/noc-request"
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
                        >
                            + Request NOC
                        </Link>
                    </div>
                </div>

                {/* Recent Applications */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium text-gray-900">
                            Recent Applications
                        </h3>
                        <p className="text-sm text-gray-500">
                            Details of your most recent internship applications.
                        </p>
                    </div>

                    <ul className="divide-y divide-gray-200">
                        {[
                            { company: 'TechCorp', role: 'Frontend Developer Intern', status: 'Applied', date: 'Oct 24, 2023' },
                            { company: 'InnovateInc', role: 'UX/UI Designer Intern', status: 'Interview', date: 'Oct 22, 2023' },
                            { company: 'DataSystems', role: 'Backend Developer Intern', status: 'Rejected', date: 'Oct 20, 2023' },
                        ].map((app, index) => (
                            <li key={index} className="px-4 py-4">
                                <div className="flex justify-between">
                                    <p className="text-primary font-medium">{app.role}</p>
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${
                                            app.status === 'Applied'
                                                ? 'bg-blue-100 text-blue-800'
                                                : app.status === 'Interview'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {app.status}
                                    </span>
                                </div>

                                <div className="flex justify-between mt-2 text-sm text-gray-500">
                                    <span>{app.company}</span>
                                    <span>Applied on {app.date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentDashboard;