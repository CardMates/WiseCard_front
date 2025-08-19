import { StyleSheet } from 'react-native';

export const gsiButtonStyles = StyleSheet.create({
    materialButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#747775',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 400,
        minWidth: 64,
    },
    buttonIcon: {
        width: 28,
        height: 28,
        marginRight: 12,
    },
    buttonContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContents: {
        color: '#1F1F1F',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '600',
        overflow: 'hidden',
        includeFontPadding: false, // Android에서 불필요한 여백 제거
        textAlignVertical: 'center',
        transform: [{ translateY: -2 }],
    },
    disabled: {
        backgroundColor: '#ffffff61',
        borderColor: '#1f1f1f1f',
    },
    disabledContents: {
        opacity: 0.38,
    },
    disabledIcon: {
        opacity: 0.38,
    },
});
