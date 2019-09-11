import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderWidth: 1,
        backgroundColor: '#EEE',
        elevation: 2,
        borderRadius: 15,
    },
    title: {
        fontSize: 25,
        color: '#000'
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 15,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});

const CustomRow = ({ title, description }) => (
    <View style={styles.container}>
        {/* <Image source={{ uri: image_url }} style={styles.photo} /> */}
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {title}
            </Text>
            <Text style={styles.description}>
                {description}
            </Text>
        </View>
    </View>
);

export default CustomRow;