import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    } from "react-native-responsive-dimensions";
import DragZone from '../../components/DragZone.js';


const Home = ()=>{
    return(
        <View style={styles.container} >
            <View style={styles.header} >
                <Text style={styles.heyText} >Hey, Dev</Text>
                <Text style={styles.headline} >Keep up the good work!</Text>
            </View>
            <View style={styles.body} >
                <Text style={styles.title}>¿Quién es el famoso?</Text>
            </View>
            <View style={styles.dragzone} >
            <DragZone/>

            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E5E5E5',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start',
        height:'100%',
        fontFamily:'roboto',
        fontStyle:'normal',
        fontWeight:"700",
        paddingHorizontal:responsiveWidth(3),
        paddingVertical:responsiveHeight(6),
        // justifyContent: 'left',
    },
    header:{
        // top: responsiveHeight(5),
    },
    dragzone:{
        height:responsiveHeight(20),
    },
    heyText:{
        fontFamily:'roboto-bold',
        fontSize:responsiveHeight(3.3),
        color:'#0F172A',
        marginBottom:responsiveHeight(0.2),
    },
    headline:{
        fontSize:responsiveHeight(2.2),
        color:'#475569',
        marginTop:responsiveHeight(0.2),
    },
    body:{
        marginTop:responsiveHeight(2.2),
    },
    title:{
        fontFamily:'roboto-bold',
        alignSelf:'stretch',
        fontSize:responsiveHeight(2.6),
        color:'#0F172A',

    }
})

export default Home;