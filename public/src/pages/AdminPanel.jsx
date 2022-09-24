import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {allUsersRoute, singleUserRoute} from '../utils/APIRoutes';
import {BlockButton} from '../components/BlockButton';
import {UnblockButton} from '../components/UnblockButton';
import {DeleteButton} from '../components/DeleteButton';
import {LogoutButton} from '../components/LogoutButton';
import {Checkbox} from '../components/Checkbox';
import {axiosWrapper} from '../utils/axiosWrapper';

export default function AdminPanel() {
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState(undefined);
	const [users, setUsers] = useState([]);
	const [isUserLoading, setIsUserLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [isCheckAll, setIsCheckAll] = useState(false);

	useEffect(() => {
		axios.get(singleUserRoute, {
			withCredentials: true
		}).then(response => {
			response = axiosWrapper(response, navigate);
			setCurrentUser(response.data);
			if (response.data === undefined) {
				navigate('/login');
			} else if (!response.data.status) {
				navigate('/login');
			} else {
				setIsUserLoading(false);
			}
		});
	}, [navigate]);

	useEffect(() => {
		axios.get(allUsersRoute, {
			withCredentials: true
		}).then(response => {
			response = axiosWrapper(response, navigate);
			setUsers(response.data.users.map(user => {
				return {
					selected: false, ...user
				};
			}));
			setIsLoading(false);
		});
	}, [navigate]);

	const handleClick = e => {
		const {id, checked} = e.target;
		setUsers(users.map(user => {
			return user._id === id ? {...user, selected: checked} : user
		}));

	};

	const handleSelectAll = () => {
		setUsers(users.map(user => {
			return {...user, selected: !isCheckAll};
		}))
		setIsCheckAll(!isCheckAll);
	};

	return (
		<>
			{isUserLoading ?
				(<></>) : (<div className={'h-screen w-screen flex flex-col justify-center gap-1 items-center bg-gray-800'}>
						<div
							className={'absolute text-3xl flex flex-row top-0 right-0 bg-sky-500 rounded-full content-center m-2 bg-purple-600 text-white py-4 px-8 border-none font-bold cursor-pointer uppercase hover:bg-violet-900'}>
							<LogoutButton currentUserName={currentUser.user.name}/>
						</div>
						<main
							className={'flex flex-col w-5/6 bg-gray-900 h-full top-28 relative content-center text-white border-solid border-2 border-purple-600'}>

							<div className={'flex border-purple-600 border-b-2 content-center justify-around'}>
								<BlockButton users={users} setUsers={setUsers}/>
								<UnblockButton users={users} setUsers={setUsers}/>
								<DeleteButton users={users} setUsers={setUsers}/>
							</div>
							<div className={'flex'}>
								<div className={'flex flex-col items-center justify-center p-10 w-1/6 border-b-2 border-purple-600'}>
									SelectAll
									<Checkbox
										type="checkbox"
										name="selectAll"
										id="selectAll"
										handleClick={handleSelectAll}
										isChecked={isCheckAll}
									/>
								</div>

								<div className={'flex gap-10 p-10 justify-around w-full text-2xl border-2 border-purple-600'}>
									<p className={'border-r-2 pr-5 w-52 justify-center flex items-center '}>Id</p>
									<span>Name</span>
									<span>E-mail</span>
									<span>Last login Time</span>
									<span>Registration Time</span>
									<span>Status</span>
								</div>
							</div>
							{isLoading ?
								<></> :
								(
									users.map(user => (
										<div className={'flex'} key={user._id}>
											<div className={'flex flex-col items-center justify-center p-10 w-1/6'}>
												Select
												<Checkbox
													key={user._id}
													type="checkbox"
													name={user.name}
													id={user._id}
													handleClick={handleClick}
													isChecked={user.selected}
												/>
											</div>
											<div
												className={'flex gap-10 p-10 justify-around w-full text-sm border-2 border-purple-600 text-opacity-1'}>
												<span
													className={'border-r-2 pr-5 w-720 justify-center flex items-center w-52'}>{user._id}</span>
												<span>{user.name}</span>
												<span>{user.email}</span>
												<span>{user.updatedAt}</span>
												<span>{user.createdAt}</span>
												<span>{user.status}</span>
											</div>
										</div>

									))
								)
							}
						</main>
					</div>
				)}
		</>
	)
};
