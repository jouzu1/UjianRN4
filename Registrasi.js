import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView } from 'react-native';
// import { BukuAction, UserAction } from '../redux/Action'
import {UserAction} from './Action';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import axios from 'axios';

class Registrasi extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }

    handleInputData(){
        axios.post("http://7770cc0911b9.ngrok.io/user/add",this.props.dataRegis)
        .then((response)=>{
            alert(JSON.stringify(response.data));
            this.props.navigation.navigate("Home")
        }).catch((err)=>{
            console.log(err)
        })
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}> Registrasi </Text>
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Name" style={styles.input} onChangeText={(value)=>{this.props.UserAction("name",value)}}></TextInput>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Email" style={styles.input} onChangeText={(value)=>{this.props.UserAction("email",value)}}></TextInput>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Phone" style={styles.input} onChangeText={(value)=>{this.props.UserAction("phone",value)}}></TextInput>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Address" style={styles.input} onChangeText={(value)=>{this.props.UserAction("address",value)}}></TextInput>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Button title='Cancel' onPress={()=>{this.props.navigation.navigate('Home')}}></Button>
                    <Button title='Submit' onPress={()=>{this.handleInputData()}}></Button>
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection:"row",
        // justifyContent: 'center',
        alignItems: 'center',
        // justifyContent:'space-between'
    },
    button: {
        padding: 10,
        // width: 200,
        // flexDirection:"row",
    },
    text: {
        textAlign: 'center',
        // borderWidth: 5,
        fontSize: 40,
        fontWeight: "bold",
        // justifyContent:'space-between'
    },
    image: {
        width: 200,
        height: 200
    },
    input: {
        borderWidth: 2,
        // width: 500,
        flex: 1, 
        marginTop:50
        // flexWrap: 'wrap'
    }
});

const mapStateToProps = (state) => ({
    dataRegis : state.UserReducer
})

const mapDispatchToProps = {
    UserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Registrasi)
