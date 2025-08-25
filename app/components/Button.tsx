import React from 'react';
import { Image, Pressable, Text, View } from "react-native";

export const MenuButton = ({
    icon,
    onPress,
    disabled,
    stylesSet
}: {
    icon: any;
    onPress: () => void;
    disabled?: boolean;
    stylesSet: any;
}) => {
    return (
        <Pressable
            style={[
                stylesSet.materialButton,
                //disabled && stylesSet.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {icon && (
                <Image
                    source={icon}
                    style={[stylesSet.buttonIcon, /*disabled && stylesSet.disabledIcon*/]}
                />
            )}
        </Pressable>
    );
}

export const BannerButton = ({
    title,
    icon,
    onPress,
    disabled,
    stylesSet
}: {
    title: string;
    icon: any;
    onPress: () => void;
    disabled?: boolean;
    stylesSet: any;
}) => {
    return (
        <Pressable
            style={[
                stylesSet.materialButton,
                // disabled && stylesSet.disabled,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <View style={stylesSet.buttonContentWrapper}>
                <Text style={[stylesSet.buttonContents, disabled && stylesSet.disabledContents]}>
                    {title}
                </Text>
            </View>
            {icon && (
                <Image
                    source={icon}
                    style={[stylesSet.buttonIcon, disabled && stylesSet.disabledIcon]}
                />
            )}
        </Pressable>
    );
}