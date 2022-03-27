import React, {Component} from "react";
import {View,StyleSheet,Text} from "react-native";
import {TouchableOpacity,Image} from "react-native";
import DocumentPicker from 'react-native-document-picker';
import {Alert} from "react-native";
import {Button} from "react-native"
import fi from '../assets/icons/fileicon.jpg'
import axios from "axios";

export class Result extends Component{
    constructor() {
        super();
        this.state = {
            file: File = null
        }
    }
    handleSubmit = ()=>{
        console.log(this.state.file)
        const formData = new FormData()
        formData.append('echovideo',this.state.file)
        const uri = "https://cardiacfunction.herokuapp.com/getresult"
        axios.post(uri,formData).then((response)=>{
            console.log(response.data)
        }).catch((err)=>{
            throw err
        })
    }

    handleFiles = async ()=>{
        try{
            const file_options = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.video]
            })
            console.log(file_options.name)
            console.log(file_options.uri)
            console.log(file_options.type)
            console.log(file_options.size)
            this.setState({file: file_options})
        }catch (err){
            if(DocumentPicker.isCancel(err)){
                Alert("File Upload Canceled")
            }
            else{
                throw err.stackTrace()
            }
        }
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 20,fontWeight: 'bold'}}>Cardiac Function Assessment</Text>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <TouchableOpacity onPress={this.handleFiles}>
                    <Text>Upload Video <Image style={{width:50,height:50}} source={fi}/> </Text>
                </TouchableOpacity>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Button title="Submit" color={'#4287f5'} onPress={this.handleSubmit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
    }
})