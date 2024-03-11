import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    headerTitleSmall: {
        fontFamily: 'Cereal-Medium',
        fontSize: 16,
        color: '#FFFFFF',
        width: '100%',
        flex: 1,
        textAlign: 'center',
        paddingBottom: 18,
        letterSpacing: -0.73,
    },

    backButton: {
        height: 24,
        width: 24,
        position: 'absolute',
    },

    backIcon: {
        height: 16,
        width: 16,
    },


    headerTitle: {
        fontFamily: 'Cereal-Medium',
        fontSize: 24,
        color: '#FFFFFF',
        // letterSpacing: -0.73,
    },
    headerTitleLarge: {
        fontFamily: 'Cereal-Bold',
        fontSize: 36,
        color: '#FFFFFF',
        letterSpacing: -1.1,
    },
    smallTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: -36
    },
    filterContainer: {
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor : 'rgba(255, 255, 255, 0.25)',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 20,
        flex: 1,
        gap: 12,
        paddingHorizontal: 24,
        display: 'flex',
        width: '100%',
    },
    searchBar: {
        // flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    filterPill: {
        backgroundColor: '#f0f0f0', // Light grey, change as needed
        borderRadius: 20, // Creates the pill shape
        paddingHorizontal: 15, // Horizontal padding
        paddingVertical: 5, // Vertical padding, adjust based on your design
        margin: 5, // Margin around each pill
        justifyContent: 'center',
        alignItems: 'center',
    },

    filterPillText: {
        color: '#000', // Text color, change as needed
        fontSize: 14, // Adjust based on your design
    },
});


export default styles;