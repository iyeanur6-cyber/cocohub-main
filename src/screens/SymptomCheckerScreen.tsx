import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface PredictionResult {
  urgency: 'low' | 'moderate' | 'high' | 'emergency';
  probableConditions: string[];
  recommendedActions: string[];
}

export default function SymptomCheckerScreen({ route }: any) {
  const petId = route?.params?.petId || 'unknown';
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');

  const handleCheckSymptoms = async () => {
    if (!species || !breed || !symptomsInput) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const symptomList = symptomsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
      
      const response = await fetch('/api/predictions/symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petId,
          species,
          breed,
          symptoms: symptomList,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setResult(data);
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Symptom Checker</Text>

      <Text style={styles.label}>Species</Text>
      <TextInput
        style={styles.input}
        value={species}
        onChangeText={setSpecies}
        placeholder="e.g. Dog, Cat"
      />

      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
        placeholder="e.g. German Shepherd, Persian"
      />

      <Text style={styles.label}>Symptoms (separated by commas)</Text>
      <TextInput
        style={styles.input}
        value={symptomsInput}
        onChangeText={setSymptomsInput}
        placeholder="e.g. vomiting, lethargy, coughing"
        multiline
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Check Symptoms" onPress={handleCheckSymptoms} />
      )}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Analysis Result</Text>
          <Text style={[styles.urgencyText, styles[result.urgency]]}>
            Urgency: {result.urgency.toUpperCase()}
          </Text>

          <Text style={styles.sectionHeader}>Probable Conditions:</Text>
          {result.probableConditions.map((condition, index) => (
            <Text key={index} style={styles.bulletItem}>• {condition}</Text>
          ))}

          <Text style={styles.sectionHeader}>Recommended Actions:</Text>
          {result.recommendedActions.map((action, index) => (
            <Text key={index} style={styles.bulletItem}>• {action}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, fontSize: 16, backgroundColor: '#f9f9f9' },
  errorText: { color: 'red', marginVertical: 10, fontWeight: 'bold' },
  resultContainer: { marginTop: 30, padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, backgroundColor: '#f0f4f8' },
  resultTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  urgencyText: { fontSize: 16, fontWeight: 'bold', padding: 5, borderRadius: 3, textAlign: 'center', overflow: 'hidden' },
  low: { backgroundColor: '#d4edda', color: '#155724' },
  moderate: { backgroundColor: '#fff3cd', color: '#856404' },
  high: { backgroundColor: '#f8d7da', color: '#721c24' },
  emergency: { backgroundColor: '#721c24', color: '#fff' },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  bulletItem: { fontSize: 15, marginLeft: 10, marginBottom: 3 }
});
    
