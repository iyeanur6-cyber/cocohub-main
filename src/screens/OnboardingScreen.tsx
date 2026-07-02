import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Image,
  Animated,
} from 'react-native';

import ErrorBoundary from '../components/ErrorBoundary';

const { width, height } = Dimensions.get('window');

// ─── Brand colours ────────────────────────────────────────────────────────────
const COCO = {
  bg: '#1A1A1A',          // deep coco charcoal
  surface: '#242424',     // slightly lighter card bg
  border: '#333333',
  accent: '#C8854A',      // warm coco/caramel
  accentMuted: 'rgba(200,133,74,0.15)',
  text: '#F5F0EB',        // warm off-white
  subtext: '#A89880',     // muted warm grey
  white: '#FFFFFF',
  green: '#4CAF50',
  greenMuted: 'rgba(76,175,80,0.12)',
};

interface Props {
  onComplete: () => void;
  onSkip: () => void;
}

// ─── Slide data (copy from README) ───────────────────────────────────────────
const slides = [
  {
    id: 1,
    label: 'WELCOME TO COCOHUB',
    title: 'Your pets deserve\nthe best care.',
    subtitle: 'Cocohub keeps every record, reminder, and vet visit in one secure place — powered by blockchain.',
    // Woman hugging golden retriever outdoors — warm, professional
    photo: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1200&q=90&fit=crop',
    photoAlt: 'Woman hugging her golden retriever',
    features: null,
  },
  {
    id: 2,
    label: 'BLOCKCHAIN RECORDS',
    title: 'Immutable.\nVerifiable.\nTrusted.',
    subtitle: 'Medical records anchored on the Stellar blockchain — tamper-proof forever.',
    // Vet in white coat carefully examining a dog on the table
    photo: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&q=90&fit=crop',
    photoAlt: 'Veterinarian examining a dog',
    features: [
      { icon: '🔒', text: 'AES-256 encrypted storage' },
      { icon: '⛓️', text: 'Stellar blockchain verification' },
      { icon: '📋', text: 'Complete lifetime medical history' },
    ],
  },
  {
    id: 3,
    label: 'SMART REMINDERS',
    title: 'Never miss a\ndose or visit.',
    subtitle: 'Medication reminders, appointment scheduling, and QR scanning — all in one app.',
    // Owner giving medicine / caring for dog at home
    photo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&q=90&fit=crop',
    photoAlt: 'Owner caring for their dog at home',
    features: [
      { icon: '💊', text: 'Smart medication reminders' },
      { icon: '📅', text: 'Vet appointment management' },
      { icon: '📱', text: 'Instant QR code scanning' },
    ],
  },
  {
    id: 4,
    label: 'EMERGENCY SOS',
    title: 'Help is one\ntap away.',
    subtitle: 'One-tap SOS to emergency contacts with your live location — 24/7.',
    // Vet and owner together looking at a cat — care + trust
    photo: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?w=1200&q=90&fit=crop',
    photoAlt: 'Vet and owner caring for a cat together',
    features: [
      { icon: '🚨', text: 'One-tap emergency alert' },
      { icon: '📍', text: 'Live GPS location sharing' },
      { icon: '🏥', text: 'Nearby vet clinic finder' },
    ],
  },
  {
    id: 5,
    label: 'PRIVACY FIRST',
    title: 'Your data.\nYour control.',
    subtitle: 'Biometric login, offline-first, GDPR compliant. Multi-pet support for your whole family.',
    // Family with dog — warm lifestyle shot
    photo: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=1200&q=90&fit=crop',
    photoAlt: 'Family enjoying time with their dog',
    features: [
      { icon: '🔐', text: 'Biometric authentication' },
      { icon: '🌐', text: 'Full offline functionality' },
      { icon: '👥', text: 'Unlimited multi-pet support' },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const OnboardingScreen: React.FC<Props> = ({ onComplete, onSkip }) => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [imgLoaded, setImgLoaded] = useState(false);

  const goTo = (index: number) => {
    setImgLoaded(false);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
    setCurrent(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleNext = () => {
    if (current < slides.length - 1) goTo(current + 1);
    else onComplete();
  };

  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.root} testID="onboarding-screen">
        <StatusBar barStyle="light-content" backgroundColor={COCO.bg} />

        {/* ── Hero photo strip ── */}
        <View style={styles.photoStrip}>
          <Image
            source={{ uri: slide.photo }}
            style={[styles.heroPhoto, { opacity: imgLoaded ? 1 : 0.3 }]}
            accessibilityLabel={slide.photoAlt}
            resizeMode="cover"
            onLoad={() => setImgLoaded(true)}
          />
          {/* offline fallback emoji when image hasn't loaded */}
          {!imgLoaded && (
            <View style={styles.photoFallback}>
              <Text style={{ fontSize: 80 }}>{['🐕','🩺','💊','🚨','🐈'][current]}</Text>
            </View>
          )}
          {/* dark gradient overlays */}
          <View style={styles.photoOverlayTop} />
          <View style={styles.photoOverlayBottom} />

          {/* top bar */}
          <View style={styles.topBar}>
            <Text style={styles.brandName}>Cocohub</Text>
            <TouchableOpacity onPress={onSkip} style={styles.skipBtn}
              accessibilityRole="button" accessibilityLabel="Skip onboarding">
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          {/* label chip */}
          <View style={styles.labelChip}>
            <Text style={styles.labelText}>{slide.label}</Text>
          </View>
        </View>

        {/* ── Swipeable content area ── */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            if (newIndex !== current) {
              setImgLoaded(false);
              Animated.sequence([
                Animated.timing(fadeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
                Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
              ]).start();
              setCurrent(newIndex);
            }
          }}
          style={{ flex: 1 }}
        >
          {slides.map((s, i) => (
            <Animated.View key={s.id} style={[styles.content, { width, opacity: i === current ? fadeAnim : 1 }]}>
              <Text style={styles.title}>{s.title}</Text>
              <Text style={styles.subtitle}>{s.subtitle}</Text>
              {s.features && (
                <View style={styles.featureList}>
                  {s.features.map((f, fi) => (
                    <View key={fi} style={styles.featureRow}>
                      <View style={styles.featureIconWrap}>
                        <Text style={styles.featureIcon}>{f.icon}</Text>
                      </View>
                      <Text style={styles.featureText}>{f.text}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Animated.View>
          ))}
        </ScrollView>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => goTo(i)}>
                <View style={[styles.dot, i === current && styles.dotActive]} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.navRow}>
            {current > 0 ? (
              <TouchableOpacity style={styles.backBtn} onPress={() => goTo(current - 1)}>
                <Text style={styles.backBtnText}>← Back</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.backBtn} />
            )}
            <TouchableOpacity
              style={[styles.nextBtn, isLast && styles.nextBtnAccent]}
              onPress={handleNext}
              testID={isLast ? 'onboarding-get-started-button' : 'onboarding-next-button'}
            >
              <Text style={styles.nextBtnText}>{isLast ? 'Get Started →' : 'Next →'}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.counter}>{current + 1} / {slides.length}</Text>
        </View>
      </SafeAreaView>
    </ErrorBoundary>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const PHOTO_HEIGHT = height * 0.52;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COCO.bg,
  },

  // ── Photo strip
  photoStrip: {
    height: PHOTO_HEIGHT,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  photoFallback: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2420',
  },
  photoOverlay: {},
  photoOverlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(26,26,26,0.2)',
  },
  photoOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(26,26,26,0.85)',
  },
  topBar: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 16 : 8,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: COCO.white,
    letterSpacing: 0.5,
  },
  skipBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  skipText: {
    fontSize: 13,
    color: COCO.white,
    fontWeight: '500',
  },
  labelChip: {
    position: 'absolute',
    bottom: 18,
    left: 20,
    backgroundColor: COCO.accentMuted,
    borderWidth: 1,
    borderColor: COCO.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
    color: COCO.accent,
    letterSpacing: 1.2,
  },

  // ── Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COCO.text,
    lineHeight: 40,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: COCO.subtext,
    lineHeight: 22,
    marginBottom: 24,
  },
  featureList: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COCO.surface,
    borderWidth: 1,
    borderColor: COCO.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 18,
  },
  featureText: {
    fontSize: 14,
    color: COCO.text,
    fontWeight: '500',
    flex: 1,
  },

  // ── Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COCO.border,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 18,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COCO.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: COCO.accent,
    borderRadius: 3,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    minWidth: 90,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backBtnText: {
    fontSize: 15,
    color: COCO.subtext,
    fontWeight: '500',
  },
  nextBtn: {
    backgroundColor: COCO.surface,
    borderWidth: 1,
    borderColor: COCO.border,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 10,
  },
  nextBtnAccent: {
    backgroundColor: COCO.accent,
    borderColor: COCO.accent,
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COCO.text,
  },
  counter: {
    fontSize: 12,
    color: COCO.subtext,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default OnboardingScreen;
