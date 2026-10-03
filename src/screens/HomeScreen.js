import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const { totalQuantity } = useCart();

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return products;

    return products.filter((item) =>
      item.searchName.toLowerCase().includes(value)
    );
  }, [search]);

  function submitSearch() {
    setSearch((value) => value.trim());
  }

  return (
    <View style={styles.page}>
      <Header
        navigation={navigation}
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={submitSearch}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.announcement}>
          <Text style={styles.announcementText}>
            Encontre os melhores produtos esportivos para seu estilo.
            Qualidade, conforto e desempenho em um só lugar.
          </Text>
        </View>

        <View style={styles.main}>
          <View style={styles.hero}>
            <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} />
          </View>

          <View style={styles.productsSection}>
            <View style={styles.sectionHeading}>
              <Text style={styles.sectionLabel}>BLACKWEAR</Text>
              <Text style={styles.sectionTitle}>Estilo que acompanha você.</Text>
            </View>

            <View style={styles.grid}>
              {filteredProducts.map((item) => (
                <Pressable
                  key={item.id}
                  style={styles.productCard}
                  onPress={() => navigation.navigate('Product')}
                >
                  <View style={styles.productImage}>
                    <Text style={styles.productImageText}>BLACKWEAR</Text>
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>
                      {formatCurrency(item.price)}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>

            {filteredProducts.length === 0 && (
              <Text style={styles.noResults}>Nenhum produto encontrado.</Text>
            )}
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scroll: {
    paddingBottom: 20,
  },
  announcement: {
    minHeight: 38,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcementText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  main: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 50,
  },
  hero: {
    width: '100%',
    height: 180,
    borderWidth: 3,
    borderColor: '#1688d4',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#dddddd',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  productsSection: {
    marginTop: 38,
  },
  sectionHeading: {
    marginBottom: 22,
  },
  sectionLabel: {
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#777777',
  },
  sectionTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  productCard: {
    width: '47.8%',
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  productImage: {
    width: '100%',
    aspectRatio: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7d7d7',
  },
  productImageText: {
    fontFamily: 'serif',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#555555',
  },
  productInfo: {
    padding: 13,
  },
  productName: {
    marginBottom: 8,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
  },
  noResults: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
});
