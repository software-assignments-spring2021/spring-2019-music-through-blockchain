const initState = {
}

const authReducer = (state = initState, payload) => {

    switch(payload.type){
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
            }
            
        default:
            return state;
        }
}

export default authReducer