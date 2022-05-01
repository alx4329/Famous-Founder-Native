import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { responsiveHeight, responsiveWidth,} from "react-native-responsive-dimensions";
import star from '../assets/icons/STAR.png';
const Pelicula = ({title, url, calificacion ,overview})=>{
    const urlBase = 'http://image.tmdb.org/t/p/w185'
    const imageUrl = urlBase + url
    console.log("URL", imageUrl)
    return(
        <View style={styles.container} >
            <View style={styles.leftSide}>
                <Text style={styles.title} >{title}</Text>
                <Text style={styles.overview} numberOfLines={5} >{overview}</Text>
            </View>
            <View style={styles.rightSide}>
                <Image 
                    source={{uri:imageUrl}}
                    style={styles.poster}
                    resizeMode="cover"

                    />
            <View style={styles.calificacionContainer} >
                <Text style={styles.calificacion}>{calificacion}</Text>
                <Image
                    source={star}
                />
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        width:responsiveWidth(96),
        height:responsiveHeight(24),
        marginVertical:responsiveHeight(1),
        padding:responsiveWidth(2),
        borderRadius:responsiveHeight(2),
        
        // alignItems: 'center',
        backgroundColor: '#F1F5F9'
        },
    leftSide:{
        width:responsiveWidth(70),
    },
    rightSide:{
        position: 'absolute',
        margin:responsiveWidth(1),
        padding:responsiveWidth(1),
        right:0,
        width:responsiveWidth(20),
        alignItems: 'flex-end',
        flexDirection:'column'
    },
    title:{
        fontSize:responsiveHeight(3.5),
        fontFamily:'roboto-bold',
        color: '#000000',
        marginBottom:responsiveHeight(1),
    },
    overview:{
        fontSize:responsiveHeight(2.2),
        fontFamily:'roboto-bold',
        color: '#000000', 
        lineHeight: responsiveHeight(2.8),
    },
    poster:{
        width:responsiveWidth(20),
        height:responsiveHeight(18),
        borderRadius:responsiveHeight(2),
    },
    calificacionContainer:{
        width:responsiveWidth(20),
        flexDirection:'row',
        justifyContent: 'center',
        marginTop:responsiveHeight(1),
    },
    calificacion:{
        fontSize:responsiveHeight(2.2),
        fontFamily:'roboto-bold',
        color: '#000000', 

    }

})

export default Pelicula;