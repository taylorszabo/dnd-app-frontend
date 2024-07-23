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
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Monster</Text>
                <Text style={styles.headerText}>CR</Text>
            </View>
        <FlatList
            data={monsters}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <View style={[styles.item, index % 2 === 0 ? styles.darkItem : styles.lightItem]}>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Text style={styles.title}>{item.name}</Text>
                                {expandedId === item.id && (
                                    <View>
                                        <Text style={styles.detailText}>Type: {item.type}</Text>
                                        <Text style={styles.detailText}>Source: {item.source_book}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.column}>
                                <Text style={styles.subtitle}>CR {item.cr}</Text>
                                {expandedId === item.id && (
                                    <View>
                                        <Text style={styles.detailText}>Size: {item.size}</Text>
                                        <Text style={styles.detailText}>Alignment: {item.alignment}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.container}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E1E1E',
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 5,
    },
    headerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
    item: {
        padding: 8,
    },
    darkItem: {
        backgroundColor: '#2C2C2C',
    },
    lightItem: {
        backgroundColor: '#4C4C4C',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
    },
    detailText: {
        color: '#fff',
        marginTop: 5,
    },
    errorText: {
        color: 'red',
    },
});

export default MonsterList;

