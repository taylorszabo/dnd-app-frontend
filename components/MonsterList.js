import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

const MonsterList = () => {
    const [monsters, setMonsters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleSearch = (text) => {
        if (text) {
            setSearchQuery(text);
        }
    };

    const filteredMonsters = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCrStyle = (cr) => {
        if (cr >= 1 && cr <= 9) {
            return styles.crGreen;
        } else if (cr >= 10 && cr <= 19) {
            return styles.crYellow;
        } else if (cr >= 20 && cr <= 30) {
            return styles.crRed;
        }
        return styles.crDefault;
    };


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error.message}</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#ccc"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Monster</Text>
                <Text style={styles.headerText}>CR</Text>
            </View>
        <FlatList
            data={filteredMonsters}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                    <View style={[styles.item, index % 2 === 0 ? styles.darkItem : styles.lightItem]}>
                        <View style={styles.row}>
                            <View style={styles.titleColumn}>
                                <Text style={styles.title}>{item.name}</Text>
                                {expandedId === item.id && (
                                    <View>
                                        <Text style={styles.detailText}>Type: {item.type}</Text>
                                        <Text style={styles.detailText}>Source: {item.source_book}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.subtitleColumn}>
                                <Text style={[styles.subtitle, getCrStyle(item.cr)]}>{item.cr}</Text>
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
    searchInput: {
        height: 45,
        borderRadius: 20,
        paddingHorizontal: 10,
        margin: 5,
        color: '#fff',
        backgroundColor: '#4C4C4C',
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
    titleColumn: {
        flex: 1,
    },
    subtitleColumn: {
        flex: 1,
        paddingLeft: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        color: '#27E607',
        textAlign: "center",
    },
    detailText: {
        color: '#fff',
        marginTop: 5,
    },
    crGreen: {
        color: 'lime',
    },
    crYellow: {
        color: 'yellow',
    },
    crRed: {
        color: 'red',
    },
    crDefault: {
        color: '#fff',
    },
    errorText: {
        color: 'red',
    },
});

export default MonsterList;

