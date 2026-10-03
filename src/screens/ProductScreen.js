import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Footer from '../components/Footer';
import { product } from '../data/products';
import { useCart } from '../context/CartContext';

const sizes = ['P', 'M', 'G', 'GG'];

export default function ProductScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const { addProduct, totalQuantity } = useCart();

  function addToCart() {
    addProduct(product, selectedSize);
    navigation.navigate('Cart');
  }

  function submitSearch() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Home')}>
            <Text style={styles.logo}>BLACKWEAR</Text>
          </Pressable>

          <View style={styles.searchContainer}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={submitSearch}
              placeholder="Pesquisar produtos..."
              placeholderTextColor="#bdbdbd"
              style={styles.searchInput}
            />
            <Pressable style={styles.searchButton} onPress={submitSearch}>
              <Text>🔍</Text>
            </Pressable>
          </View>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.accountLink}
              onPress={() => navigation.navigate('Account')}
            >
              <Text>👤</Text>
              <Text style={styles.accountText}>Conta</Text>
            </Pressable>

            <Pressable
              style={styles.cartButton}
              onPress={() => navigation.navigate('Cart')}
            >
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

        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>BLACKWEAR</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.collection}>COLEÇÃO ESSENCIAL</Text>

          <Text style={styles.title}>Camiseta Oversized Premium</Text>

          <Text style={styles.price}>R$ 189,90</Text>

          <Text style={styles.description}>
            Desenvolvida em algodão 100% premium com modelagem oversized confortável,
            ombros caídos e gola canelada de 3cm que mantém o caimento estruturado.
            {'\n\n'}
            Uma peça minimalista feita para resistir ao tempo e ao desgaste urbano.
          </Text>

          <View style={styles.sizesArea}>
            <Text style={styles.sizesTitle}>SELECIONE O TAMANHO:</Text>

            <View style={styles.sizesList}>
              {sizes.map((size) => (
                <Pressable
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonActive,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.buyButton} onPress={addToCart}>
              <Text style={styles.buyText}>COMPRAR AGORA</Text>
            </Pressable>

            <Pressable style={styles.cartAddButton} onPress={addToCart}>
              <Text style={styles.cartAddText}>ADICIONAR AO CARRINHO</Text>
            </Pressable>
          </View>
        </View>

        <Footer showCopyright={false} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    width: '100%',
    minHeight: 82,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flexWrap: 'wrap',
  },
  logo: {
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#111111',
  },
  searchContainer: {
    flex: 1,
    minWidth: 140,
    height: 43,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    height: 43,
    borderRadius: 999,
    backgroundColor: '#111111',
    color: '#ffffff',
    paddingHorizontal: 17,
    paddingRight: 50,
    fontSize: 14,
  },
  searchButton: {
    position: 'absolute',
    right: 6,
    top: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accountLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  accountText: {
    fontSize: 14,
    fontWeight: '700',
  },
  cartButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 22,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 4,
  },
  backArea: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
  },
  imageSection: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.4,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 14,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontFamily: 'serif',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 3,
    color: '#555555',
  },
  info: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  collection: {
    marginBottom: 10,
    color: '#777777',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    marginBottom: 10,
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '800',
  },
  price: {
    marginBottom: 20,
    fontSize: 21,
    fontWeight: '900',
  },
  description: {
    marginBottom: 26,
    color: '#5f5f5f',
    fontSize: 15,
    lineHeight: 25,
  },
  sizesArea: {
    marginBottom: 28,
  },
  sizesTitle: {
    marginBottom: 12,
    fontSize: 14,
    fontWeight: '800',
  },
  sizesList: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    width: 48,
    height: 48,
    borderWidth: 1.5,
    borderColor: '#222222',
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonActive: {
    backgroundColor: '#000000',
  },
  sizeText: {
    fontSize: 15,
    fontWeight: '800',
  },
  sizeTextActive: {
    color: '#ffffff',
  },
  actions: {
    flexDirection: 'column',
    gap: 13,
  },
  buyButton: {
    width: '100%',
    minHeight: 58,
    borderRadius: 999,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  cartAddButton: {
    width: '100%',
    minHeight: 58,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartAddText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '800',
  },
});
