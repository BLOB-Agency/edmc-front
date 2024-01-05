import * as SecureStore from 'expo-secure-store';
export default {
    getTokenFromStorage: async () => {
        try {
            return await SecureStore.getItemAsync('userToken');
        } catch (error) {
            console.error('Error fetching token from secure storage', error);
            return null;
        }
    },

    setTokenInStorage: async (token) => {
        try {
            await SecureStore.setItemAsync('userToken', token);
        } catch (error) {
            console.error('Error setting token in secure storage', error);
        }
    },

    deleteTokenFromStorage: async () => {
        try {
            await SecureStore.deleteItemAsync('userToken');
        } catch (error) {
            console.error('Error deleting token from secure storage', error);
        }
    }
}
