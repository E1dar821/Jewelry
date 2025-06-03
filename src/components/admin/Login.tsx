import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // In a real application, you would validate against your backend
    // This is just a simple example - replace with your actual authentication logic
    if (username === 'admin' && password === 'your-secure-password') {
      // Store authentication token
      localStorage.setItem('adminAuth', 'true');
      // Redirect to admin panel
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black/95 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/50 p-8 rounded-lg border border-white/10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-gold" size={24} />
          </div>
          <h1 className="text-2xl font-serif text-gold">Admin Access</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-black py-2 rounded hover:bg-gold/90 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 