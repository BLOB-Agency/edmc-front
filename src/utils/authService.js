import config from "../../config";

export default {
    verifyToken: async (token) => {
        try {
            const response = await fetch(`${config.API_URL}/auth/me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                return result.isValid;
            }

            return false;
        } catch (error) {
            console.error('Error verifying token', error);
            return false;
        }
    },

    createUser: async (userData) => {
        console.log("userData: ", userData);
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

        const error = await response.json();
        throw new Error(error.message);
    }
}