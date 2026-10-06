import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Footer from '../components/Footer';
import { products } from '../data/products';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

const sizes = ['P', 'M', 'G', 'GG'];

export default function ProductScreen({ navigation, route }) {
  const product = products.find(item => item.id === route.params?.productId) || products[0];
  const [selectedSize, setSelectedSize] = useState('M');
  const { addProduct } = useCart();

  function addToCart() {
    addProduct(product, selectedSize);
    navigation.navigate('Cart');
  }

  return (
    <View style={styles.page}>
      <ScrollView>
        <Header navigation={navigation} />

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

          <Text style={styles.title}>{product.name}</Text>

          <Text style={styles.price}>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>

          <Text style={styles.description}>
            {product.id === 1 ? 'Desenvolvida em algodão 100% premium com modelagem oversized confortável, ombros caídos e gola canelada de 3cm.' : `${product.name} da coleção BLACKWEAR. Uma opção para compor seu estilo no dia a dia.`}
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
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
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
