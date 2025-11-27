import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
  Button,
  Image,
} from "react-native";

const IconeLupa = require("../../../assets/lupa.png");
const IconeSeta = require("../../../assets/seta.png");

// Habilita LayoutAnimation no Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// agrupa e filtra
const groupAndFilterMedicos = (medicos, searchText) => {
  const filteredMedicos = medicos.filter((medico) =>
    (medico.nome + medico.especialidade)
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const grouped = filteredMedicos.reduce((acc, medico) => {
    const firstLetter = medico.nome[0]?.toUpperCase() || "#";
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(medico);
    return acc;
  }, {});

  return Object.keys(grouped)
    .sort()
    .map((letter) => ({
      title: letter,
      data: grouped[letter],
    }));
};

const MedicoCard = ({ medico, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((prev) => !prev);
  };

  return (
    <View style={cardStyles.card}>
      <TouchableOpacity onPress={toggleExpand} style={cardStyles.mainInfo}>
        <View>
          <Text style={cardStyles.nome}>{medico.nome}</Text>
          <Text style={cardStyles.especialidade}>
            {medico.especialidade} | CRM: {medico.crm}
          </Text>
        </View>

        <Image
          source={IconeSeta}
          style={[
            cardStyles.arrowIcon,
            { transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] },
          ]}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={cardStyles.details}>
          <Text style={cardStyles.detailText}>Email: {medico.email}</Text>
          <Text style={cardStyles.detailText}>Telefone: {medico.telefone}</Text>
          <Text style={cardStyles.detailText}>Endereço: {medico.endereco}</Text>

          <View style={cardStyles.actionButtons}>
            <Button
              title="Editar"
              onPress={() => navigation.navigate("MedicoForm", { medico })}
            />
            <Button
              title="Desativar Perfil"
              color="red"
              onPress={() => {
                // futuro: desativar / remover
                navigation.navigate("Consultas"); // temporário
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const MedicosListScreen = ({ navigation, medicos }) => {
  const [searchText, setSearchText] = useState("");

  const sections = useMemo(
    () => groupAndFilterMedicos(medicos, searchText),
    [medicos, searchText]
  );

  return (
    <View style={styles.container}>
      {/* Campo de busca, como no PDF */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar Médico ou Especialidade"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Image source={IconeLupa} style={styles.searchIcon} />
      </View>

      {/* Lista A-Z */}
      <View style={styles.listWrapper}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MedicoCard medico={item} navigation={navigation} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={styles.sectionListContent}
          stickySectionHeadersEnabled
        />
      </View>

      {/* Botão fixo embaixo – “Cadastrar novo perfil” */}
      <SafeAreaView style={[styles.safeArea]}>
        <View style={styles.fixedButtonContainer}>
          <Button
            title="Cadastrar Novo Perfil"
            onPress={() => navigation.navigate("MedicoForm")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: "#aaa",
  },
  listWrapper: {
    flex: 1,
  },
  sectionListContent: {
    paddingBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#f5f5f5",
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "#333",
  },
  fixedButtonContainer: {
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  mainInfo: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  especialidade: {
    fontSize: 14,
    color: "#555",
  },
  arrowIcon: {
    width: 15,
    height: 15,
    tintColor: "#0056d8ff",
  },
  details: {
    padding: 15,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default MedicosListScreen;
