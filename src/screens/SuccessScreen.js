import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Footer from '../components/Footer';
import Header from '../components/Header';


export default function SuccessScreen({ navigation, route }) {
  const order = route.params?.order;
  const orderNumber = order?.number || '—';

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Header navigation={navigation} />

      <Pressable
        style={styles.backArea}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.backText}>← VOLTAR</Text>
      </Pressable>

      <View style={styles.successContent}>
        <View style={styles.successBox}>
          <View style={styles.successIcon}>
            <Text style={styles.check}>✓</Text>
          </View>

          <Text style={styles.title}>{order ? 'Pedido realizado com sucesso!' : 'Nenhum pedido realizado'}</Text>

          <Text style={styles.message}>
            {order ? 'Compra demonstrativa concluída. Nenhum pagamento foi cobrado.' : 'Adicione produtos ao carrinho para simular uma compra.'}
          </Text>

          <View style={styles.orderNumber}>
            <Text style={styles.orderText}>
              Pedido <Text style={styles.orderStrong}>{orderNumber}</Text>
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={styles.trackButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.trackText}>CONTINUAR COMPRANDO</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Cart')}
            >
              <Text style={styles.secondaryText}>VER CARRINHO</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },
  backArea: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  backText: {
    fontSize: 15,
    fontWeight: '800',
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  successBox: {
    width: '100%',
    alignItems: 'center',
  },
  successIcon: {
    width: 65,
    height: 65,
    marginBottom: 25,
    borderRadius: 33,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: '#ffffff',
    fontSize: 34,
    lineHeight: 36,
  },
  title: {
    marginBottom: 15,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  message: {
    maxWidth: 560,
    marginBottom: 25,
    color: '#666666',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  orderNumber: {
    marginBottom: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
  },
  orderText: {
    fontSize: 16,
    fontWeight: '700',
  },
  orderStrong: {
    fontSize: 19,
    fontWeight: '900',
  },
  actions: {
    width: '100%',
    maxWidth: 430,
    gap: 12,
  },
  trackButton: {
    width: '100%',
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    width: '100%',
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '800',
  },
});
