// import React, { Component } from 'react';
// import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView } from 'react-native';
// // import { BukuAction, UserAction } from '../redux/Action'
// import {UserAction} from './Action';
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
// import axios from 'axios';

// class Login extends Component {
//     // static propTypes = {
//     //     prop: PropTypes
//     // }

//     componentDidMount() {
//         this.handleInputData();
//         console.log('data dapet get' , this.props.dataRegis);
//     }

    // handleInputData(){
    //     axios.post("http://7770cc0911b9.ngrok.io/user")
    //     .then((response)=>{
    //         this.props.UserAction("id",response.data.id)
    //         this.props.UserAction("name",response.data.name)
    //         this.props.UserAction("email",response.data.email)
    //         this.props.UserAction("phone",response.data.phone)
    //         this.props.UserAction("address",response.data.address)
    //         this.props.UserAction("isLogin",true)
    //         // console.log('ini getData' , response) 
    //         // this.props.UserAction("id",response.data.id)
    //         // alert(JSON.stringify(response.data));
    //         // this.props.navigation.navigate("Home")
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }


//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <Text style={styles.text}> Login </Text>
//                 {/* <View style={{flexDirection:'row'}}>
//                     <TextInput placeholder="Name" style={styles.input} onChangeText={(value)=>{this.props.UserAction("name",value)}}></TextInput>
//                 </View> */}
//                 <View style={{flexDirection:'row'}}>
//                     <TextInput placeholder="Email" style={styles.input} onChangeText={(value)=>{this.props.UserAction("email",value)}}></TextInput>
//                 </View>
//                 <View style={{flexDirection:'row'}}>
//                     <TextInput placeholder="Phone" style={styles.input} onChangeText={(value)=>{this.props.UserAction("phone",value)}}></TextInput>
//                 </View>
//                 {/* <View style={{flexDirection:'row'}}>
//                     <TextInput placeholder="Address" style={styles.input} onChangeText={(value)=>{this.props.UserAction("address",value)}}></TextInput>
//                 </View> */}
//                 <View style={{flexDirection:'row'}}>
//                     <Button title='Cancel' onPress={()=>{this.props.navigation.replace('Home')}}></Button>
//                     <Button title='Submit' onPress={()=>{this.handleInputData()}}></Button>
//                 </View>
//             </SafeAreaView>
//         )
//     }
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // flexDirection:"row",
//         // justifyContent: 'center',
//         alignItems: 'center',
//         // justifyContent:'space-between'
//     },
//     button: {
//         padding: 10,
//         // width: 200,
//         // flexDirection:"row",
//     },
//     text: {
//         textAlign: 'center',
//         // borderWidth: 5,
//         fontSize: 40,
//         fontWeight: "bold",
//         // justifyContent:'space-between'
//     },
//     image: {
//         width: 200,
//         height: 200
//     },
//     input: {
//         borderWidth: 2,
//         // width: 500,
//         flex: 1, 
//         marginTop:50
//         // flexWrap: 'wrap'
//     }
// });

// const mapStateToProps = (state) => ({
//     dataRegis : state.UserReducer
// })

// const mapDispatchToProps = {
//     UserAction
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)

import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView } from 'react-native';
// import { BukuAction, UserAction } from '../redux/Action'
import {UserAction, getDataUser} from './Action';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import axios from 'axios';


class Login extends Component {
    

    constructor(props){
        super(props)
        this.state = {
            email:'',
            phone:'',
            data:[]
        }
    }

    componentDidMount() {
        this.handleGetData();
        // console.log('ini data login' , this.props.dataLogin)
        // console.log('data state',this.state.data)
    }


    componentDidUpdate() {
        this.handleGetData();
        // console.log('ini data login' , this.props.dataLogin)
        console.log('data state',this.state.data)
    }

    handleGetData(){
        axios.get(`http://cd3dd7512447.ngrok.io/user/searchby/${this.state.email}/${this.state.phone}`)
        .then((response)=>{
            console.log('ini getData' , response.data) 
            this.setState({data:response.data[0]})
        }).catch((err)=>{
            console.log(err)
        })
    }

    nextScreen(){
        if(!this.state.data){
            alert('Email Dan Nomor Handphone Salah')
            
        }else if(this.state.data.email == this.state.email && this.state.data.phone == this.state.phone){
            this.props.navigation.navigate('MainMenu')
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}> Login </Text>
                {/* <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Name" style={styles.input} onChangeText={(value)=>{this.props.UserAction("name",value)}}></TextInput>
                </View> */}
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Email" style={styles.input} onChangeText={(value)=>{this.setState({email:value})}}></TextInput>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Phone" style={styles.input} onChangeText={(value)=>{this.setState({phone:value})}}></TextInput>
                </View>
                {/* <View style={{flexDirection:'row'}}>
                    <TextInput placeholder="Address" style={styles.input} onChangeText={(value)=>{this.props.UserAction("address",value)}}></TextInput>
                </View> */}
                <View style={{flexDirection:'row'}}>
                    <Button title='Cancel' onPress={()=>{this.props.navigation.replace('Home')}}></Button>
                    <Button title='Submit' onPress={()=>{this.nextScreen()}}></Button>
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
    dataLogin : state.UserReducer.name,
    data:state.getDataReducer
})

const mapDispatchToProps = {
    UserAction, getDataUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
