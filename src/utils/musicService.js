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

    fetchAlbum: async (token, album, with_media = false) => {
        const response = await fetch(`${config.API_URL}/albums/${album}?with_media=${with_media}`, {
            method: 'GET',
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        return  await response.json();
    },

    fetchRecentAlbums: async (token) => {
        console.info('Fetching recent albums')
        const response = await fetch(`${config.API_URL}/albums/recent`, {
            method: 'GET',
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        return  await response.json();
    }
}