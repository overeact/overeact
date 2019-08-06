// importa os recursos do react-native
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

// exporta o touchable de acordo com a plataforma
export default Platform.select({ios: TouchableOpacity, android: TouchableNativeFeedback});