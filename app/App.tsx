import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
  Linking,
  Image,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';

import './global.css';

const reportTypes = [
  { label: 'Potholes', value: 'potholes', icon: 'car' },
  { label: 'Garbage', value: 'garbage', icon: 'trash' },
  { label: 'Broken Streetlights', value: 'streetlights', icon: 'bulb' },
];

export default function App() {
  const [location, setLocation] = useState('Getting location...');
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCameraScreen, setShowCameraScreen] = useState(false);
  const [showReportScreen, setShowReportScreen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Report screen state
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [reportLocation, setReportLocation] = useState('Getting location...');
  const [timestamp, setTimestamp] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [takingPhoto, setTakingPhoto] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      setLoading(true);

      // First check current permission status
      const currentStatus = await Location.getForegroundPermissionsAsync();

      let finalStatus = currentStatus.status;

      // If permission is not granted, request it
      if (finalStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        // Location permission denied
        setHasLocationPermission(false);
        setLocation('Location Access Denied');
        setLoading(false);
        return;
      }

      setHasLocationPermission(true);

      // Get current location
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });
      const { latitude, longitude } = coords;

      // Reverse geocode to get city name
      const [locationData] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Priority order: city > district > subregion > region > country
      const detectedCity =
        locationData.city ||
        locationData.district ||
        locationData.subregion ||
        locationData.region ||
        locationData.country ||
        'Unknown Location';

      setLocation(detectedCity);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching location:', error);

      // In case of errors, show manual input option
      Alert.alert(
        'Location Error',
        'Unable to automatically detect location. Please try again or check your internet connection.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Retry', onPress: fetchLocation },
        ]
      );

      setHasLocationPermission(false);
      setLocation('Error getting location');
      setLoading(false);
    }
  };

  const handleLocationPress = async () => {
    if (
      hasLocationPermission === false ||
      location.includes('Error') ||
      location.includes('Denied')
    ) {
      // Check current permission status
      const currentStatus = await Location.getForegroundPermissionsAsync();

      if (currentStatus.canAskAgain) {
        // We can ask for permission again
        Alert.alert(
          'Location Permission Required',
          'Location access is needed to detect your city automatically. Please allow location access.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Allow Location', onPress: fetchLocation },
          ]
        );
      } else {
        // Permission was permanently denied, direct to settings
        Alert.alert(
          'Location Permission Required',
          'Location permission was denied. Please enable it in your device settings to automatically detect your city.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
      }
    }
  };

  const handleCameraPress = async () => {
    if (takingPhoto) return; // Prevent multiple clicks

    if (!permission) {
      // Camera permissions haven't been determined
      return;
    }

    if (!permission.granted) {
      // Camera permission not granted, request it
      const permissionResult = await requestPermission();
      if (!permissionResult.granted) {
        Alert.alert('Camera Permission Required', 'Please allow camera access to take photos.');
        return;
      }
    }

    setShowCameraScreen(true);
  };

  const takePicture = async () => {
    if (!cameraRef.current || takingPhoto) return;

    try {
      setTakingPhoto(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      // Immediately set photo and navigate to report screen
      setCapturedPhoto(photo.uri);
      setShowCameraScreen(false);
      setShowReportScreen(true);

      // Fetch location and time in background
      fetchLocationAndTimeForReport();
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    } finally {
      setTakingPhoto(false);
    }
  };

  const fetchLocationAndTimeForReport = async () => {
    try {
      setReportLoading(true);

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
        setReportLocation('Location permission denied');
        setReportLoading(false);
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

      setReportLocation(address || 'Unknown location');
      setReportLoading(false);
    } catch (error) {
      console.error('Error fetching location:', error);
      setReportLocation('Error getting location');
      setReportLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a report type.');
      return;
    }

    if (reportLocation.includes('Error') || reportLocation.includes('denied')) {
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
              console.log('Report submitted:', {
                type: selectedType,
                description: description.trim(),
                location: reportLocation,
                timestamp,
                photo: capturedPhoto,
              });

              // Reset all states
              setShowReportScreen(false);
              setCapturedPhoto(null);
              setSelectedType('');
              setDescription('');
              setReportLocation('Getting location...');
              setTimestamp('');
            },
          },
        ]
      );
    }, 2000);
  };

  const handleReportBack = () => {
    setShowReportScreen(false);
    setCapturedPhoto(null);
    setSelectedType('');
    setDescription('');
    setReportLocation('Getting location...');
    setTimestamp('');
  };

  const handleCameraBack = () => {
    setShowCameraScreen(false);
    setTakingPhoto(false);
  };

  // Camera Screen
  if (showCameraScreen) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#000000" translucent={false} />
        <CameraView style={styles.camera} facing="back" ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            {/* Header */}
            <View style={styles.cameraHeader}>
              <TouchableOpacity onPress={handleCameraBack} style={styles.cameraBackButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.cameraTitle}>Take Photo</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Camera Controls */}
            <View style={styles.cameraControls}>
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                  style={[styles.captureButton, takingPhoto && styles.captureButtonDisabled]}
                  onPress={takePicture}
                  disabled={takingPhoto}>
                  {takingPhoto ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <View style={styles.captureButtonInner} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  // Report Screen
  if (showReportScreen) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleReportBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Submit Report</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.reportContent} showsVerticalScrollIndicator={false}>
          {/* Captured Photo */}
          {capturedPhoto && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Captured Photo</Text>
              <Image source={{ uri: capturedPhoto }} style={styles.capturedImage} />
            </View>
          )}

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
                    size={28}
                    color={selectedType === type.value ? '#fff' : '#666'}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      selectedType === type.value && styles.typeTextSelected,
                    ]}>
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
                {reportLoading ? (
                  <ActivityIndicator size="small" color="#666" style={styles.loadingIndicator} />
                ) : (
                  <Text style={styles.infoText}>{reportLocation}</Text>
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
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleReportBack}
            disabled={submitting}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={submitting || reportLoading}>
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

  // Main App Screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>सफEye</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Location and Profile Section */}
      <View style={styles.locationSection}>
        <TouchableOpacity
          style={styles.locationRow}
          onPress={handleLocationPress}
          disabled={hasLocationPermission === true && !loading}>
          <Ionicons
            name={hasLocationPermission === false ? 'location-outline' : 'location'}
            size={24}
            color={hasLocationPermission === false ? '#f44336' : '#000'}
          />
          {loading ? (
            <ActivityIndicator size="small" color="black" style={styles.loadingIndicator} />
          ) : (
            <Text
              style={[
                styles.locationText,
                hasLocationPermission === false && styles.locationErrorText,
              ]}>
              {location}
            </Text>
          )}
          {hasLocationPermission === false && !loading && (
            <Ionicons name="refresh" size={16} color="#f44336" style={styles.refreshIcon} />
          )}
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Ionicons name="person-circle" size={32} color="#666" />
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>5</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hello, Noth</Text>
          <Text style={styles.welcomeSubtitle}>Welcome to सफEye</Text>
        </View>

        {/* Camera Button */}
        <View style={styles.cameraSection}>
          <TouchableOpacity
            style={[styles.cameraButton, takingPhoto && styles.cameraButtonDisabled]}
            onPress={handleCameraPress}
            disabled={takingPhoto}>
            <Ionicons name="camera" size={60} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Past Reports */}
        <View style={styles.reportsSection}>
          <Text style={styles.reportsTitle}>Past Reports</Text>

          <View style={styles.reportItem}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTime}>16:15</Text>
              <Text style={styles.reportType}>Garbage</Text>
              <Text style={styles.reportDate}>04 Sep, 2024</Text>
            </View>
            <View style={styles.reportLocation}>
              <Text style={styles.locationName}>Kamla Nagar, Delhi</Text>
              <View style={styles.statusIcon}>
                <View style={styles.pendingIcon} />
              </View>
            </View>
          </View>

          <View style={styles.reportItem}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTime}>15:00</Text>
              <Text style={styles.reportType}>Pothole</Text>
              <Text style={styles.reportDate}>02 Sep, 2024</Text>
            </View>
            <View style={styles.reportLocation}>
              <Text style={styles.locationName}>Rajouri Garden, Delhi</Text>
              <View style={styles.statusIcon}>
                <View style={styles.pendingIcon} />
              </View>
            </View>
          </View>

          <View style={styles.reportItem}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTime}>13:45</Text>
              <Text style={styles.reportType}>Water Logging</Text>
              <Text style={styles.reportDate}>31 Aug, 2024</Text>
            </View>
            <View style={styles.reportLocation}>
              <Text style={styles.locationName}>Tilak Nagar, Delhi</Text>
              <View style={styles.statusIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '500',
  },
  locationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  locationErrorText: {
    color: '#f44336',
    fontSize: 16,
  },
  loadingIndicator: {
    marginLeft: 8,
  },
  refreshIcon: {
    marginLeft: 8,
  },
  profileContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#f44336',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#999',
  },
  cameraSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  cameraButton: {
    backgroundColor: '#d32f2f',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cameraButtonDisabled: {
    backgroundColor: '#ccc',
  },
  reportsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reportsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reportItem: {
    backgroundColor: '#e8eaf6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginRight: 15,
  },
  reportType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  reportDate: {
    fontSize: 14,
    color: '#999',
  },
  reportLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  statusIcon: {
    marginLeft: 10,
  },
  pendingIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f44336',
  },
  // Camera Styles
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 45 : 15,
  },
  cameraBackButton: {
    padding: 5,
  },
  cameraTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cameraControls: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  cameraButtonContainer: {
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  // Report Screen Styles - Fixed padding
  reportContent: {
    flex: 1,
    paddingHorizontal: 16, // Consistent padding
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
  section: {
    marginVertical: 16, // Reduced vertical margin
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  capturedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8, // Reduced gap
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16, // Reduced padding
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    minHeight: 100,
  },
  typeButtonSelected: {
    backgroundColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
  typeText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  typeTextSelected: {
    color: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    minHeight: 100,
  },
  infoContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16, // Consistent padding
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
    backgroundColor: '#fff',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
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
    paddingVertical: 14,
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
