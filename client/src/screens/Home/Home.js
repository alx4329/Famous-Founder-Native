import React from 'react';
import { StyleSheet, Text, View, Pressable,Image } from 'react-native';
import { responsiveHeight, responsiveWidth,} from "react-native-responsive-dimensions";
import DragZone from '../../components/DragZone.js';
import ChoosePicture from '../../components/ChoosePicture.js';
import handEmoji from '../../assets/icons/hi.png';
import { useDispatch } from 'react-redux';

const Home = ({navigation})=>{
    const [showModal, setShowModal] = React.useState(false);
   const goToFamous = ()=>{
       navigation.navigate('Famous');
   }

    return(
        <View style={styles.container} >
            <View style={styles.header} >
                <View style={styles.saludo} >
                    <Text style={styles.heyText} >Hey, Dev</Text>
                    <Image
                        source={handEmoji}
                    />
                </View>
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
                {showModal && <ChoosePicture 
                                    show={showModal} 
                                    setShow={setShowModal}
                                    goToFamous={()=>goToFamous()}
                                />
                }
            
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
        paddingHorizontal:responsiveWidth(3),
        paddingVertical:responsiveHeight(6),
    },
    header:{

    },
    saludo:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
    
})

export default Home;