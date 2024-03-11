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
                errorData = JSON.parse(errorData);
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
        const response = await fetch(`${config.API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        }

        throw new Error(JSON.stringify(result));

    },

    saveColor: async ({token, color}) => {
        color = color.replace("#", "")

        const response = await fetch(`${config.API_URL}/auth/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({color})
        });


        if (response.ok) {
            return await response.json();
        }

        throw new Error("Something went wrong. (TraceID 0x32D2)")
    },

    toggleNotifications: async ({token, notifications_enabled}) => {

        const response = await fetch(`${config.API_URL}/auth/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({notifications_enabled})
        });


        if (response.ok) {
            return await response.json();
        }

        throw new Error("Something went wrong. (TraceID 0x32D3)")
    },


    verifyEmail: async ({token, userData}) => {
        const response = await fetch(`${config.API_URL}/auth/verify-email`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        }

        throw new Error(JSON.stringify(result));
    }
}