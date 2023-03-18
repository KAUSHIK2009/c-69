import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class TransactionScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            domState: 'normal',
            hasCameraPermissions: null,
            scanned: false,
            scannedData: ''
        }

    }


    getCameraPermissions = async domState => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({
            hasCameraPermissions: status === "granted",
            domState: domState,
            scanned: false
        })

    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
      scannedData:data,
      domState:'normal',
      scanned:true,

        })
    }  
    


    render() {
        const { domState, hasCameraPermissions, scanned, scannedData } = this.state 
        if(domState==="scanner") {
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
                >

                </BarCodeScanner>
            )
        }
            
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {hasCameraPermissions ? scannedData : "request for camera permission"}
                </Text>
                <TouchableOpacity style={styles.button}
                    onPress={() => this.getCameraPermissions("scanner")
                    }
                >
                    <Text style={styles.text}>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
    },
    button: {
        width: '43%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f48d20',
        borderRadius: 15,
    }
});