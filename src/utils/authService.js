import config from "../../config";

export default {
    verifyToken: async (token) => {
        try {
            const response = await fetch(`${config.API_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const json = await response.json();

                return json.user
            }

            return false
        } catch (error) {
            console.error('Error verifying token', error);
            return false;
        }
    },

    loginUser: async (userData) => {
        console.log("userData: ", userData);
        const response = await fetch(`${config.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return await response.json();
        }

        let errorData = await response.text();
        console.log('text', errorData)
        errorData = JSON.parse(errorData);
        console.log('err', errorData)
        if (errorData.errors) {
            const errors = Object.keys(errorData.errors).reduce((acc, key) => {
                acc[key] = errorData.errors[key].join(' ');
                return acc;
            }, {});

            throw new Error(JSON.stringify(errors));
        }

        throw new Error(JSON.stringify({error: errorData.message }?? 'An error occurred'));
    },

    createUser: async (userData) => {
        console.log("userData: ", userData);
        console.log(`${config.API_URL}/auth/register`)
        const response = await fetch(`${config.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return await response.json();
        }
        console.log('text', await response.text())
        const errorData = JSON.parse(await response.text());
        if (errorData.errors) {
            const errors = Object.keys(errorData.errors).reduce((acc, key) => {
                acc[key] = errorData.errors[key].join(' ');
                return acc;
            }, {});
            console.log('err', errors)

            throw new Error(JSON.stringify(errors));
        }

        throw new Error(errorData.message ?? 'An error occurred');
    },

    verifyEmail: async (userData) => {

    }
}