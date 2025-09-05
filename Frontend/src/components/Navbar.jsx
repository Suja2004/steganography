import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = [
        { name: "Aim", path: "/" },
        { name: "Objective", path: "/objective" },
        { name: "Theory", path: "/theory" },
        { name: "Procedure", path: "/procedure" },
        { name: "Simulation", path: "/simulation" },
        { name: "Assignment", path: "/assignment" },
    ];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="w-full bg-gray-800 flex justify-between text-amber-50 p-4 fixed top-0 left-0 z-10 shadow-lg">
            <NavLink to="/" className="text-4xl font-bold cursor-pointer">
                StegaLab
            </NavLink>

            {menuOpen ? (
                <X className="cursor-pointer" size={40} onClick={toggleMenu} />
            ) : (
                <Menu className="cursor-pointer" size={40} onClick={toggleMenu} />
            )}

            <nav
                className={`absolute top-19 right-0 w-60 h-screen bg-gray-800 p-4 flex flex-col gap-4 text-xl transition-all ease-in-out duration-700 ${menuOpen
                        ? "transform translate-x-0 opacity-100"
                        : "transform translate-x-full opacity-0"
                    }`}
            >
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)} // close menu after click
                        className={({ isActive }) =>
                            `p-2 cursor-pointer transition-colors duration-300 ${isActive ? "text-amber-400 font-semibold" : "hover:text-amber-300"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
