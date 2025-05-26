import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

export default function TabLayout() {

  return (
    <SQLiteProvider databaseName='luckydraw.db' assetSource={{ assetId: require('./assets/db/luckydraw.db') }}>
      <Main></Main>
    </SQLiteProvider>
  );
}

export function Main() {
  const colorScheme = useColorScheme();

  const db = useSQLiteContext();
  console.log('sqlite version', db.databasePath);
  try {
    const userPreferencesQuery = `CREATE TABLE IF NOT EXISTS UserPreferences (id INTEGER DEFAULT 1, colorPreference TEXT, languagePreference TEXT, PRIMARY KEY(id))`;
    const contactsQuery = `CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, email TEXT)`;
    db.execAsync(userPreferencesQuery);
    db.execAsync(contactsQuery);

    console.log('Database and tables created successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="info.circle.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}