import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Aim", path: "/", icon: "🎯" },
        { name: "Objective", path: "/objective", icon: "✅" },
        { name: "Theory", path: "/theory", icon: "📚" },
        { name: "Procedure", path: "/procedure", icon: "📋" },
        { name: "Simulation", path: "/simulation", icon: "🔬" },
        { name: "Assignment", path: "/assignment", icon: "📝" },
    ];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:bg-transparent md:backdrop-blur-none transition-opacity duration-300"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <div className="w-full bg-gray-800/10 backdrop-blur-md border-b border-gray-700/50 flex justify-between items-center text-amber-50 px-6 py-4 fixed top-0 left-0 z-50 shadow-2xl">
                <NavLink to="/" className="flex items-center space-x-3 group cursor-pointer bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent pb-1">
                    <span className="text-3xl font-bold group-hover:from-amber-300 group-hover:to-orange-300 transition-all duration-300">
                        StegaLab
                    </span>
                </NavLink>

                <button
                    onClick={toggleMenu}
                    className="relative p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-300 group"
                >
                    <div className="relative w-8 h-8">
                        <Menu
                            className={`absolute inset-0 transition-all duration-300 ${menuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                                } group-hover:text-amber-400`}
                            size={32}
                        />
                        <X
                            className={`absolute inset-0 transition-all duration-300 ${menuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                                } group-hover:text-amber-400`}
                            size={32}
                        />
                    </div>
                </button>
            </div>

            <nav
                className={`fixed top-20 right-0 w-80 h-full bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border-l border-gray-700/50 shadow-2xl z-50 transition-all ease-out duration-500 ${menuOpen
                        ? "transform translate-x-0 opacity-100"
                        : "transform translate-x-full opacity-0"
                    }`}
            >
                <div className="px-4 py-6 space-y-2">
                    {navItems.map((item, index) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `group flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:translate-x-2 ${isActive
                                    ? "bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-500/50 text-amber-300 shadow-lg shadow-amber-500/20"
                                    : "bg-gray-700/30 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 hover:border hover:border-amber-500/30 text-gray-300 hover:text-amber-300 hover:shadow-md"
                                }`
                            }
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${isActive
                                            ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30 scale-110"
                                            : "bg-gray-700 group-hover:bg-gradient-to-r group-hover:from-amber-500/50 group-hover:to-orange-600/50"
                                        }`}>
                                        {item.icon}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1">
                                        <span className={`text-lg transition-all duration-300 ${isActive
                                                ? "font-bold text-amber-200"
                                                : "font-medium group-hover:font-semibold"
                                            }`}>
                                            {item.name}
                                        </span>
                                    </div>

                                    {/* Active/Hover Indicator */}
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive
                                            ? "bg-amber-400 shadow-lg shadow-amber-400/50 scale-125"
                                            : "bg-transparent group-hover:bg-amber-400 group-hover:shadow-lg group-hover:shadow-amber-400/50"
                                        }`} />

                                    {/* Active indicator line */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-r-full shadow-lg shadow-amber-400/30" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Footer */}
                <div className="absolute bottom-20 left-0 right-0 p-6 border-t border-gray-700/30">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                            <p className="text-sm text-gray-400 font-medium">StegaLab v1.0</p>
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                        <p className="text-xs text-gray-500">Image Steganography Laboratory</p>
                    </div>
                </div>
            </nav>
        </>
    );
}