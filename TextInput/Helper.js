// importa o react
import React from 'react';
// importa os recursos do react-native
import { Text } from 'react-native';
// importa os recursos de tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';

/**
 * Helper de um input
 */
class Helper extends React.PureComponent {
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
      <Text style={[styles.root, style]}>
        {children}
      </Text>
    );
  };
}

/**
 * Mapeia o tema para props
 */
const mapThemeToProps = () => ({
  // define os styles do componente
  styles: {
    // styles do container
    root: {
      paddingTop: 5,
      fontSize: 14,
      color: '#444',
    },
  },
});

// define o nome do componente
const componentName = 'Helper';

// exporta o componente com tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Helper));