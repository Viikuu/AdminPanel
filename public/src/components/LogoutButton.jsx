import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export function LogoutButton({currentUserName}) {
	const navigate = useNavigate();
	const handleClick = async () => {
		await axios.get(logoutRoute, {withCredentials: true});
		navigate("/login");
	};
	return (
		<button onClick={ handleClick} className={"flex  content-center justify-content gap-3 "}>
			<p className={ "flex p-0.5"}>
				{currentUserName}
			</p>
			<BiPowerOff />
		</button>
	);
}
