
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const MessageList = ({ messages = [] }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const renderMessage = ({ item, index }) => {
    const isUser = item.sender === 'user';
    const isLast = index === messages.length - 1;

    return (
      <View style={[
        styles.messageContainer,
        isUser ? styles.userMessage : styles.botMessage,
        { backgroundColor: isUser ? colors.primary : colors.surface },
        isLast && styles.lastMessage
      ]}>
        <Text style={[
          styles.messageText,
          { color: isUser ? colors.card : colors.text }
        ]}>
          {item.text}
        </Text>
        {item.timestamp && (
          <Text style={[
            styles.timestamp,
            { color: isUser ? colors.card : colors.icon }
          ]}>
            {item.timestamp}
          </Text>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderMessage}
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
  },
  messageContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: BorderRadius.sm,
  },
  botMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: BorderRadius.sm,
  },
  lastMessage: {
    marginBottom: Spacing.lg,
  },
  messageText: {
    ...Typography.body,
    lineHeight: 20,
  },
  timestamp: {
    ...Typography.small,
    marginTop: Spacing.xs,
    opacity: 0.7,
  },
});

export default MessageList;
