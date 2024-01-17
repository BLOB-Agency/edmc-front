import config from "../../config";

export default {
    fetchHomeData: async (token) => {
        const response = await fetch(`${config.API_URL}/songs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },

        });

        return await response.json();
    },
}