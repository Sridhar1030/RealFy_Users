import React from 'react';

const UserList = ({ users }) => {
    if (users.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-slate-600 text-lg">
                    No users found matching your search criteria.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <div className="p-6">
                        {/* Header with name and ID */}
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold text-slate-800">
                                {user.name}
                            </h3>
                            <span className="px-3 py-1 bg-slate-100 rounded-full text-sm text-slate-600">
                                ID: {user.id}
                            </span>
                        </div>

                        {/* User information grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <InfoItem label="Email" value={user.email} />
                                <InfoItem label="Age" value={`${user.age} years`} />
                                <InfoItem label="Weight" value={`${user.weight} kg`} />
                            </div>
                            <div className="space-y-3">
                                <InfoItem label="Height" value={`${user.height} cm`} />
                                <InfoItem label="Health Goals" value={user.healthGoals} />
                                <InfoItem
                                    label="Created At"
                                    value={new Date(
                                        user.createdAt._seconds * 1000
                                    ).toLocaleString()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper component for consistent info display
const InfoItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-slate-700">{value}</span>
    </div>
);

export default UserList;