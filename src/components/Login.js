import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IoClose } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const Login = ({ isOpen, onClose }) => {
    const { loginWithRedirect } = useAuth0();

    if (!isOpen) return null;

    const handleLogin = () => {
        loginWithRedirect();
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-neutral-400 hover:text-white transition-colors"
                >
                    <IoClose />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Movie Explorer</h2>
                        <p className="text-neutral-400 text-sm">Sign in to save your preferences and discover more.</p>
                    </div>

                    <button 
                        onClick={handleLogin}
                        className="w-full flex items-center justify-center gap-3 bg-white text-neutral-900 py-3 rounded-full font-semibold hover:bg-neutral-200 transition-all active:scale-95 mb-4"
                    >
                        <FcGoogle className="text-2xl" />
                        Continue with Auth0
                    </button>

                    <p className="mt-8 text-center text-xs text-neutral-500">
                        By continuing, you agree to Movie Explorer's Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
