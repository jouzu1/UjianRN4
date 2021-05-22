import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView } from 'react-native';
import axios from 'axios';

export class History extends Component {
    constructor(props){
        super(props)
        this.state = {
            foto:""
        }
    }
    componentDidMount(){
        this.handleGetData();
        
    }

    componentDidUpdate(){
        console.log('ini foto',this.state.foto)
    }
    handleGetData(){
        axios.get(`http://b6cf50737591.ngrok.io/laporan`)
        .then((response)=>{
            // console.log('ini getData' , response.data[0]) 
            this.setState({foto:response.data[0].foto})
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <View style={{flex:1, alignItems:'center'}}>
                <Image source={{uri : this.state.foto}} style={{width:100, height:100}}/>
            </View>
        )
    }
}

export default History
