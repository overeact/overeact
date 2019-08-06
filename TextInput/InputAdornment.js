// importa o react
import React from 'react';
// importa os recursos do react-native
import { View } from 'react-native';
// importa os recursos de tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';

/**
 * InputAdornment de um input
 */
class InputAdornment extends React.PureComponent {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, style, children } = this.props;
    // se não tiver texto no label
    if(!children) {
      // retorna vazio
      return null;
    }
    // retorna o componente
    return (
      <View style={[styles.root, style]}>
        {children}
      </View>
    );
  };
}

/**
 * Mapeia o tema para props
 */
const mapThemeToProps = (_, props) => ({
  // define os styles do componente
  styles: {
    // styles da root
    root: {
      width: props.width,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

// define o nome do componente
const componentName = 'InputAdornment';

// exporta o componente com tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(InputAdornment));