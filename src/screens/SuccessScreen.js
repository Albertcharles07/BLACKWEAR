import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const ORDER_KEY = 'blackwearOrderNumber';

export default function SuccessScreen({ navigation }) {
  const { totalQuantity, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('#0000000');

  useEffect(() => {
    async function finishOrder() {
      let saved = await AsyncStorage.getItem(ORDER_KEY);

      if (!saved) {
        const number =
          Math.floor(1000000 + Math.random() * 9000000);
        saved = `#${number}`;
        await AsyncStorage.setItem(ORDER_KEY, saved);
      }

      setOrderNumber(saved);
      await clearCart();
    }

    finishOrder();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logo}>BLACKWEAR</Text>
        </Pressable>

        <View style={styles.headerActions}>
          <Pressable onPress={() => navigation.navigate('Account')}>
            <Text style={styles.account}>👤 Conta</Text>
          </Pressable>

          <Pressable style={styles.cartLink} onPress={() => navigation.navigate('Cart')}>
            <Text>🛒</Text>
            <Text style={styles.cartCount}>{totalQuantity}</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        style={styles.backArea}
        onPress={() => {
          if (navigation.canGoBack()) navigation.goBack();
          else navigation.navigate('Cart');
        }}
      >
        <Text style={styles.backText}>← VOLTAR</Text>
      </Pressable>

      <View style={styles.successContent}>
        <View style={styles.successBox}>
          <View style={styles.successIcon}>
            <Text style={styles.check}>✓</Text>
          </View>

          <Text style={styles.title}>Pedido realizado com sucesso!</Text>

          <Text style={styles.message}>
            Agradecemos a preferência. Os detalhes da compra foram registrados com sucesso.
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
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    minHeight: 75,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  logo: {
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  account: {
    fontSize: 13,
    fontWeight: '700',
  },
  cartLink: {
    position: 'relative',
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 23,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 4,
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
