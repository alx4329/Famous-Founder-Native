import React from 'react';
import { StyleSheet, Text, View,Modal, Pressable, Image } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    } from "react-native-responsive-dimensions";
import DragZone from '../../components/DragZone.js';
import * as ImagePicker from 'expo-image-picker'
import camera from '../../assets/icons/photo_camera.png';
import gallery from '../../assets/icons/gallery.png';
import { useDispatch, useSelector } from 'react-redux'
import { setFamousImage } from '../../redux/reducer.js';

const Home = ()=>{
    const [showModal, setShowModal] = React.useState(false);
    let dispatch = useDispatch();
    let image = useSelector(state=>state.famousImage);
    React.useEffect(()=>{
        console.log("IMAGE COMPONENT",image)
    },[image])
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const cameraOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    }
    
    
    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({cameraOptions})
        console.log(result)
        if (!result.cancelled) dispatch(setFamousImage(result.uri))
    }

    const launchCamera = async () => {
        const result= await ImagePicker.launchCameraAsync(cameraOptions)
         console.log(result);
            if (!result.cancelled) dispatch(setFamousImage(result.uri))
    }
    const openCamera =  async() =>{
        if(status.granted){
            launchCamera();
        } else{
            await ImagePicker.requestCameraPermissionsAsync()
            launchCamera()
        }
        
    }

    return(
        <View style={styles.container} >
            <View style={styles.header} >
                <Text style={styles.heyText} >Hey, Dev</Text>
                <Text style={styles.headline} >Keep up the good work!</Text>
            </View>
            <View style={styles.body} >
                <Text style={styles.title}>¿Quién es el famoso?</Text>
            </View>
                <Pressable 
                    onPress={()=>setShowModal(true)}
                >
                    <View style={styles.dragzone} >
                        <DragZone/>
                    </View>
                </Pressable>
            {
                showModal &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showModal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setShowModal(false)
                    }}
                >
                    <View style={styles.modalPosition}>
                        <View style={styles.modalView}>
                            <View style={styles.topBar} />
                            <Text style={styles.modalTitle}>Selecciona una foto</Text>
                            <Pressable
                                style={[styles.button]}
                                onPress={()=>openGallery()}
                            >
                                <Image style={styles.icon} source={gallery} />
                                <Text style={styles.textStyle}>Galeria de fotos</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button]}
                                onPress={openCamera}
                            >
                                <Image style={styles.icon} source={camera} />
                                <Text style={styles.textStyle}>Cámara</Text>
                            </Pressable>
                            <View style={styles.bottomBar} />

                        </View>
                    </View>
                </Modal>
            }
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

    },
    modalPosition: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
        backgroundColor: "rgba(0,0,0,0.5)",
        width: '100%',
      },
        modalView: {
            width: '100%',
            height: '27%',
            backgroundColor: "#fff",
            borderTopLeftRadius: responsiveWidth(6),
            borderTopRightRadius: responsiveWidth(6),
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            position: 'absolute',
            bottom:0,
            paddingVertical:responsiveHeight(4),
        },
        modalTitle: {
            fontSize: responsiveHeight(2.2),
            fontFamily: 'roboto-bold',
            color: '#64748B',
            marginBottom: responsiveHeight(1),
        },
        textStyle: {
            marginLeft: responsiveWidth(2),
            fontFamily: "roboto-bold",
            color: "#0F172A",
            fontSize: responsiveHeight(2.2),
          },
          icon:{
            width:responsiveWidth(6),
            height:responsiveWidth(6),
        },
        button:{
            paddingHorizontal:responsiveWidth(7),
            paddingVertical:responsiveHeight(1.5),
            alignItems:'center',
            width:responsiveWidth(100),
            flex:1,
            flexDirection:'row',
        },
        topBar:{
            position:'absolute',
            height:responsiveHeight(0.7),
            width:responsiveWidth(13),
            backgroundColor:'#F1F5F9',
            top:responsiveHeight(0.7),
            borderRadius:responsiveHeight(0.5),
        },
        bottomBar:{
            position:'absolute',
            height:responsiveHeight(0.7),
            width:'37%',
            backgroundColor:'#0F172A',
            bottom:responsiveHeight(0.7),
            borderRadius:responsiveHeight(0.5),
        }
})

export default Home;