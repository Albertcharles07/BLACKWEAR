import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import BackLink from '../components/BackLink';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { blankProductForm, validateProductForm } from '../utils/productForm';
const modalities = ['Futebol', 'Basquete', 'Corrida', 'Treino', 'Casual', 'Outro'];
const sizes = ['P', 'M', 'G', 'GG', 'Único'];
export default function AddProductScreen({ navigation }) {
 const { user } = useAuth();
 if (!user) return <Screen navigation={navigation} active="Account"><BackLink navigation={navigation} fallback="Account" /><View style={{ padding: 24 }}><Text>Entre na sua conta para cadastrar produtos.</Text></View></Screen>;
 return <ProductForm navigation={navigation} />;
}
function ProductForm({ navigation }) {
 const { createProduct } = useProducts();
 const [form, setForm] = useState({ ...blankProductForm, sizes: [] });
 const [error, setError] = useState('');
 const [saving, setSaving] = useState(false);
 const pending = useRef(false);
 function change(key, value) { setForm(current => ({ ...current, [key]: value })); setError(''); }
 function toggleSize(size) {
  const selected = form.sizes;
  change('sizes', selected.includes(size) ? selected.filter(item => item !== size) : size === 'Único' ? ['Único'] : [...selected.filter(item => item !== 'Único'), size]);
 }
 async function save() {
  if (pending.current) return;
  const validation = validateProductForm(form);
  if (validation) { setError(validation); return; }
  pending.current = true; setSaving(true); setError('');
  try {
   const product = await createProduct(form);
   navigation.popTo('Admin', { createdProductId: product.id });
  } catch (e) { setError(e.message || 'Não foi possível salvar. Tente novamente.'); }
  finally { pending.current = false; setSaving(false); }
 }
 function input(key, label, options = {}) {
  return <View key={key}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} editable={!saving} style={[styles.input, options.multiline && styles.multiline]} placeholderTextColor="#888" value={form[key]} onChangeText={value => change(key, value)} {...options} /></View>;
 }
 return <Screen navigation={navigation} active="Account">
  <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
   <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
    <BackLink navigation={navigation} fallback="Admin" label="← ADMINISTRAÇÃO" />
    <View style={styles.form}>
     <Text style={styles.eyebrow}>BLACKWEAR / CATÁLOGO</Text><Text style={styles.title}>Adicionar produto</Text><Text style={styles.description}>Preencha os dados do novo item. Os campos opcionais estão identificados.</Text>
     {input('name', 'Nome do produto', { placeholder: 'Nome do item', maxLength: 100 })}
     {input('description', 'Descrição (opcional)', { placeholder: 'Detalhes do produto', multiline: true, maxLength: 1200 })}
     <View style={styles.row}><View style={{ flex: 1 }}>{input('price', 'Preço (R$)', { placeholder: '129,90', keyboardType: 'decimal-pad', maxLength: 12 })}</View><View style={{ flex: 1 }}>{input('salePrice', 'Oferta (opcional)', { placeholder: '99,90', keyboardType: 'decimal-pad', maxLength: 12 })}</View></View>
     {input('category', 'Categoria', { placeholder: 'Ex.: Camisetas', maxLength: 50 })}
     <Text style={styles.label}>Modalidade</Text><View style={styles.options}>{modalities.map(option => <Pressable key={option} accessibilityRole="radio" accessibilityLabel={`Modalidade ${option}`} accessibilityState={{ checked: form.modality === option }} disabled={saving} style={[styles.chip, form.modality === option && styles.active]} onPress={() => change('modality', option)}><Text style={[styles.chipText, form.modality === option && styles.activeText]}>{option}</Text></Pressable>)}</View>
     {input('team', 'Time (opcional)', { placeholder: 'Deixe vazio se não houver time', maxLength: 60 })}
     <Text style={styles.label}>Tamanhos disponíveis</Text><View style={styles.options}>{sizes.map(size => <Pressable key={size} accessibilityRole="checkbox" accessibilityLabel={`Tamanho ${size}`} accessibilityState={{ checked: form.sizes.includes(size) }} disabled={saving} style={[styles.chip, form.sizes.includes(size) && styles.active]} onPress={() => toggleSize(size)}><Text style={[styles.chipText, form.sizes.includes(size) && styles.activeText]}>{size}</Text></Pressable>)}</View>
     {input('imageUrl', 'URL da imagem (opcional)', { placeholder: 'https://...', keyboardType: 'url', autoCapitalize: 'none', autoCorrect: false, maxLength: 2000 })}
     {!!error && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
     <Pressable accessibilityRole="button" accessibilityLabel="Salvar produto" disabled={saving} style={[styles.save, saving && { opacity: 0.5 }]} onPress={save}><Text style={styles.saveText}>{saving ? 'SALVANDO...' : 'SALVAR PRODUTO'}</Text></Pressable>
     <Pressable accessibilityRole="button" style={styles.cancel} disabled={saving} onPress={() => navigation.goBack()}><Text style={styles.cancelText}>CANCELAR</Text></Pressable>
    </View>
   </ScrollView>
  </KeyboardAvoidingView>
 </Screen>;
}
const styles = StyleSheet.create({
 content: { paddingBottom: 24 }, form: { padding: 20 }, eyebrow: { fontSize: 9, fontWeight: '800', letterSpacing: 1.5, color: '#777', marginBottom: 8 }, title: { fontSize: 27, fontWeight: '900', marginBottom: 10 }, description: { fontSize: 12, lineHeight: 19, color: '#777', marginBottom: 24 }, label: { fontSize: 12, fontWeight: '700', marginBottom: 8 }, input: { minHeight: 48, padding: 13, borderRadius: 9, borderWidth: 1, borderColor: '#ccc', fontSize: 14, color: '#111', backgroundColor: '#fafafa', marginBottom: 20 }, multiline: { minHeight: 90, textAlignVertical: 'top' }, row: { flexDirection: 'row', gap: 12 }, options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 22 }, chip: { minHeight: 42, minWidth: 44, paddingHorizontal: 13, borderWidth: 1, borderColor: '#ccc', borderRadius: 22, alignItems: 'center', justifyContent: 'center' }, chipText: { fontSize: 12 }, active: { backgroundColor: '#111', borderColor: '#111' }, activeText: { color: '#fff', fontWeight: '700' }, error: { fontSize: 12, lineHeight: 19, color: '#a32020', marginBottom: 16 }, save: { minHeight: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111' }, saveText: { fontSize: 12, fontWeight: '800', color: '#fff' }, cancel: { minHeight: 44, alignItems: 'center', justifyContent: 'center', marginTop: 6 }, cancelText: { fontSize: 11, fontWeight: '700', textDecorationLine: 'underline' },
});
