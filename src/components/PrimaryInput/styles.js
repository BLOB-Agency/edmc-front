import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        marginLeft: 12,
        marginBottom: 5,
        fontSize: 14,
        fontFamily: 'Cereal-Medium',
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 1,
        paddingVertical: 14,
        borderRadius: 30,
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontFamily: 'Cereal-Book',
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    disabledInputContainer: {
        // Example styling: lighter background, etc.
        backgroundColor: 'rgba(200, 200, 200, 0.1)',
    },
    disabledInput: {
        color: 'white', // Example styling: grayed out text
        // Adjust styles as needed
    },
});


export default styles;