import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { responsiveHeight, responsiveWidth,} from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from 'react-redux'
import { cleanState, getFamousDetails } from '../redux/reducer';
import { useFocusEffect } from '@react-navigation/native';

const ImageToFind = ({ setShow, goToFamous})=>{
    
    const dispatch = useDispatch();
    let {famousDetails, famousImage,error,response} = useSelector(state => state);

    const [title, setTitle] = React.useState('Subiendo...');
    const [actorName, setActorName] = React.useState('Buscando...');
    const [color, setColor] = React.useState('#3843D0');
    React.useEffect(()=>{
        if(!error){
            if(Object.keys(response).length>0){
                if(response.actorName){
                    setActorName(response.actorName)
                    setTitle('Listo');
                    setColor('#4ADE80')
                    dispatch(getFamousDetails(response.actorName));
                } else if(response.error === "No sé quien es, intenta con otra foto"){
                        setTitle("¿Es un famoso?")
                        setActorName("No se encontró");
                        setColor("#FDE047")
                    }else {
                        setActorName("Error de red o de servidor")
                        setTitle("Hubo un error");
                        setColor("#F75555")        
                    }        
                }    
            } else {
                setActorName("Error de red o de servidor")
                setTitle("Hubo un error");
                setColor("#F75555")        

        }     
    },[response])
    useFocusEffect(
        React.useCallback(()=>{
            if(Object.keys(famousDetails).length>0){
                setShow(false);
                goToFamous()
            }
        },[famousDetails])

    )
    styles.status={
    backgroundColor:color,
    padding:responsiveWidth(3),
    height:responsiveHeight(6),
    borderRadius:responsiveHeight(3),
    margin:responsiveWidth(2),
    }

    
    return(
        <>

                <Text style={styles.modalTitle} >{title}</Text>
                <Image 
                    onLoadStart={()=>{console.log('cargando')}}
                    source={ {uri:famousImage.uri}} 
                    resizeMode="contain"
                    style={styles.modalImage}
                /> 
                <View style={styles.status}>
                    <Text style={styles.textStyle} >{actorName}</Text>
                </View>
                
                {
                    Object.keys(response).length>0 && !response.actorName &&
                    <Pressable
                        onPress={()=>{
                            dispatch(cleanState())
                            setShow()
                            }}
                    >
                        <View style={styles.closeButton} >
                            <Text style={styles.close} >Cerrar</Text>
                        </View>
                    </Pressable>
                }
        </>

        
    )

}
const styles = StyleSheet.create({
    modalTitle: {
        fontSize: responsiveHeight(2.2),
        fontFamily: 'roboto-bold',
        color: '#64748B',
        marginBottom: responsiveHeight(1),
    },
    closeButton:{
        width:responsiveWidth(80),
        height:responsiveHeight(6),
        backgroundColor:'#3843D0',
        marginBottom: responsiveHeight(1),
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding:responsiveWidth(2),
        borderRadius:responsiveHeight(2),
    },
    close:{
        
        fontSize: responsiveHeight(2.2),
        fontFamily: 'roboto-bold',
        color: '#FFFFFF',
    },
    textStyle: {
        fontSize: responsiveHeight(2.2),
        fontFamily: 'roboto-bold',
        color: '#FFFFFF',
        color: '#F8FAFC',
    },
    modalImage:{
        width:responsiveWidth(46), 
        height:responsiveWidth(46),
        borderRadius:responsiveWidth(9),
        margin:responsiveWidth(1),
    },
})
export default ImageToFind;