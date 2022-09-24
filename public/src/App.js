import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Register} from './pages/Register';
import {Login} from './pages/Login';
import AdminPanel from './pages/AdminPanel';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/register"} element = {<Register />} />
				<Route path={"/login"} element = {<Login />} />
				<Route path={"/"} element = {<AdminPanel />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;