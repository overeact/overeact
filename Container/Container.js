// importa o react
import React from 'react';
// importa os recursos do react-native
import { KeyboardAvoidingView } from 'react-native';
// importa o provider de override
import withOverride, { OverrideProvider } from '../styler/withOverride';
// importa os recursos do tema
import withTheme from '../styler/withTheme';
/**
 * Componente que contém uma tela
 */
class Container extends React.PureComponent {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, override, style, children } = this.props;
    // retorna o componente
    return (
      <OverrideProvider override={override}>
        <KeyboardAvoidingView style={[styles.root, style]} behavior="padding" enabled>
          {children}
        </KeyboardAvoidingView>
      </OverrideProvider>
    );
  };
}

/**
 * Mapeia o tema para props
 * @param {{}} theme configurações do tema
 */
const mapThemeToProps = theme => ({
  // define os styles
  styles: {
    // define o styles do container
    root: {
      // define a posição relativa para poder posicionar absolutamente mais fácil
      position: 'relative',
      // define o background das telas que usarem
      backgroundColor: theme.application.backgroundColor,
      // define o tamanho do container para cobrir toda a tela
      flex: 1,
    },
  },
});

// define o nome do componente para o tema
const componentName = 'Container';

// exporta o componente conectado
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Container));