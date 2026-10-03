import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const {
    cart,
    totalQuantity,
    total,
    increase,
    decrease,
    remove,
  } = useCart();

  const formatCurrency = (value) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.logo}>BLACKWEAR</Text>
          </Pressable>

          <View style={styles.headerRight}>
            <Pressable onPress={() => navigation.navigate('Account')}>
              <Text style={styles.accountLink}>👤 Conta</Text>
            </Pressable>

            <Pressable style={styles.cartIcon} onPress={() => navigation.navigate('Cart')}>
              <Text>🛒</Text>
              <Text style={styles.cartCount}>{totalQuantity}</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          style={styles.backArea}
          onPress={() => {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('Home');
          }}
        >
          <Text style={styles.backText}>← VOLTAR</Text>
        </Pressable>

        <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>SEU CARRINHO</Text>
          <Text style={styles.cartSubtitle}>
            Você tem <Text style={styles.bold}>{totalQuantity}</Text> itens no seu carrinho de compras.
          </Text>
        </View>

        {cart.length > 0 ? (
          <>
            <View style={styles.products}>
              {cart.map((item, index) => (
                <View key={`${item.name}-${item.size}-${index}`} style={styles.cartItem}>
                  <View style={styles.itemMain}>
                    <View style={styles.productImage}>
                      <Text style={styles.imagePlaceholder}>BLACKWEAR</Text>
                    </View>

                    <View style={styles.productInfo}>
                      <Text style={styles.collection}>Coleção Essencial</Text>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.sizeText}>
                        Tamanho: <Text style={styles.bold}>{item.size}</Text>
                      </Text>

                      <Pressable onPress={() => remove(index)}>
                        <Text style={styles.remove}>Remover</Text>
                      </Pressable>
                    </View>
                  </View>

                  <View style={styles.itemBottom}>
                    <View style={styles.quantityControl}>
                      <Pressable style={styles.quantityButton} onPress={() => decrease(index)}>
                        <Text style={styles.quantitySymbol}>−</Text>
                      </Pressable>

                      <Text style={styles.quantity}>{item.quantity}</Text>

                      <Pressable style={styles.quantityButton} onPress={() => increase(index)}>
                        <Text style={styles.quantitySymbol}>+</Text>
                      </Pressable>
                    </View>

                    <Text style={styles.itemPrice}>
                      {formatCurrency(item.price * item.quantity)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.total}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>

            <Pressable
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Success')}
            >
              <Text style={styles.checkoutText}>FINALIZAR COMPRA</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
            <Text style={styles.emptyDescription}>
              Adicione um produto para continuar.
            </Text>

            <Pressable
              style={styles.continueButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.continueText}>CONTINUAR COMPRANDO</Text>
            </Pressable>
          </View>
        )}

        <Footer showCopyright={false} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  header: {
    minHeight: 75,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accountLink: {
    fontSize: 13,
    fontWeight: '700',
  },
  cartIcon: {
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
    marginTop: 20,
    marginBottom: 25,
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
  },
  cartHeader: {
    marginBottom: 28,
  },
  cartTitle: {
    marginBottom: 7,
    fontSize: 26,
    fontWeight: '900',
  },
  cartSubtitle: {
    color: '#777777',
    fontSize: 15,
    lineHeight: 21,
  },
  bold: {
    color: '#111111',
    fontWeight: '800',
  },
  products: {
    width: '100%',
  },
  cartItem: {
    paddingBottom: 18,
    marginBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  itemMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  productImage: {
    width: 115,
    height: 115,
    flexShrink: 0,
    borderWidth: 1.5,
    borderColor: '#111111',
    borderRadius: 10,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    color: '#666666',
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '900',
  },
  productInfo: {
    flex: 1,
  },
  collection: {
    marginBottom: 7,
    color: '#777777',
    fontSize: 12,
    fontWeight: '700',
  },
  productName: {
    marginBottom: 8,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
  },
  sizeText: {
    marginBottom: 10,
    fontSize: 14,
  },
  remove: {
    color: '#777777',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  itemBottom: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    width: 105,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#111111',
    borderRadius: 999,
  },
  quantityButton: {
    width: 35,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantitySymbol: {
    fontSize: 20,
  },
  quantity: {
    minWidth: 25,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: '900',
  },
  emptyCart: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: 15,
    fontSize: 45,
  },
  emptyTitle: {
    marginBottom: 8,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyDescription: {
    marginBottom: 25,
    color: '#777777',
    fontSize: 15,
    textAlign: 'center',
  },
  continueButton: {
    minHeight: 50,
    paddingHorizontal: 25,
    borderRadius: 999,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  total: {
    marginTop: 25,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  checkoutButton: {
    width: '100%',
    minHeight: 58,
    marginTop: 20,
    borderRadius: 999,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});
