import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
export default function AuthForm({ navigation, mode = 'login' }) {
  const creating = mode === 'register';
  const { user, register, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  function submit() {
    setError(creating ? register(email, password, confirmation) : login(email, password));
    setPassword('');
    setConfirmation('');
  }
  return <KeyboardAvoidingView style={styles.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
      <Header navigation={navigation} />
      <View style={styles.form}>
        {user ? <>
          <Text style={styles.title}>MINHA CONTA</Text>
          <Text style={styles.description}>Você entrou como {user.email}.</Text>
          <Pressable accessibilityRole="button" style={styles.button} onPress={() => navigation.navigate('Home')}><Text style={styles.buttonText}>VOLTAR PARA A LOJA</Text></Pressable>
          <Pressable accessibilityRole="button" style={styles.link} onPress={() => { logout(); setError(''); }}><Text style={styles.linkText}>SAIR DA CONTA</Text></Pressable>
        </> : <>
          <Text style={styles.eyebrow}>BLACKWEAR</Text>
          <Text style={styles.title}>{creating ? 'CRIAR CONTA' : 'ENTRAR'}</Text>
          <Text style={styles.description}>{creating ? 'Preencha os dados para criar sua conta.' : 'Entre com seu e-mail e senha.'}</Text>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput accessibilityLabel="E-mail" style={styles.input} placeholder="seuemail@email.com" placeholderTextColor="#777" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" value={email} onChangeText={setEmail} />
          <Text style={styles.label}>SENHA</Text>
          <TextInput accessibilityLabel="Senha" style={styles.input} placeholder="Pelo menos 6 caracteres" placeholderTextColor="#777" secureTextEntry autoCapitalize="none" autoCorrect={false} autoComplete={creating ? 'new-password' : 'current-password'} value={password} onChangeText={setPassword} onSubmitEditing={creating ? undefined : submit} returnKeyType={creating ? 'next' : 'done'} />
          {creating && <><Text style={styles.label}>CONFIRMAR SENHA</Text><TextInput accessibilityLabel="Confirmar senha" style={styles.input} placeholder="Repita sua senha" placeholderTextColor="#777" secureTextEntry autoCapitalize="none" autoCorrect={false} autoComplete="new-password" value={confirmation} onChangeText={setConfirmation} onSubmitEditing={submit} returnKeyType="done" /></>}
          {!!error && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
          <Pressable accessibilityRole="button" style={styles.button} onPress={submit}><Text style={styles.buttonText}>{creating ? 'CRIAR CONTA' : 'ENTRAR'}</Text></Pressable>
          <Text style={styles.prompt}>{creating ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
          <Pressable accessibilityRole="button" style={styles.link} onPress={() => { setError(''); setPassword(''); setConfirmation(''); navigation.replace(creating ? 'Account' : 'Register'); }}><Text style={styles.linkText}>{creating ? 'ENTRAR' : 'CRIAR CONTA'}</Text></Pressable>
        </>}
        <Text style={styles.demo}>Demonstração para o PI: as contas valem somente enquanto o app estiver aberto.</Text>
        <Pressable accessibilityRole="button" style={styles.link} onPress={() => navigation.navigate('Home')}><Text style={styles.linkText}>← VOLTAR PARA A LOJA</Text></Pressable>
      </View>
      <Footer />
    </ScrollView>
  </KeyboardAvoidingView>;
}
const styles = StyleSheet.create({
 page: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center', backgroundColor: '#fff' }, scroll: { flexGrow: 1 },
 form: { flex: 1, width: '100%', maxWidth: 440, alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 32 },
 eyebrow: { color: '#777', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 8 },
 title: { fontSize: 28, fontWeight: '900', marginBottom: 12 }, description: { fontSize: 14, color: '#666', lineHeight: 21, marginBottom: 24 },
 label: { fontSize: 12, fontWeight: '800', marginBottom: 8 }, input: { minHeight: 48, borderWidth: 1, borderColor: '#bbb', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, marginBottom: 18, color: '#111', backgroundColor: '#fafafa' },
 button: { minHeight: 48, borderRadius: 24, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 }, buttonText: { color: '#fff', fontSize: 14, fontWeight: '800' },
 prompt: { textAlign: 'center', fontSize: 13, color: '#666', marginTop: 24 }, link: { minHeight: 44, justifyContent: 'center', alignItems: 'center' }, linkText: { fontSize: 12, fontWeight: '800', textDecorationLine: 'underline' },
 error: { color: '#a32020', fontSize: 13, lineHeight: 19, marginBottom: 8 }, demo: { fontSize: 11, lineHeight: 16, textAlign: 'center', color: '#777', marginTop: 24 }
});
