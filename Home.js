import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Image, Button } from 'react-native'
import { connect } from 'react-redux'

export class Home extends Component {
    componentDidMount() {
        console.log('ini props', this.props.data)
    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                {
                    (this.props.data.isLogin ?  <View>
                                                    <Image source={require('./Screenshot (91).png')} style={styles.image}></Image>
                                                    <Button title='Logout' style={styles.button}>Login</Button>
                                                    {/* <Button title='Register' style={styles.button}>Login</Button> */}
                                                </View>
                        :
                        <View>
                            <Image source={require('./Screenshot (91).png')} style={styles.image}></Image>
                            <Button title='Login' style={styles.button}>Login</Button>
                            <Button title='Register' style={styles.button}>Login</Button>
                        </View>
                    )
                }
                {/* <Image source={require('./Screenshot (91).png')} style={styles.image}></Image>
                <Button title='Login' style={styles.button}>Login</Button>
                <Button title='Register' style={styles.button}>Login</Button> */}
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        width: 200,
    },
    text: {
        textAlign: 'center',
        borderWidth: 5,
    },
    image: {
        width: 200,
        height: 200
    }
});

const mapStateToProps = (state) => ({
    data: state.UserReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

// import React, { Component } from 'react'
// import { View, Text } from 'react-native'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

// export class Home extends Component {
//     static propTypes = {
//         prop: PropTypes
//     }

//     render() {
//         return (
//             <View>
//                 <Text> prop </Text>
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home)
