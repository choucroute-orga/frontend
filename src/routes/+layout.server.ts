export function load({cookies}) {
    // Set a default value for the user
    const userNew = {
        id: "2",
        username: 'machine',
        email: 'arsene.fgr@proton.me',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hY2hpbmUiLCJlbWFpbCI6ImFyc2VuZS5mZ3JAcHJvdG9uLm1lIiwidXNlcklkIjoyLCJleHAiOjE3Mjk5ODE3Nzh9.VxtOh0-zKrcz3OGGGx6bNwG2tJJwKoI9Xwb29UTgX5s'
    }

    // First try to get the cookie
    const sessionid = cookies.get('sessionid');
    if (sessionid) {
        // If the cookie exists, set the user object with the cookie value
        // user = JSON.parse(sessionid);
    } else {

        // Set the user cookie
        cookies.set('sessionid', JSON.stringify(userNew), {
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 24 * 7,
            path: '/'
        });
    }
    
    return {
        user: userNew
    }
}