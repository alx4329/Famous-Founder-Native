import React from 'react';
import { StyleSheet, Text, View,Modal, Pressable, Image } from 'react-native';
import { responsiveHeight, responsiveWidth,} from "react-native-responsive-dimensions";
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from "expo-image-manipulator";
import camera from '../assets/icons/photo_camera.png';
import gallery from '../assets/icons/gallery.png';
import { useDispatch, useSelector } from 'react-redux'
import { setFamousImage } from '../redux/reducer.js';

const ChoosePicture = ({show}) => {
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
        quality: 1,
        base64: true,
    }
    const _compressImage = async (image, base64) => {
        const desiredWidth = 500;
        const desiredHeight = 500;
        // let expectedImageSize = { width: 500, height: 500 };
        let expectedImageSize = { width: image.width, height: image.height };
    
        if (image.width > desiredWidth || image.height > desiredHeight) {
          //try this one with an image taken from camera
            const widthRatio = image.width / desiredWidth;
            const heightRatio = image.height / desiredHeight;
            const ratioToUse = Math.max(widthRatio, heightRatio)
            expectedImageSize = {
                width: image.width / ratioToUse,
                height: image.height / ratioToUse,
            };
        }
        const manipResult = await ImageManipulator.manipulateAsync(
            image.localUri || image.uri,
            [{ resize: expectedImageSize }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64 }
          );
          return manipResult;
        };
    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({cameraOptions})
        console.log("GALLERY URI", result.uri, result.base64)
        if (!result.cancelled) {
            const compressedImage = await _compressImage(result, true);
            const filename = compressedImage.uri.split("ImageManipulator/")[1];
            let selectedFile;
            if (compressedImage.base64) {
                const base64 = compressedImage.base64;
                selectedFile = {
                uri: compressedImage.uri,
                name: filename,
                type: "image/JPEG",
                base64,
                };
                dispatch(setFamousImage(selectedFile))

            } else {
                const selectedFile = {
                uri: compressedImage.uri,
                name: filename,
                type: "image/JPEG",
                };
                dispatch(setFamousImage(selectedFile))
            }
                
            
            }
    }

    const launchCamera = async () => {
        const result= await ImagePicker.launchCameraAsync(cameraOptions)
         console.log("camera result",result);
            if (!result.cancelled) dispatch(setFamousImage(result))

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
        <View>
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setShowModal(false)
            }}
        >
            <View style={styles.modalPosition}>
                <View style={styles.modalView}>
                    <View style={styles.topBar} />
                    <Text style={styles.modalTitle}>Selecciona una foto</Text>
                        {
                            image?.base64 &&
                            <Image 
                            onLoadStart={()=>{console.log('cargando')}}
                            source={!(image.base64).startsWith('data:image/jpeg;base64,')  ?  {uri:'data:image/jpeg;base64,' + image.base64 } : {uri:image.base64}} 
                            resizeMode="contain"
                            style={styles.modalImage}
                            />
                        }
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
        </View>
    )




}

const styles = StyleSheet.create({
    modalPosition: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
        backgroundColor: "rgba(0,0,0,0.5)",
        width: '100%',
      },
        modalView: {
            width: '100%',
            height: 'auto',
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
        modalImage:{
            width:responsiveWidth(46), 
            height:responsiveWidth(46),
            borderRadius:responsiveHeight(3)
            
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

export default ChoosePicture;