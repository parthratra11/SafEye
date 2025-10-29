import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const reportTypes = [
  { label: 'Potholes', value: 'potholes', icon: 'car' },
  { label: 'Garbage', value: 'garbage', icon: 'trash' },
  { label: 'Broken Streetlights', value: 'streetlights', icon: 'bulb' },
];

export default function ReportScreen({ onBack, onSubmit }) {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Getting location...');
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLocationAndTime();
  }, []);

  const fetchLocationAndTime = async () => {
    try {
      setLoading(true);

      // Get current timestamp
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const dateString = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      setTimestamp(`${timeString}, ${dateString}`);

      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'Location access is required to submit a report. Please enable location permission.',
          [
            { text: 'Cancel', style: 'cancel', onPress: onBack },
            { text: 'Retry', onPress: fetchLocationAndTime },
          ]
        );
        setLocation('Location permission denied');
        setLoading(false);
        return;
      }

      // Get current location
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });
      const { latitude, longitude } = coords;

      // Reverse geocode to get address
      const [locationData] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = `${locationData.name || ''} ${locationData.street || ''} ${
        locationData.city || locationData.district || locationData.region || ''
      }`.trim();

      setLocation(address || 'Unknown location');
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Location Error', 'Unable to get your location. Please try again.', [
        { text: 'Cancel', style: 'cancel', onPress: onBack },
        { text: 'Retry', onPress: fetchLocationAndTime },
      ]);
      setLocation('Error getting location');
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a report type.');
      return;
    }

    if (location.includes('Error') || location.includes('denied')) {
      Alert.alert('Error', 'Valid location is required to submit a report.');
      return;
    }

    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert(
        'Report Submitted Successfully!',
        'Thank you for reporting. Your report has been submitted and will be reviewed by the authorities.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (onSubmit) {
                onSubmit({
                  type: selectedType,
                  description: description.trim(),
                  location,
                  timestamp,
                });
              }
              onBack();
            },
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Submit Report</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Report Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Issue Type *</Text>
          <View style={styles.typeContainer}>
            {reportTypes.map((type) => (
              <TouchableOpacity
                key={type.value}
                style={[
                  styles.typeButton,
                  selectedType === type.value && styles.typeButtonSelected,
                ]}
                onPress={() => setSelectedType(type.value)}>
                <Ionicons
                  name={type.icon}
                  size={32}
                  color={selectedType === type.value ? '#fff' : '#666'}
                />
                <Text
                  style={[styles.typeText, selectedType === type.value && styles.typeTextSelected]}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description (Optional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Provide additional details about the issue..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Location and Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location & Time</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={20} color="#666" />
              {loading ? (
                <ActivityIndicator size="small" color="#666" style={styles.loadingIndicator} />
              ) : (
                <Text style={styles.infoText}>{location}</Text>
              )}
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color="#666" />
              <Text style={styles.infoText}>{timestamp}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onBack} disabled={submitting}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={submitting || loading}>
          {submitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Report</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: Platform.OS === 'android' ? 20 : 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeButtonSelected: {
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
  typeText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  typeTextSelected: {
    color: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 100,
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  loadingIndicator: {
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#d32f2f',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
