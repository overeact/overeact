// importa o react
import React from 'react';
// importa os recursos do react-native
import { Platform, View } from 'react-native';
// importa as constantes do expo
import Constants from 'expo-constants';
// importa os recursos de override
import withOverride from '../styler/withOverride';
// importa os recursos de tema
import withTheme from '../styler/withTheme';

/**
 * Componente da header da tela
 */
class Header extends React.PureComponent {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles } = this.props;
    // retorna o componente
    return (
      <View style={styles.root}>
        
      </View>
    )
  };
}

const mapThemeToProps = (theme, props) => ({
  // define os styles do componente
  styles: {
    // styles do container
    root: {
      flexDirection: 'row',
      height: Constants.statusBarHeight + 55,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: props.color === 'primary' ? theme.application.primary : (props.color || '#fff'),
      borderBottomWidth: Platform.select({ios: 1, android: 0}),
      borderBottomColor: '#ddd',
      elevation: 5,
    },
  },
});

const componentName = 'Header';

export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Header));