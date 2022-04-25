import React from 'react';
import { StyleSheet, Text, View,Platform,Image} from 'react-native';
import { responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import Dragpic from '../assets/icons/DragPic.svg'
import pngDrag from '../assets/icons/icons8.png'

const DragZone = ()=>{
    
    return(
        <View style={styles.container} >
            {Platform.OS === 'web' ? <Image resizeMode='contain' style={styles.img} source={pngDrag} /> : <Dragpic /> }
            <Text style={styles.text} >Presiona para elegir una foto</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderStyle: 'dashed',
        borderWidth: responsiveHeight(0.4),
        borderColor: '#3843D0',
        alignItems: 'center',
        justifyContent: 'center',
    },    
    text:{
        fontFamily:'roboto-bold',
        fontSize:responsiveHeight(1.9),
        
    },
    img:{
        width:responsiveWidth(10),
        height:responsiveWidth(10),
    }
})

export default DragZone;