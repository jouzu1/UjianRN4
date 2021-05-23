import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button, TextInput, ScrollView, Dimensions } from 'react-native';
import axios from 'axios';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import * as Permissions from 'expo-permissions';


export class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            latitude: 0,
            longitude: 0
        }
    }

    componentDidMount() {
        this.getData();
        this.getLocation();
    }

    componentDidUpdate() {
        console.log(`data markers` , this.state.markers)
        // console.log(`ini lat`, this.state.latitude);
        // console.log('ini long', this.state.longitude);
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

    getData = () => {
        axios.get(`http://cd3dd7512447.ngrok.io/laporan`)
            .then((res) => {
                // console.log('ini data', res.data)
                this.setState({ markers: res.data })
            })
    }

    getInitialState() {
        return {
            region: {
                latitude: 3.575277,
                longitude: 98.683947,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }}
                        title="Lokasi Anda"
                        description="Posisi Lokasi Anda"
                        draggable
                        pinColor="green"
                    >
                    </Marker>
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            // coordinate={marker.latitude}
                            coordinate={{ latitude : marker.latitude , longitude : marker.longitude }}
                            // title={marker.title}
                            // description={marker.description}
                        />
                    ))}
                </MapView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 1,
        // flexDirection:"row",
        // justifyContent: 'center',
        // alignItems: 'center',
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
        marginTop: 50
        // flexWrap: 'wrap'
    }
});

export default Map
