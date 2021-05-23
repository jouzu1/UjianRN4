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
            default:'data:image/png;base64,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'
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
                        <Image source={{ uri: this.state.foto ? this.state.foto : this.state.default }} style={styles.image} />
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
