

const fakeUserData = {
    id: '123',
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    password: 'password123',
    color: '#800080',

};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const signIn = async (email, password) => {
    await delay(100); // Simulates network delay
    if (email === 'johndoe@example.com' && password === 'password123') {
        return { ...fakeUserData, token: 'fakeToken123' };
    } else {
        throw new Error('Invalid email or password');
    }
};

export const signUp = async (username, email, password) => {
    await delay(1000); // Simulates network delay
    // Simulate user creation logic
    return { ...fakeUserData, username, email, token: 'fakeToken123' };
};

// You can add more functions for other endpoints like verifyEmail, resetPassword, etc.
