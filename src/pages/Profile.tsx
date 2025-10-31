import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [editMode, setEditMode] = useState(false);

  // Security fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Placeholder for update logic
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add update logic (API/store)
    setEditMode(false);
    alert('Profile updated (not really, this is a UI demo)');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add password change logic (API/store)
    alert('Password changed (not really, this is a UI demo)');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary-700">Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={avatar || 'https://i.pravatar.cc/150?img=1'}
              alt="Profile"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="text-neutral-500">{user?.role}</p>
            </div>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={!editMode}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={!editMode}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              disabled={!editMode}
            />
            <Input
              label="Profile Picture URL"
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              disabled={!editMode}
            />
            <div className="flex gap-4 mt-4">
              {editMode ? (
                <>
                  <Button type="submit" variant="primary">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                </>
              ) : (
                <Button type="button" variant="secondary" onClick={() => setEditMode(true)}>Edit Profile</Button>
              )}
            </div>
          </form>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-4">Security</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary">Change Password</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;