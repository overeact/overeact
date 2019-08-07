import React from 'react';
import { Platform, View } from 'react-native';
import withOverride from '../styler/withOverride';
import withTheme from '../styler/withTheme';

/**
 * Componente para destacar algo
 */
class Paper extends React.PureComponent {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, style, elevation, children } = this.props;
    // retorna o componente
    return (
      <View style={[styles.root, style, typeof elevation !== 'undefined' ? { elevation } : null]}>
        {children}
      </View>
    );
  };
}

/**
 * Mapeia o tema para props
 */
const mapThemeToProps = () => ({
  // styles do componente
  styles: {
    // define os styles
    root: {
      backgroundColor: '#fff',
      padding: 10,
      elevation: 3,
      borderWidth: Platform.select({ios: 1, android: 0}),
      borderRadius: Platform.select({ios: 1, android: 5}),
      borderColor: '#ddd',
    },
  },
});

// define o nome do componente
const componentName = 'Paper';

// exporta o componente conectado com o tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Paper));