// importa o react
import React from 'react';
// importa os recursos do react-native
import { Text as RNText } from 'react-native';
// importa o wrapper para coletar styles do pai
import withOverride from '../styler/withOverride';
// importa o wrapper para coletar os styles do tema
import withTheme from '../styler/withTheme';
/**
 * Componente básico para mostrar texto
 */
class Text extends React.Component {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta os styles
    const { style, styles, uppercase } = this.props;
    // retorna o componente
    return <RNText style={[styles.root, style]}>{uppercase ? String(this.props.children).toUpperCase() : this.props.children}</RNText>
  };
}

/**
 * mapeia os styles do tema para os styles do componente
 * @param {{}} styles do tema
 */
const mapThemeToProps = () => ({
  styles: {
    // styles do texto
    root: {
      fontSize: 15,
      color: '#444',
    },
  }
});

const componentName = 'Text';

// exporta o componente conectado com os estilos
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Text));