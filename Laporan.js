import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView, TouchableOpacity, Dimensions, Switch } from 'react-native'
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export class Laporan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            kejadian: 'pemerkosaan',
            alamat: '',
            keterangan: '',
            gambar: '',
            longitude: 0.0,
            latitude: 0.0,
            waktu: this.waktu,
            hasPermission: null,
            cameraType: Camera.Constants.Type.back,
            foto: '',
            // hasPermission: null,
            // cameraType: Camera.Constants.Type.back,
            // isPreview: false,
            // isCameraReady: false
        };
        this.cameraRef = React.createRef();
    }



    jam = new Date().getHours();
    menit = new Date().getMinutes();

    waktu = `${this.jam}:${this.menit}`

    componentDidMount() {
        this.getLocation();
        console.log('waktu', this.waktu)
        console.log('lat', this.state.lat);
        console.log('lon', this.state.lon);
        this.kamera();
        // console.log("Ini Did Mount" , this.state.kejadian)
    }

    componentDidUpdate() {
        // this.handleInputData();

        // this.getLocation();
        // console.log('Ini Did Update' , this.state.kejadian)
    }


    handleInputData() {
        axios.post("http://cd3dd7512447.ngrok.io/laporan/add", this.state)
            .then((response) => {
                alert(JSON.stringify(response.data));
                // this.props.navigation.navigate("MainMenu")
            }).catch((err) => {
                console.log(err)
            })
    }

    getLocation = async () => {
        console.log("Test");
        let { status } = await Location.getForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("Lokasinya adalah :" + JSON.stringify(location));

        this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude })
    };

    kamera = async () => {
        if (Platform.OS === 'ios') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }
    handleCameraType = () => {
        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }



    takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log('ini foto', photo)
            this.setState({ foto: photo.uri })

        }
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.text}> Laporan </Text>
                <Text>{this.state.lat} </Text>
                <Text>{this.state.lon} </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput placeholder="Name" style={styles.input} onChangeText={(value) => { this.setState({ name: value }) }}></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {/* <TextInput placeholder="Kejadian" style={styles.input} onChangeText={(value) => { this.setState({ email: value }) }}></TextInput> */}
                    <Picker
                        style={styles.input1}
                        selectedValue={this.state.kejadian}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ kejadian: itemValue })
                        }>
                        <Picker.Item label="Pemerkosaan" value="pemerkosaan" />
                        <Picker.Item label="Perampokan" value="perampokan" />
                        <Picker.Item label="Bencana" value="bencana" />
                        <Picker.Item label="Pembunuhan" value="pembunuhan" />
                    </Picker>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput placeholder="Alamat" style={styles.input} onChangeText={(value) => { this.setState({ alamat: value }) }}></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput placeholder="Keterangan" style={styles.input1} multiline={true} numberOfLines={3} require={true} onChangeText={(value) => { this.setState({ keterangan: value }) }}></TextInput>
                </View>
                <View style={{ flex: 1, alignSelf: 'flex-start', flexDirection: "row" }}>
                    <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref }}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={() => this.takePicture()}
                            >
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={() => this.handleCameraType()}
                            >
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <View style={{ flex: 1, alignSelf: 'flex-end' }}>
                        <Image source={{ uri: this.state.foto }} style={styles.image} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Button title='Submit' onPress={() => { this.handleInputData() }}></Button>
                    <Button title='Menu' onPress={() => { this.props.navigation.navigate('MainMenu') }}></Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
        flex: 1,
        marginTop:10,
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
        marginTop: 50
        // flexWrap: 'wrap'
    },
    input1: {
        // borderWidth: 100,
        // width: 500,
        // flex: 1,
        height: 5,
        marginTop: 50
        // flexWrap: 'wrap'
    },
    input1: {
        borderWidth: 2,
        width: 100,
        flex: 1,
        marginTop: 50
        // flexWrap: 'wrap'
    },
    image: {
        flex:1,
        height:100
    }
});

export default Laporan
