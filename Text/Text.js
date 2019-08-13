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
class Text extends React.PureComponent {
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

Text.defaultProps = {
  align: 'left',
};

/**
 * mapeia os styles do tema para os styles do componente
 * @param {{}} styles do tema
 */
const mapThemeToProps = (_, props) => {
  // define as variantes
  let variants = {};
  // se for para preencher todo o container
  if(props.fill) {
    // define os styles
    variants = {
      // 100% do container
      flex: 1,
      // 100% do container
      width: '100%',
    };
  }
  // retorna as props
  return {
    styles: {
      // styles do texto
      root: {
        fontSize: 15,
        color: '#444',
        textAlign: props.align,
        ...variants,
      },
    },
  };
};

const componentName = 'Text';

// exporta o componente conectado com os estilos
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Text));