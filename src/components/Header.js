import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useCart } from '../context/CartContext';

export default function Header({
  navigation,
  showSearch = false,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
}) {
  const { totalQuantity } = useCart();

  return (
    <View style={styles.header}>
      <View style={[styles.headerContainer, showSearch ? styles.headerWithSearch : null]}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Text style={styles.logo}>BLACKWEAR</Text>
        </Pressable>

        {showSearch && (
          <View style={styles.searchContainer}>
            <TextInput
              value={searchValue}
              onChangeText={onSearchChange}
              onSubmitEditing={onSearchSubmit}
              placeholder="Encontre seu melhor estilo esportivo!"
              placeholderTextColor="#bdbdbd"
              style={styles.searchInput}
              returnKeyType="search"
            />
            <Pressable style={styles.searchButton} onPress={onSearchSubmit}>
              <Text style={styles.searchIcon}>🔍</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.headerActions}>
          <Pressable
            style={styles.accountLink}
            onPress={() => navigation.navigate('Account')}
          >
            <Text style={styles.accountIcon}>👤</Text>
            <Text style={styles.accountText}>Conta</Text>
          </Pressable>

          <Pressable
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            <Text style={styles.cartCount}>{totalQuantity}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerContainer: {
    minHeight: 82,
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerWithSearch: {
    flexWrap: 'wrap',
  },
  logo: {
    fontFamily: 'serif',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#111111',
  },
  searchContainer: {
    flex: 1,
    minWidth: 120,
    height: 44,
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    height: 44,
    borderRadius: 999,
    backgroundColor: '#111111',
    color: '#ffffff',
    paddingLeft: 18,
    paddingRight: 52,
    fontSize: 15,
  },
  searchButton: {
    position: 'absolute',
    right: 6,
    top: 5,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 16,
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
  accountIcon: {
    fontSize: 20,
  },
  accountText: {
    fontSize: 14,
    fontWeight: '700',
  },
  cartButton: {
    position: 'relative',
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 23,
    backgroundColor: '#f1f1f1',
  },
  cartIcon: {
    fontSize: 20,
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
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 4,
  },
});
