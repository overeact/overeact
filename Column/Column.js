// importa o react
import React from 'react';
// importa os recursos do react-native
import { View } from 'react-native';
// importa os recursos do tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';

/**
 * Componente que funciona como uma coluna da linha
 */
class Column extends React.Component {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, style, children } = this.props;
    console.log(styles)
    // retorna o componente
    return (
      <View style={[styles.root, style]}>
        {children}
      </View>
    );
  };
}

// define as props padrão
Column.defaultProps = {
  // define o alinhamento
  align: 'flex-start',
  // define a justificação dos items
  justify: 'center',
};

/**
 * Mapeia o tema para props
 * @param {{}} _ 
 * @param {{}} props 
 */
const mapThemeToProps = (_, props) => {
  // define as variantes do style
  let variant = {};
  // se for para a esquerda
  if(props.left) {
    // define que deve alinhar-se a esquerda
    variant = {
      // alinha-se a esquerda da row
      alignSelf: 'flex-start',
      // tira o flex
      flex: null,
    };
  } else if (props.center) {
    // define que deve alinhar-se ao centro
    variant = {
      // alinha-se ao centro da row
      alignSelf: 'center',
      // tira o flex
      flex: null,
    };
  } else if (props.right) {
    // define que deve alinhar-se a direita
    variant = {
      // alinha-se a direita da row
      alignSelf: 'flex-end',
      // tira o flex
      flex: null,
    };
  } else if (props.fill) {
    // define que deve preencher todo o espaço da row
    variant = {
      // tira o flex
      flex: 1,
    };
  } else if (props.flex) {
    // define que deve preencher o espaço definido
    variant = {
      // tira o flex
      flex: props.flex,
    };
  }
  // retorna as props
  return {
    // define os styles do componente
    styles: {
      // define o style do container
      root: {
        // define que é uma linha
        flexDirection: 'column',
        // define que é para alinhar sempre ao centro
        alignItems: props.align,
        // define como justificar os itens
        justifyContent: props.justify,
        // coleta os styles variantes
        ...variant,
      },
    },
  };
};

// define o nome do componente no tema
const componentName = 'Column';

// exporta o componente conectado
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Column));