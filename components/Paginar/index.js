import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

export default class index extends React.Component{

    press = (opcion) => {
        this.props.paginar(opcion)
    }

    render(){
        return(
            <View style={{display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                <TouchableWithoutFeedback  onPress={() => this.press(-1)}>
                    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 4}}><Text style={styles.cuadrado}>{"<"}</Text></View>
                </TouchableWithoutFeedback>
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 4}}><Text style={styles.cuadrado}>{this.props.pagina}</Text></View>
                <TouchableWithoutFeedback  onPress={() => this.press(1)}>
                    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 4}}><Text style={styles.cuadrado}>{">"}</Text></View>
                </TouchableWithoutFeedback > 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cuadrado : {
        width: 40,
        height: 40,
        fontSize: 16,
        backgroundColor: '#dc3545',
        color: 'white',
        display: "flex",
        borderRadius: 4,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    }
})