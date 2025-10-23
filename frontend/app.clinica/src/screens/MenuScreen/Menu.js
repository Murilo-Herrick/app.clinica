import { View, Text, Image, StyleSheet } from 'react-native';
import BotaoMenu from "../components/BotaoMenu";

const Logo = require('../../../assets/logo.png')

const IconeMedic = require('../../../assets/usuario-md.png');
const IconePaciente = require('../../../assets/utilizador.png');
const IconeConsulta = require('../../../assets/calendario.png');


const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.header}>Gerenciando Clinica</Text>
            <View style={styles.btns}>
                <Text>Escolha qual seção deseja iniciar.</Text>
                <BotaoMenu
                    icon={IconeMedic}
                    title="Medicos"
                    onPress={() => navigation.navigate('Medicos')}
                />

                <BotaoMenu
                    icon={IconePaciente}
                    title="Pacientes"
                    onPress={() => navigation.navigate('Pacientes')}
                />

                <BotaoMenu
                    icon={IconeConsulta}
                    title="Consulta"
                    onPress={() => navigation.navigate('Consultas')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: '50%',
        height: '50%',
        alignSelf: 'center',
        marginBottom: 15,
    },
    header: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    btns: {
        width: '100%',
        marginTop: 60,
    },
});
export default MenuScreen;