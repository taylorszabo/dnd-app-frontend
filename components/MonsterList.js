import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

const MonsterList = () => {
    const [monsters, setMonsters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/monsters')
            .then(response => {
                setMonsters(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    return (
        <FlatList
            data={monsters}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text>CR {item.cr}</Text>
                        {expandedId === item.id && (
                            <View style={styles.details}>
                                <Text>Type {item.type}</Text>
                                <Text>Source {item.source_book}</Text>
                                <Text>Size {item.size}</Text>
                                <Text>Alignment {item.alignment}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    item: {
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default MonsterList;
