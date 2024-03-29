const BASE_URL = "http://localhost:3000"; // Adjust the URL based on your JSON server address

const verifyCode = async (code, email) => {
    try {
        const response = await fetch(`${BASE_URL}/users?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const users = await response.json();
        const user = users[0];

        if (!user) {
            throw new Error("User not found");
        }

        if (user.verificationCode !== code) {
            throw new Error("Invalid verification code");
        }
                
        // Let's generate a token for the user
        const token = Math.random().toString(36).substr(2,10);
        const datas = { ...user, token };
        return datas;
    } catch (error) {
        console.error("Error in checkCode:", error);
        throw error;
    }
};
export default verifyCode;
