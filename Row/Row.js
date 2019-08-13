// importa o react
import React from 'react';
// importa os recursos do react-native
import { View } from 'react-native';
// importa os recursos do tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';

/**
 * Componente que funciona como uma linha
 */
class Row extends React.Component {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, style, children } = this.props;
    // retorna o componente
    return (
      <View style={[styles.root, style]}>
        {children}
      </View>
    );
  };
}

// define as props padrão
Row.defaultProps = {
  // define o alinhamento
  align: 'center',
};

/**
 * Mapeia o tema para props
 * @param {{}} _ 
 * @param {{}} props 
 */
const mapThemeToProps = (_, props) => ({
  // define os styles do componente
  styles: {
    // define o style do container
    root: {
      // sempre full width
      width: '100%',
      // sempre full width
      flex: 1,
      // quebra a linha
      flexWrap: 'wrap',
      // define que é uma linha
      flexDirection: 'row',
      // define que é para alinhar sempre ao centro
      alignItems: props.align,
      // define como justificar os itens
      justifyContent: props.justify,
    },
  },
});

// define o nome do componente no tema
const componentName = 'Row';

// exporta o componente conectado
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Row));