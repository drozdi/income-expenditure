const USERID_KEY = 'user-local-id';

export function setTokens({ userId }) {
	localStorage.setItem(USERID_KEY, userId);
}
export function removeAuthData() {
	localStorage.removeItem(USERID_KEY);
}

export function getUserId() {
	return localStorage.getItem(USERID_KEY);
}
const localStorageService = {
	setTokens,
	getUserId,
	removeAuthData,
};
export default localStorageService;
