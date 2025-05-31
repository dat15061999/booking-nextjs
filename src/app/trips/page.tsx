"use client";

import { useState } from "react";
import Link from "next/link";
import TripList from "@/components/TripList";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col text-gray-900 font-sans bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
            <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-md py-4 text-center text-white font-bold tracking-wider select-none shadow-lg border-b border-white/20">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        4F Odyssey
                    </div>
                    <div className="flex gap-8">
                        <Link
                            href="/"
                            className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
                        >
                            Trang chủ
                        </Link>
                        <Link
                            href="/booking"
                            className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
                        >
                            Tạo chuyến đi
                        </Link>
                        <Link
                            href="#about"
                            className="hover:text-blue-200 transition-all duration-300 hover:scale-110"
                        >
                            Giới thiệu
                        </Link>
                    </div>
                </div>
            </div>

            <div className="pt-24 pb-12 w-full container mx-auto px-4">
                <TripList />
            </div>

            <footer className="bg-indigo-900 text-white py-8 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">4F Odyssey</h3>
                            <p className="text-indigo-200">
                                Plan and organize your perfect trips with our smart travel planner.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-indigo-200 hover:text-white transition-colors">
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/home" className="text-indigo-200 hover:text-white transition-colors">
                                        Tạo chuyến đi
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#about" className="text-indigo-200 hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Contact</h3>
                            <p className="text-indigo-200">
                                Email: info@mytrips.com
                            </p>
                            <p className="text-indigo-200">
                                Phone: +1 (123) 456-7890
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-300">
                        <p>&copy; {new Date().getFullYear()} 4F Odyssey. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
