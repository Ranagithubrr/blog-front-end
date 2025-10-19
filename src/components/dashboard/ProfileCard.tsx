import React from "react";

interface ProfileProps {
  name: string;
  email: string;
  phone?: string;
  role?: string;
}

const ProfileCard: React.FC<ProfileProps> = ({ name, email, phone, role }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">Email: {email}</p>
      {phone && <p className="text-gray-600 mb-1">Phone: {phone}</p>}
      {role && <p className="text-gray-600">Role: {role}</p>}
    </div>
  );
};

export default ProfileCard;
