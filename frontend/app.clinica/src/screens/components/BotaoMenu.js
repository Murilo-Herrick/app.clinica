import {
    TouchableOpacity,//Usado para criar botões que respondem ao toque do usuário
    Text,
    StyleSheet, View, Image, Dimensions
} from 'react-native';
import React from 'react';


//Obtem a largura da tela do dispositivo
const screenWith = Dimensions.get('window').width;
// Define largura ddo botão com base na largura da tela(90%)
const BUTTON_WIDTH_PERCENTAGE = 0.9; // Largura do botão como porcentagem da largura da tela
const BUTTON_WIDTH = screenWith * BUTTON_WIDTH_PERCENTAGE; // Calcula a largura do botão

//Define a altura do botão em 80% da largura do botão
const BUTTON_HEIGHT = BUTTON_WIDTH * 0.8; // Altura do botão como 80% da largura do botão

const BotaoMenu = ({ onPress, title, icon }) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image source={icon} style={styles.icone} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );

}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#303c8aff', // Cor de fundo do botão
        paddingVertical: 15, // Espaçamento vertical dentro do botão
        width: BUTTON_WIDTH, // Largura do botão
        height: BUTTON_HEIGHT, // Altura do botão
        borderRadius: 10, // Bordas arredondadas
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        justifyContent: 'center', //
        shadowColor: '#000', // Cor da sombra
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio da sombra
        elevation: 5, // Elevação para Android
    },
    icone: {
        width: '40%',
        height: '40%',
        marginBottom: 5,
    },
    title: {
        color: '#ffffff', // Cor do texto
        fontSize: 16, // Tamanho da fonte
        textAlign: 'center', // Alinhamento do texto
        fontWeight: 'bold',
    },

});
export default BotaoMenu;