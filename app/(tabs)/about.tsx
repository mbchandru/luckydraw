import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export default function AboutScreen() {
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
        <ThemedText type="title">⋆♡ℓυ¢ку🧡∂ιρ♡⋆</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          {`App - Android, IOS & Web`}
        </ThemedText>
                <ThemedText>
          {`by`}
        </ThemedText>
                <ThemedText>
          {`Chandru, React Native Developer, India.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    //flexDirection: 'row',
    paddingBottom: 25,
    fontSize: 12,
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    //height: '100%',
    marginBottom: 8,
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    paddingTop: 15,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
});
