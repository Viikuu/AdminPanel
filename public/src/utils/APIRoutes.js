const host = "http://localhost:5000";
const registerRoute = `${host}/api/auth/register`;
const loginRoute = `${host}/api/auth/login`;
const logoutRoute = `${host}/api/auth/logout`;
const allUsersRoute = `${host}/api/auth/allusers`;
const blockUsersRoute = `${host}/api/auth/blockusers`;
const unBlockUsersRoute = `${host}/api/auth/unblockusers`;
const deleteUsersRoute = `${host}/api/auth/`;
const singleUserRoute = `${host}/api/auth/`;
export {
	host,
	registerRoute,
	loginRoute,
	logoutRoute,
	allUsersRoute,
	deleteUsersRoute,
	blockUsersRoute,
	singleUserRoute,
	unBlockUsersRoute,
};
