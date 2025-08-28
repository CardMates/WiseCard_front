import Colors from "@/src/styles/colors";
import { StyleSheet, Text, View } from "react-native";

export default function StoreBlock({
    store,
    onPress,
    //stylesSet
}: {
    store: any;
    onPress: () => void;
    //stylesSet: any;
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.storeInfo}>{store.info}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row',
        //alignItems: 'center',
        backgroundColor: Colors.BACKGROUND_LIGHT,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        elevation: 2,
    },
    storeName: {
        color: Colors.TEXT_PRIMARY,
        fontSize: 20,
        fontWeight: 700,
    },
    storeInfo: {
        color: Colors.PRIMARY_BLUE,
        fontWeight: 500,
    }
})