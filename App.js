import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TextInput,
  Pressable,
  Image,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import { useState } from 'react';

const ANDROID_BACKGROUND_COLOR = '#FFFFE0';
const IOS_BACKGROUND_COLOR = '#B0E0E6';

export default function App() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [enteredFeedback, setEnteredFeedback] = useState('');
  const [feedbackCollection, setFeedbackCollection] = useState([]);

  function feedbackInputHandler(enteredText) {
    setEnteredFeedback(enteredText);
  }

  function addFeedbacHandler() {
    if (enteredFeedback.trim() == '') return;

    setFeedbackCollection((curFeedbackCollection) => [
      ...curFeedbackCollection,
      enteredFeedback,
    ]);
    setEnteredFeedback('');
  }

  const menu = (
    <>
      <Pressable onPress={() => Alert.alert('Go to Home!')}>
        <Text style={styles.headerItem}>Home</Text>
      </Pressable>
      <Pressable onPress={() => Alert.alert('Go to Catalog!')}>
        <Text style={styles.headerItem}>Catalog</Text>
      </Pressable>
      <Pressable onPress={() => Alert.alert('Go to Order!')}>
        <Text style={styles.headerItem}>Order</Text>
      </Pressable>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={[
        styles.appContainer,
        isLandscape && styles.appContainerLandscape,
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {isLandscape ? (
        <View style={styles.sidebar}>
          <View>{menu}</View>
          <Image
            source={require('./assets/Feedback_Icon.png')}
            style={styles.sidebarImage}
          />
        </View>
      ) : (
        <View style={styles.header}>{menu}</View>
      )}

      <View style={[styles.main, isLandscape && styles.mainLandscape]}>
        <Text style={styles.headerText}>Feedback form</Text>

        <View
          style={[
            styles.inputContainer,
            isLandscape && styles.inputContainerLandscape,
          ]}
        >
          <TextInput
            editable
            multiline
            numberOfLines={6}
            maxLength={500}
            style={[styles.textInput, isLandscape && styles.textInputLandscape]}
            placeholder="Enter your comment"
            onChangeText={feedbackInputHandler}
            value={enteredFeedback}
          />
          <Pressable
            style={[styles.button, isLandscape && styles.buttonLandscape]}
            onPress={addFeedbacHandler}
          >
            <Text style={styles.buttonText}>Add feedback</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        >
          {feedbackCollection.map((feedback, index) => (
            <Pressable key={index}>
              <Text style={styles.feedbackItem}>{feedback}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: Platform.select({
      android: ANDROID_BACKGROUND_COLOR,
      ios: IOS_BACKGROUND_COLOR,
    }),
  },
  appContainerLandscape: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#D8BFD8',
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
  sidebar: {
    width: 130,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#D8BFD8',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
  },
  sidebarImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 30,
  },
  main: {
    flex: 1,
  },
  mainLandscape: {
    paddingHorizontal: 16,
  },
  headerItem: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00008B',
    marginBottom: 6,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00008B',
    marginTop: 15,
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
    paddingBottom: 28,
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#DDA0DD',
  },
  inputContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 12,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    width: '90%',
    height: 150,
    fontSize: 18,
    padding: 8,
    textAlignVertical: 'top',
  },
  textInputLandscape: {
    width: '60%',
    height: 90,
  },
  button: {
    width: '90%',
    height: 50,
    borderWidth: 2,
    marginTop: 20,
    backgroundColor: '#DDA0DD',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonLandscape: {
    width: 160,
    marginTop: 0,
    marginLeft: 16,
  },
  buttonText: {
    height: 30,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00008B',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  feedbackItem: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#E6E6FA',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});