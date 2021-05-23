import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

export class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.handleGetData();

    }

    componentDidUpdate() {
        // console.log('ini data', this.state.data)
    }
    handleGetData() {
        axios.get(`http://cd3dd7512447.ngrok.io/laporan`)
            .then((response) => {
                // console.log('ini getData' , response.data) 
                this.setState({ data: response.data })
            }).catch((err) => {
                console.log(err)
            })
    }


    renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ flex: 1, justifyContent: "space-between"}}>
                {item.kejadian === 'pemerkosaan' || item.kejadian === 'perampokan' || item.kejadian === 'pembunuhan' ? <Text>Status : Kriminal</Text> : <Text>Status : Bencana Alam</Text>}
                <Text>Jam : {item.waktu}</Text>
                <Text>Alamat : {item.alamat}</Text>
            </View>
            <View>
                <Image source={{ uri: item.foto }} style={{ width: 50, height: 50 }} />
            </View>
        </View>
    );

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop:40
    },
    item: {
        flex: 1, alignSelf: 'flex-start', flexDirection: "row",
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        // flexDirection:'row'
    },
    title: {
        fontSize: 32,
    },
});

export default History
