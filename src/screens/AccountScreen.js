import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.page}>
      <View style={styles.accountPage}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logo}>BLACKWEAR</Text>
        </Pressable>

        <Text style={styles.title}>Minha Conta</Text>

        <Text style={styles.description}>
          Área de acesso da BLACKWEAR. Escolha uma opção para continuar.
        </Text>

        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>CRIAR CONTA</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.secondary]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.secondaryText}>ENTRAR</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.secondary]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.secondaryText}>VOLTAR PARA A LOJA</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#202020',
  },
  accountPage: {
    width: '100%',
    maxWidth: 500,
    padding: 35,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 30,
    color: '#111111',
    fontFamily: 'serif',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    marginBottom: 12,
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    marginBottom: 28,
    color: '#666666',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    minHeight: 55,
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  secondary: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#111111',
  },
  secondaryText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800',
  },
});
