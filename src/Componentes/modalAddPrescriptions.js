import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable, TextInput, Image, ToastAndroid } from 'react-native';
import { db, auth } from "../Serviços/firebase";
import { ref, set, remove } from 'firebase/database'

export function ModalAddPrescriptions({ handleClose, navigation }) {
    
    const [prescriptionName, setPrescriptionName] = useState('');
    const [prescriptionDescription, setPrescriptionDescription] = useState('');
    const tarefaRef = ref(db, '/users/'+auth.currentUser.uid+'/prescricoes/' + prescriptionName)
    const [ModalError, setModalError] = useState(false);

    //Notifica ao adicionar item no banco  
    const AddPrescricaoToast = () => {
        ToastAndroid.show('Prescrição adicionada !', ToastAndroid.CENTER);
      };

    function addPrescriptionNames () { 
        if(prescriptionName === '' || prescriptionDescription === '') {
            console.log("Erro ao adicionar prescrição verifique os campos")
            setModalError(true);
            return
        }         
        set(tarefaRef, {
            prescriptionName: prescriptionName,
            prescriptionDescription: prescriptionDescription

        }).then(() => {
            //data saved sucessfully!
            AddPrescricaoToast()
            console.log("Tarefa salva com sucesso do banco de dados")
            setModalError(false)
            handleClose()
        })
            .catch((error) => {
                //write failed
                alert(error);
                setModalError(true)
            });
    } 
    

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.headerTitle}>Adicionando nova Prescrição</Text>
                <View style={styles.containerHeader}>
                    <TextInput style={styles.title}
                        placeholder="Nome da prescrição"
                        value={prescriptionName}
                        multiline={true}
                        numberOfLines={2}
                        textAlignVertical="top"
                        onChangeText={(prescriptionName) => setPrescriptionName(prescriptionName)}   
                    >
                    </TextInput>
                        
            </View>
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    value={prescriptionDescription}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                    onChangeText={(prescriptionDescription) => setPrescriptionDescription(prescriptionDescription)}
                />
                {ModalError && <Text style={styles.errorText}>Erro ao adicionar prescrição verifique os campos acima</Text>}
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={addPrescriptionNames}>
                        <Text style={styles.buttonSaveText}>Salvar</Text>
                    </TouchableOpacity>        
                </View>
            </View>
        </View>
      );
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "rgba(24, 24, 24, 0.6)",
            alignItems: 'center',
            justifyContent: 'center',
        },
        content:{
            backgroundColor: '#FFF',
            width: '90%',
            paddingTop: 24,
            paddingBottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
        },
        containerHeader: {
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        
        input:{
            backgroundColor: '#f0f0f0',
            width: '90%',
            margin: 14,
            padding: 15,
            borderRadius: 12,
            fontSize: 16,
            fontWeight: '400',
            color: '#7C7C7C',
            
        },
        title: {
            backgroundColor: '#f0f0f0',
            width: '70%',
            borderRadius: 12,
            marginBottom: '5%',
            padding: 15,
            fontSize: 16,
            fontWeight: '400',
            color: '#7C7C7C',      
        },
        headerTitle: {
            color: '#7C7C7C',
            fontSize: 26,
            fontWeight: 'bold',
            textAlign: 'center',
            paddingBottom: 20,
            margin: 5,
        },    
        text:{
            color: '#FFF',
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        errorText: {
            color: 'red',
            fontSize: 18,
            fontWeight: '600',
            paddingBottom: 12,
            marginHorizontal: 25,
        },
        buttonArea:{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        button:{
            flex: 1,
            alignItems: 'center',
            marginTop: 14,
           
        },
        buttonText:{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'gray',
        },
        buttonSave:{
            backgroundColor: '#7AA466',
            borderRadius: 12,
            justifyContent: 'center',
            height: 50,
    
        },
        buttonSaveText:{
           color: '#FFF',
           fontWeight: 'bold',
           fontSize: 20,
        }
    })