import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

interface AudioPlayerProps {
  audioSrc: string | number;
  title: string;
  onEnd?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, title, onEnd }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('Received audioSrc:', audioSrc); // ✅ Log the incoming audioSrc
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioSrc]);

  // ✅ Pause audio automatically when screen is not focused
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (sound) {
          sound.pauseAsync();
          setIsPlaying(false);
        }
      };
    }, [sound])
  );

  const loadAudio = async () => {
    const BASE_AUDIO_URL = "https://cdn.jsdelivr.net/gh/Nishant-Manocha/FineduGuard_StaticFiles@main/audio";
    try {
      const source =
        typeof audioSrc === 'string' ? { uri: `${BASE_AUDIO_URL}/${audioSrc}` } : audioSrc;

      const { sound: newSound } = await Audio.Sound.createAsync(
        source,
        { shouldPlay: false }
      );

      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setCurrentTime(status.positionMillis || 0);
          setDuration(status.durationMillis || 0);
          setIsLoaded(true);

          if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentTime(0);
            onEnd?.();
          }
        }
      });
    } catch (error) {
      console.log('Audio loading error:', error);
      setIsLoaded(true);
      setDuration(180000);
    }
  };

  const togglePlayPause = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log('Playback error:', error);
    }
  };

  const restart = async () => {
    if (!sound) return;
    try {
      await sound.setPositionAsync(0);
      setCurrentTime(0);
      setIsPlaying(false);
    } catch (error) {
      console.log('Restart error:', error);
    }
  };

  const formatTime = (timeMs: number) => {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Volume2 size={20} color="#1e40af" />
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={restart}
            disabled={!isLoaded}
          >
            <RotateCcw size={20} color={!isLoaded ? '#9ca3af' : '#1e40af'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.playButton, !isLoaded && styles.disabled]}
            onPress={togglePlayPause}
            disabled={!isLoaded}
          >
            <LinearGradient
              colors={['#3b82f6', '#1d4ed8']}
              style={styles.playButtonGradient}
            >
              {isPlaying ? (
                <Pause size={24} color="white" />
              ) : (
                <Play size={24} color="white" style={{ marginLeft: 2 }} />
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {!isLoaded && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading audio lesson...</Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 16, overflow: 'hidden', elevation: 4, shadowColor: '#1e40af', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 20 },
  gradient: { padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '500', color: '#1f2937', marginLeft: 12, flex: 1 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  controlButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(30, 64, 175, 0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  playButton: { width: 64, height: 64, borderRadius: 32, overflow: 'hidden' },
  playButtonGradient: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.5 },
  progressContainer: { marginTop: 8 },
  progressBar: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#3b82f6' },
  timeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  timeText: { fontSize: 12, color: '#6b7280' },
  loadingContainer: { alignItems: 'center', marginTop: 8 },
  loadingText: { fontSize: 12, color: '#6b7280' },
});

export default AudioPlayer;
