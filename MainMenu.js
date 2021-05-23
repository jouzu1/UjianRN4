import React, { Component } from 'react'
import { Text, SafeAreaView, View, FlatList, StyleSheet, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export class MainMenu extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}> Main Menu </Text>
                <View style={styles.view}>
                    <TouchableOpacity style={styles.item} onPress={()=>{this.props.navigation.navigate('Laporan')}}><Text style={styles.title1}>Laporan</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={()=>{this.props.navigation.navigate('History')}}><Text style={styles.title1}>History Laporan</Text></TouchableOpacity>
                </View>
                <View style={styles.view}>
                    <TouchableOpacity style={styles.item}><Text style={styles.title1} onPress={()=>{this.props.navigation.navigate('Map')}}>Map Kejadian</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.item}><Text style={styles.title1} onPress={()=>{this.props.navigation.replace('Home')}}>Sign Out</Text></TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        flex: 1,

        // marginVertical: 8,
        marginHorizontal: 16,
        
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 70,
    },
    title1: {
        fontSize: 15,
        textAlign: 'center',
        // marginTop: 70,
    },
    view: {
        marginTop:70,
        height: 60,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MainMenu
