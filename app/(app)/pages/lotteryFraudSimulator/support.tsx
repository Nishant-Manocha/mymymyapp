import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Headphones, MessageCircle, Phone, Clock, TriangleAlert as AlertTriangle, X, ArrowLeft } from 'lucide-react-native';

export default function SupportScreen() {
  const [message, setMessage] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const startChat = () => {
    setChatActive(true);
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setBlocked(true);
        Alert.alert(
          "Support Blocked You!",
          "This simulates how scammers block victims after getting money. In real scams, once payment is received, all communication stops.",
          [{ text: "Understood", style: "default" }]
        );
      });
    }, 3000);
  };

  const callSupport = () => {
    Alert.alert(
      "Number Disconnected",
      "The number you have dialed is not in service. This is how scammers disappear after collecting money - all contact methods become unreachable.",
      [{ text: "Got it!", style: "default" }]
    );
  };

  const goBack = () => {
    router.back();
  };

  const goToEducation = () => {
    router.push('/education');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#3B82F6', '#1D4ED8', '#1E40AF']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Headphones size={56} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>24/7 Customer Support</Text>
            <Text style={styles.subtitle}>We're here to help you claim your prize!</Text>
          </View>

          {!blocked ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={styles.supportOptions}>
                <TouchableOpacity style={styles.supportOption} onPress={startChat}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                    style={styles.optionGradient}
                  >
                    <MessageCircle size={40} color="#059669" />
                    <Text style={styles.optionTitle}>Live Chat</Text>
                    <Text style={styles.optionSubtext}>Average response: 30 seconds</Text>
                    <View style={styles.statusOnline}>
                      <Text style={styles.statusText}>● Online</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.supportOption} onPress={callSupport}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
                    style={styles.optionGradient}
                  >
                    <Phone size={40} color="#3B82F6" />
                    <Text style={styles.optionTitle}>Call Support</Text>
                    <Text style={styles.optionSubtext}>+91 98765-43210</Text>
                    <View style={styles.statusOnline}>
                      <Text style={styles.statusText}>● Available</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.hoursCard}>
                <Clock size={28} color="#059669" />
                <View style={styles.hoursContent}>
                  <Text style={styles.hoursTitle}>Support Hours</Text>
                  <Text style={styles.hoursText}>24/7 Available • No Holidays</Text>
                  <Text style={styles.hoursSubtext}>Dedicated support for prize winners</Text>
                </View>
              </View>

              {chatActive && !blocked && (
                <View style={styles.chatWindow}>
                  <LinearGradient
                    colors={['#3B82F6', '#1D4ED8']}
                    style={styles.chatHeader}
                  >
                    <Text style={styles.chatTitle}>Live Chat - Support Agent</Text>
                    <View style={styles.agentStatus}>
                      <Text style={styles.agentName}>Agent: Priya Sharma</Text>
                      <Text style={styles.onlineStatus}>● Online</Text>
                    </View>
                  </LinearGradient>

                  <View style={styles.chatMessages}>
                    <View style={styles.agentMessage}>
                      <Text style={styles.messageText}>
                        Hi! Congratulations on your lottery win! I see you've completed the payment process. 
                        Your prize is being processed and will be credited within 24 hours.
                      </Text>
                      <Text style={styles.messageTime}>Just now</Text>
                    </View>

                    <View style={styles.userMessage}>
                      <Text style={styles.userMessageText}>
                        Thank you! When exactly will I receive my ₹10 lakh?
                      </Text>
                      <Text style={styles.messageTime}>Just now</Text>
                    </View>

                    <View style={styles.agentMessage}>
                      <Text style={styles.messageText}>
                        Processing... Please wait...
                      </Text>
                      <Text style={styles.messageTime}>Just now</Text>
                    </View>
                  </View>

                  <View style={styles.chatInput}>
                    <TextInput
                      style={styles.messageInput}
                      placeholder="Type your message..."
                      placeholderTextColor="#9CA3AF"
                      value={message}
                      onChangeText={setMessage}
                    />
                    <TouchableOpacity style={styles.sendButton}>
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Animated.View>
          ) : (
            <View style={styles.blockedSection}>
              <View style={styles.blockedIcon}>
                <X size={80} color="#EF4444" />
              </View>
              <Text style={styles.blockedTitle}>Support Unavailable</Text>
              <Text style={styles.blockedText}>
                All support channels are currently unavailable. Please try again later.
              </Text>
              
              <View style={styles.blockedDetails}>
                <Text style={styles.blockedItem}>📞 Phone: Number disconnected</Text>
                <Text style={styles.blockedItem}>💬 Chat: Service temporarily down</Text>
                <Text style={styles.blockedItem}>📧 Email: Mailbox full</Text>
                <Text style={styles.blockedItem}>🌐 Website: Under maintenance</Text>
              </View>

              <View style={styles.scamReveal}>
                <AlertTriangle size={28} color="#EF4444" />
                <View style={styles.scamContent}>
                  <Text style={styles.scamTitle}>🚨 Scam Complete!</Text>
                  <Text style={styles.scamText}>
                    This demonstrates the final stage of lottery scams. Once scammers receive 
                    payment, they immediately block all communication channels. Victims are left 
                    with no way to contact them or recover their money.
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.educationButton} onPress={goToEducation}>
                <LinearGradient
                  colors={['#059669', '#047857']}
                  style={styles.educationGradient}
                >
                  <Text style={styles.educationButtonText}>Learn How to Protect Yourself</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.faqSection}>
            <Text style={styles.faqTitle}>❓ Frequently Asked Questions</Text>
            
            <View style={styles.faqItem}>
              <Text style={styles.question}>Q: How long does prize processing take?</Text>
              <Text style={styles.answer}>A: Once payment is confirmed, prizes are credited within 2-24 hours.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>Q: Why do I need to pay a processing fee?</Text>
              <Text style={styles.answer}>A: Government regulations require tax compliance and verification fees.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>Q: Is my personal information safe?</Text>
              <Text style={styles.answer}>A: Yes, we use bank-level encryption to protect your data.</Text>
            </View>

            <Text style={styles.faqWarning}>
              ⚠️ These are standard scammer responses designed to sound legitimate
            </Text>
          </View>

          <View style={styles.testimonialSection}>
            <Text style={styles.testimonialTitle}>💬 What Our Winners Say:</Text>
            
            <View style={styles.testimonial}>
              <Text style={styles.testimonialText}>
                "Support was amazing! They helped me through every step and I got my money the same day!"
              </Text>
              <Text style={styles.testimonialAuthor}>- Ravi P., Mumbai</Text>
            </View>

            <View style={styles.testimonial}>
              <Text style={styles.testimonialText}>
                "I was skeptical at first, but the support team was so professional. Highly recommended!"
              </Text>
              <Text style={styles.testimonialAuthor}>- Sunita K., Delhi</Text>
            </View>

            <Text style={styles.fakeNote}>
              ↑ All testimonials are fake and created by scammers
            </Text>
          </View>

          <View style={styles.trustBadges}>
            <Text style={styles.trustTitle}>🛡️ Trusted & Verified</Text>
            <View style={styles.badgesGrid}>
              <Text style={styles.badge}>🔒 SSL Secured</Text>
              <Text style={styles.badge}>✅ Government Licensed</Text>
              <Text style={styles.badge}>🏆 Award Winning Support</Text>
              <Text style={styles.badge}>💯 100% Satisfaction</Text>
            </View>
            <Text style={styles.trustWarning}>
              ⚠️ Fake trust badges used to appear legitimate
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    borderRadius: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#DBEAFE',
    textAlign: 'center',
    fontWeight: '500',
  },
  supportOptions: {
    gap: 20,
    marginBottom: 24,
  },
  supportOption: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  optionGradient: {
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  statusOnline: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  hoursCard: {
    backgroundColor: 'rgba(236, 253, 245, 0.95)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  hoursContent: {
    flex: 1,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  hoursText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
    marginBottom: 2,
  },
  hoursSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  chatWindow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  chatHeader: {
    padding: 20,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  agentStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agentName: {
    fontSize: 14,
    color: '#DBEAFE',
  },
  onlineStatus: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
  chatMessages: {
    padding: 20,
    minHeight: 200,
  },
  agentMessage: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  userMessage: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  messageText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  userMessageText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 8,
  },
  chatInput: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  blockedSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  blockedIcon: {
    backgroundColor: '#FEE2E2',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  blockedTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 12,
  },
  blockedText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  blockedDetails: {
    width: '100%',
    backgroundColor: '#FEE2E2',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  blockedItem: {
    fontSize: 14,
    color: '#DC2626',
    marginBottom: 8,
    fontWeight: '500',
  },
  scamReveal: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    marginBottom: 24,
  },
  scamContent: {
    flex: 1,
    marginLeft: 16,
  },
  scamTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 8,
  },
  scamText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  educationButton: {
    borderRadius: 16,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  educationGradient: {
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  educationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  faqSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6,
  },
  answer: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  faqWarning: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
  testimonialSection: {
    backgroundColor: 'rgba(249, 250, 251, 0.95)',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
  },
  testimonialTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  testimonial: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  testimonialText: {
    fontSize: 14,
    color: '#4B5563',
    fontStyle: 'italic',
    marginBottom: 12,
    lineHeight: 20,
  },
  testimonialAuthor: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    fontWeight: '500',
  },
  fakeNote: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
    textAlign: 'center',
  },
  trustBadges: {
    backgroundColor: 'rgba(236, 253, 245, 0.95)',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  trustTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  badge: {
    fontSize: 12,
    color: '#059669',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: '600',
  },
  trustWarning: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
    textAlign: 'center',
  },
});