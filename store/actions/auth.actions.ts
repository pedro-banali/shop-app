export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';

export const signUp = (email: string, password: string) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqjjx7CmIC4eQBqTdaah65UCVWtx-P1Ao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();

        console.log(resData);

        dispatch({ type: SIGN_UP, payload: {} });
    };
};

export const login = (email: string, password: string) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqjjx7CmIC4eQBqTdaah65UCVWtx-P1Ao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const resData = await response.json();

        console.log(resData);

        dispatch({ type: LOGIN, payload: {} });
    };
};