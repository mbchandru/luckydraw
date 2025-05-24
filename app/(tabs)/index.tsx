import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import React, { Suspense, useEffect } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { initializeDatabase } from '../exposqlite/sqlite';

export default function HomeScreen() {

  async function getSQLiteFileList() {
    if (Platform.OS === 'web') {
        // Implement web-specific file handling here
        console.log('Web platform - using web APIs or simulated functionality');
        // Example: Display a web alert
        //alert('Web file operation simulated');
    } else {
      try {
        const filesPath = `${FileSystem.documentDirectory}SQLite/`;

        const filesDirectory = await FileSystem.readDirectoryAsync(filesPath);
        console.log(`SQLite Files:`);
        console.log(filesDirectory);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    getSQLiteFileList();
  }, []);

    return (
      <Suspense fallback={<Fallback />}>
        <SQLiteProvider databaseName="luckydraw.db" useSuspense={true}>
          <Main />
        </SQLiteProvider>
      </Suspense>
  );

}

function Fallback() {
  return <Text>Loading database...</Text>;
}

export function Main() {
  const db = useSQLiteContext();
  console.log('sqlite version', db.getFirstSync('SELECT sqlite_version()'), + 'pathi ' + db.databasePath);
  initializeDatabase();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Register</ThemedText>
        <ThemedText>
          {`Register and have a great shopping experience.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Lucky Draw</ThemedText>
        <ThemedText>
          {`Enter a lucky dip and win Prizes / Discounts.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Continue to shop...</ThemedText>
        <ThemedText>
          {`Give your feedback about our shop and your shopping experience.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
