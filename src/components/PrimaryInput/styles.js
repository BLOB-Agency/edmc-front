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
        alignItems: 'center',
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
        width: 20,
        height: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'Cereal-Book',
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        fontFamily: 'Gordita-Medium',
        color: 'red',
        fontSize: 12,
        marginTop: 5,
        marginLeft: 12,
    },
});


export default styles;