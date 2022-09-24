import axios from 'axios';
import {blockUsersRoute} from '../utils/APIRoutes';
import {axiosWrapper} from '../utils/axiosWrapper';
import {useNavigate} from 'react-router-dom';

export function BlockButton({users, setUsers}) {
	const navigate = useNavigate();
	async function handleClick () {
		if( users.length > 0 ) {
			setUsers(users.map(user => {
				return user.selected ? {...user, status: 'blocked'} : user;
			}));
			axiosWrapper(await axios.put(blockUsersRoute, users.filter(user => user.selected).map(user => user._id),{withCredentials: true}), navigate);
		}
	}
	return (
		<>
		<button onClick={handleClick} className={"flex p-0.5 m-4 content-center justify-content gap-3"}>
			Block
		</button>
		</>
	)
}