import { BookA, BookOpen, LogOut, User, Plus, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = ({ notes = [] }) => {
    const { user, setUser } = getData()
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")

    const [search, setSearch] = useState("")

    const logoutHandler = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8000/user/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            if (res.data.success) {
                setUser(null)
                localStorage.clear()
                toast.success(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <nav className="p-3 border-b bg-white shadow-sm">

            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* LOGO */}
                <div className="flex gap-2 items-center">
                    <BookOpen className="h-6 w-6 text-green-700" />
                    <h1 className="font-bold text-xl">
                        <span className="text-green-600">Notes</span>App
                    </h1>
                </div>

                {/* SEARCH BAR */}
                <div className="flex items-center gap-3 w-[40%]">

                    <div className="flex items-center border rounded-lg px-3 py-1 w-full">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search notes..."
                            className="ml-2 w-full outline-none"
                        />
                    </div>

                    {/* CREATE BUTTON */}
                    <button
                        onClick={()=>navigate('/create-todo')}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-1"
                    >
                        <Plus size={16} /> New
                    </button>
                </div>

                {/* USER MENU */}
                <div className="flex items-center gap-6">

                    {user ? (
                        <DropdownMenu>

                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">

                                <DropdownMenuLabel>
                                    {user.username}
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <User /> Profile
                                </DropdownMenuItem>

                                <DropdownMenuItem onClick={() => navigate("/notes")}>
                                    <BookA /> My Notes
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={logoutHandler}>
                                    <LogOut /> Logout
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                    ) : (
                        <Link to="/login" className="text-green-700 font-semibold">
                            Login
                        </Link>
                    )}
                </div>

            </div>

            {/* 🔥 LIVE NOTES PREVIEW DROPDOWN AREA */}
            {search && (
                <div className="max-w-7xl mx-auto mt-2 bg-white border rounded-lg shadow p-2 max-h-60 overflow-y-auto">
                    {filteredNotes.length === 0 ? (
                        <p className="text-gray-400 text-sm">No notes found</p>
                    ) : (
                        filteredNotes.map(note => (
                            <div
                                key={note._id}
                                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                            >
                                <p className="font-semibold">{note.title}</p>
                                <p className="text-xs text-gray-500 truncate">
                                    {note.content}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}

        </nav>
    )
}

export default Navbar