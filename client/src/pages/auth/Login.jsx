import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import campusBg from '../../assets/campus.png';
import Logo from '../../components/common/Logo';


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        setError('');

        try {
            const user = await login(email, password);
            if (user.role === 'student') navigate('/student/dashboard');
            else if (user.role === 'faculty') navigate('/faculty/dashboard');
            else if (user.role === 'admin') navigate('/admin/dashboard');
            else setError('Invalid user role');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div 
            className="min-h-screen relative flex items-center justify-center p-4 font-sans"
            style={{
                backgroundImage: `url(${campusBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70 sm:bg-black/60 backdrop-blur-sm sm:backdrop-blur-md transition-all"></div>
            
            <div className="relative w-full max-w-md z-10">
                {/* Glass Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 transform transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">

                        {/* Header */}
                        <div className="text-center mb-10">
                            <div className="mb-6 flex justify-center">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 shadow-lg shadow-purple-500/30 transform transition-transform hover:scale-110 hover:rotate-3 duration-300">
                                    <Logo size="large" clickable={false} />
                                </div>
                            </div>
                            <p className="text-blue-100/80 font-medium">Welcome back! Please sign in.</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {error && (
                                <div className="text-sm text-red-100 bg-red-500/20 backdrop-blur-md border border-red-500/50 rounded-xl px-4 py-3 flex items-center gap-2 animate-pulse">
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-blue-100/90 mb-2 ml-1">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@university.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl focus:outline-none focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 shadow-inner"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-blue-100/90 mb-2 ml-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-xl focus:outline-none focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 shadow-inner"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-blue-100/90 mb-2 ml-1">
                                    Login As
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 appearance-none cursor-pointer shadow-inner"
                                    style={{
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255, 255, 255, 0.7)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                        backgroundPosition: 'right 1.25rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.25em 1.25em',
                                        paddingRight: '3rem'
                                    }}
                                >
                                    <option value="student" className="text-gray-900 bg-white">Student</option>
                                    <option value="faculty" className="text-gray-900 bg-white">Faculty</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between text-sm px-1">
                                <label htmlFor="remember-me" className="flex items-center cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 border-2 border-white/30 rounded bg-white/5 peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-purple-500 peer-checked:border-transparent transition-all flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="ml-3 text-blue-100/80 group-hover:text-white transition-colors">Remember me</span>
                                </label>
                                <button type="button" className="font-medium text-blue-300 hover:text-white hover:underline transition-all">
                                    Forgot password?
                                </button>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full relative group overflow-hidden py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-500 hover:via-indigo-400 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-96 ease"></span>
                                    <span className="relative flex items-center justify-center gap-2">
                                        Sign in <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </span>
                                </button>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-sm text-center text-blue-100/70">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-bold text-white hover:text-purple-300 transition-colors">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="text-center mt-8 text-xs font-medium text-white/50 tracking-wider flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        SECURE AUTHENTICATION
                    </div>
                </div>
        </div >
    );
};

export default Login;
