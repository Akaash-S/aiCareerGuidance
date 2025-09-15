
import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import MessageList from '../../components/MessageList';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your AI Career Mentor. How can I help you with your career journey today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const userMessage = {
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const responses = [
      "That's a great question! Based on your profile, I'd recommend focusing on practical projects to build your portfolio.",
      "I understand your concern. Let me suggest some resources that might help you advance in that area.",
      "Excellent point! Have you considered exploring related fields that might complement your current skills?",
      "That's a common challenge many professionals face. Here are some strategies that have worked well for others...",
      "Based on current market trends, I'd suggest focusing on these key areas for career growth...",
      "I'd be happy to help you create a personalized learning path for that skill set.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "What skills should I learn?",
    "Career path suggestions",
    "Interview tips",
    "Salary negotiation"
  ];

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AI Career Mentor</Text>
        <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
          Your intelligent career advisor
        </Text>
      </View>

      <MessageList messages={messages} />

      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={[styles.typingText, { color: colors.icon }]}>
            AI is typing...
          </Text>
        </View>
      )}

      {messages.length === 1 && (
        <View style={styles.quickQuestionsContainer}>
          <Text style={[styles.quickQuestionsTitle, { color: colors.text }]}>
            Quick Questions:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickQuestion, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setInputText(question)}
              >
                <Text style={[styles.quickQuestionText, { color: colors.text }]}>
                  {question}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <TextInput
          style={[styles.textInput, { color: colors.text }]}
          placeholder="Type your question..."
          placeholderTextColor={colors.icon}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, { backgroundColor: colors.primary }]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isTyping}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.caption,
    opacity: 0.8,
  },
  typingIndicator: {
    padding: Spacing.md,
    alignItems: 'center',
  },
  typingText: {
    ...Typography.caption,
    fontStyle: 'italic',
  },
  quickQuestionsContainer: {
    padding: Spacing.md,
  },
  quickQuestionsTitle: {
    ...Typography.caption,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  quickQuestion: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
  quickQuestionText: {
    ...Typography.small,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: Spacing.md,
    borderTopWidth: 1,
    minHeight: 60,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginRight: Spacing.sm,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
  },
  sendButtonText: {
    ...Typography.caption,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ChatBotScreen;
