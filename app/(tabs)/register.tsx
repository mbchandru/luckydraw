import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { addContact } from '@/app/db/contacts';
import { connectToDatabase } from '@/app/db/db';

export default function TabTwoScreen() {

const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
    },
  })
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const db = await connectToDatabase();
      const contact = [
        'name',
        'phoneNumber',
        'email',
      ]
      addContact(db, contact);
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Register</ThemedText>
      </ThemedView>
      <ThemedText>We respect your privacy and data is not traded.{'\n'}Input mobile or email, and submit...</ThemedText>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={styles.input}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <Text style={styles.infotext}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={styles.input}
                placeholder="Mobile number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="mobile"
          />
          {errors.mobile && <Text style={styles.infotext}>This is required.</Text>}

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: 'Email is required',
              pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            }}}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={styles.input}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                defaultValue=""              
              />
              )}
            name="email"
          />
          {errors.email && <Text style={styles.infotext}>This is required.</Text>}
        <TouchableOpacity
          style={styles.submit}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'auto',
    paddingTop: 4,
    height: 35,
    fontSize: 16,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    textDecorationColor: 'white',
    paddingHorizontal: 5,
    padding: 4,
    flex: 1,
    color: '#247cc7',
  },
  submit: {
    width: 95,
    fontSize: 16,
    backgroundColor: '#247cc7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    height: 35,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    alignItems: 'center',
    alignContent: "space-around",
    padding: 4,
  },
  infotext: {
    color: '#247cc7',
    justifyContent: 'center',
    marginTop: 0,
    width: 485,
    height: 24,
    fontSize: 16,
    borderRadius: 2,
    //marginBottom: 25,
  },
});
