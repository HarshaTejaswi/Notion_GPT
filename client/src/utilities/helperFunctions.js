
export function logOut() {

    localStorage.removeItem('access_token');
    window.location.pathname = '/'

    // window.history.pushState(null, null, window.location.pathname);
    // window.addEventListener('popstate', preventNavigation);

}