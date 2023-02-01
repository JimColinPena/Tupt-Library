import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { loadUser } from './actions/userActions'


import Dashboard from './components/layout/Dashboard'
import BookManagement from './components/admin/BookManagement'
import BookCreate from './components/admin/BookCreate'
import BookUpdate from './components/admin/BookUpdate'

import ResearchManagement from './components/admin/ResearchManagement'
import ResearchCreate from './components/admin/ResearchCreate'

import PersonnelManagement from './components/admin/PersonnelManagement'
import UserDetails from './components/admin/UserDetails'
import PersonnelCreate from './components/admin/PersonnelCreate'
import PersonnelUpdate from './components/admin/PersonnelUpdate'
import BooksBorrowed from './components/admin/BorrowedBooks'
import RegisteredUsers from './components/admin/RegisteredUsers'
import ApprovalUsers from './components/admin/ApprovalUsers'
import ReturnedBooks from './components/admin/ReturnedBooks'

import BookSearch from './components/user/BookSearch'
import UpdateProfile from './components/user/UpdateProfile'
import StudentBookDetails from './components/user/StudentBookDetails'
import BorrowDetails from './components/user/BorrowDetails'
import AppointmentDetails from './components/user/AppointmentDetails'

import Appointments from './components/admin/Appointments'

import HistoryLog from './components/admin/HistoryLog'


import Home from './components/Home'
import Register from './components/credential/Register'
import Login from './components/credential/Login'
import Profile from './components/credential/Profile'

import ProtectedRoute from './components/route/ProtectedRoute'
// import logo from './logo.svg';
import './App.css';

import store from "./store"
function App() {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} exact="true" />
					<Route path="/login" element={<Login />} exact="true" />
					<Route path="/register" element={<Register />} exact="true" />
					<Route path="/profile" element={<ProtectedRoute isAdmin={false}><Profile /></ProtectedRoute>} exact="true" />
					<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

					<Route path="/admin/books" element={<ProtectedRoute isAdmin={true}><BookManagement /></ProtectedRoute>} />
					<Route path="/book/new" element={<ProtectedRoute isAdmin={true}> <BookCreate /> </ProtectedRoute>} />
					<Route path="/admin/book/:id" element={<ProtectedRoute isAdmin={true}> <BookUpdate /></ProtectedRoute>} />

					<Route path="/admin/research" element={<ProtectedRoute isAdmin={true}><ResearchManagement /> </ProtectedRoute>} />
					<Route path="/research/new" element={<ProtectedRoute isAdmin={true}> <ResearchCreate /> </ProtectedRoute>} />

					<Route path="/admin/personnels" element={<ProtectedRoute isAdmin={true}><PersonnelManagement /> </ProtectedRoute>} />

					<Route path="/personnel/new" element={<ProtectedRoute isAdmin={true}> <PersonnelCreate /> </ProtectedRoute>} />
					<Route path="/admin/personnel/:id" element={<ProtectedRoute isAdmin={true}><PersonnelUpdate /> </ProtectedRoute>} />
					<Route path="/detail/student/:id" element={<ProtectedRoute isAdmin={true}> <UserDetails /> </ProtectedRoute>} />
					<Route path="/books/borrowed" element={<ProtectedRoute isAdmin={true}><BooksBorrowed /></ProtectedRoute>} />
					<Route path="/active/student" element={<ProtectedRoute isAdmin={true}><RegisteredUsers /></ProtectedRoute>} />
					<Route path="/inactive/student" element={<ProtectedRoute isAdmin={true}><ApprovalUsers /></ProtectedRoute>} />
					<Route path="/returned/books" element={<ProtectedRoute isAdmin={true}><ReturnedBooks /></ProtectedRoute>} />
					<Route path="/appointments" element={<ProtectedRoute isAdmin={true}><Appointments /></ProtectedRoute>} />

					<Route path="/historyLog" element={<ProtectedRoute isAdmin={true}><HistoryLog /></ProtectedRoute>} />

					<Route path="/student/books" element={<ProtectedRoute isAdmin={false}><BookSearch /></ProtectedRoute>} />
					<Route path="/update/student/:id" element={<ProtectedRoute isAdmin={false}><UpdateProfile /></ProtectedRoute>} />
					<Route path="/student/book/:id" element={<ProtectedRoute isAdmin={false}><StudentBookDetails /></ProtectedRoute>} />
					<Route path="/studentbook/borrow" element={<ProtectedRoute isAdmin={false}><BorrowDetails /></ProtectedRoute>} />
					<Route path="/studentbook/appointment" element={<ProtectedRoute isAdmin={false}><AppointmentDetails /></ProtectedRoute>} />

					
				</Routes>
			</div>
		</Router>

	);
}

export default App;
