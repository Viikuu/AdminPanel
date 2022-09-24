import axios from 'axios';
import {unBlockUsersRoute} from '../utils/APIRoutes';

export function UnblockButton({users, setUsers}) {
	async function handleClick () {
		if( users.length > 0 ) {
			setUsers(users.map(user => {
				return user.selected ? {...user, status: 'active'} : user;
			}));
			await axios.put(unBlockUsersRoute, users.filter(user => user.selected).map(user => user._id), {withCredentials: true});
		}
	}
	return (
		<>
			<button onClick={handleClick} className={"flex p-0.5 m-4 content-center justify-content gap-3"}>
				unBlock
			</button>
		</>
	)
}