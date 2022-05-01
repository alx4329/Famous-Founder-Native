import React from 'react';
import { StyleSheet, Text, View, Image,ImageBackground, ScrollView, Pressable  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveHeight, responsiveWidth,} from "react-native-responsive-dimensions";
import { LinearGradient } from 'expo-linear-gradient';
import Pelicula from '../../components/Pelicula'
import star from '../../assets/icons/STAR.png';
import arrow from '../../assets/icons/arrow-left.png'
import { cleanState } from '../../redux/reducer';
import {StackActions} from "@react-navigation/native";

const FamousScreen = ({navigation}) => {
    const details = useSelector(state => state.famousDetails);
    const dispatch= useDispatch();
    const urlBase = 'http://image.tmdb.org/t/p/w400'
    
    const goHome = async () => {
        console.log("dispatching")
        await navigation.dispatch(
            StackActions.pop()
          );
        // dispatch(cleanState())
        dispatch(cleanState(null))
      };
    if(Object.keys(details).length===0){
        return <View></View>
    }
    return(
        <View style={styles.container}>
            <ImageBackground  
                    onLoadStart={()=>{console.log('cargando')}}
                    source={ {uri:urlBase + details.results[0].profile_path}} 
                    resizeMode="cover"
                    style={styles.picture}
                >
            
                <LinearGradient
                    colors={['transparent', '#000000']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 1}}
                    style={styles.gradient}
                    >
                    <Pressable
                        onPress={goHome}
                        >
                        <View style={styles.backButton} >
                            <Image
                                source={arrow}
                                resizeMode="contain"
                            />
                        </View>
                    </Pressable>
                    <View style={styles.info}>
                        <View style={styles.left} >
                            <Text style={styles.name} >{details.results[0].name}</Text>
                            <View style={styles.sexContainer} >
                                <Text style={styles.textStyle} >{details.results[0].gender == 1 ? "Mujer" : "Hombre"  }</Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.popTitle} >Popularidad:</Text>
                            <View style={styles.calificacionContainer} >
                                <Text style={styles.calificacion}>{details.results[0].popularity.toFixed(2)}</Text>
                                <Image
                                    source={star}
                                />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.peliculas} >
                <Text style={styles.title} >Peliculas:</Text>
                <ScrollView>
                    {
                        details.results[0].known_for.map((item,index)=>{
                            return <Pelicula
                                key={index}
                                title={item.title}
                                url={item.poster_path}
                                calificacion={item.vote_average}
                                overview={item.overview}
                            />
                        })
                    }
                </ScrollView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#E5E5E5',
        height:'100%',
        fontFamily:'roboto',
        fontStyle:'normal',
        fontWeight:"700",
        elevation:1
        
    },
    picture:{
        height:responsiveHeight(47),
        width:responsiveWidth(100)
    },
    info:{
        position: 'absolute',
        bottom: responsiveHeight(4.2),
        flexDirection: 'row',
        width:responsiveWidth(100),
        paddingHorizontal: responsiveWidth(3),
        justifyContent: 'space-between',
        alignItems:'flex-end'
    },
    name:{
        fontSize:responsiveHeight(4),
        fontFamily:'roboto-bold',
        color: '#F8FAFC'
    },
    title:{
        alignSelf: "flex-start",
        fontSize:responsiveHeight(4),
        fontFamily:'roboto-bold',
        color: '#000000'
    },
    textStyle:{
        fontSize:responsiveHeight(2.2),
        fontFamily:'roboto-bold',
        color: '#0F172A',
    },
    sexContainer:{
        alignItems: 'center',
        backgroundColor:'#FACC15',
        paddingVertical:responsiveHeight(0.5),
        paddingHorizontal:responsiveWidth(2),
        borderRadius:responsiveHeight(1.8),
        width: responsiveWidth(18),
    },
    gradient:{
        width:responsiveWidth(100),
        height:responsiveHeight(47),
    },
    peliculas:{
        marginTop:responsiveHeight(2),
        paddingHorizontal:responsiveWidth(2),
        flex:1,
        // flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    popTitle:{
        fontSize:responsiveHeight(2.2),
        fontFamily:'roboto-bold',
        color: '#F8FAFC', 
    },
    calificacionContainer:{
        width:responsiveWidth(20),
        flexDirection:'row',
        justifyContent: 'flex-end',
        marginTop:responsiveHeight(1),
    },
    calificacion:{
        fontSize:responsiveHeight(2.2),
        fontFamily:'roboto-bold',
        color: '#F8FAFC', 
    },
    right:{
        flexDirection:'column',
        alignItems: 'flex-end',
    },
    backButton:{
        flex: 1,
        position: 'absolute',
        top: responsiveHeight(4),
        left: responsiveWidth(5),
        width: responsiveWidth(10),
        height: responsiveHeight(10),
        elevation:10
        
    }
})

export default FamousScreen;