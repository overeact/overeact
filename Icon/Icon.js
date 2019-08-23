// importa o react
import React from 'react';
// importa os icones do expo
import * as Icons from '@expo/vector-icons';
// importa o wrapper para coletar styles e props do tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';

/**
 * Componente básico para mostrar icone
 */
class Icon extends React.Component {
  /**
   * Coleta qual o tipo do icone usar
   */
  _getIconType = () => {
    // coleta as props
    const { type } = this.props;
    // retorna os icones
    return Icons[type];
  };
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta os styles
    const { style, styles, size, color } = this.props;
    // coleta o componente com base no tipo
    const IconComponent = this._getIconType();
    // define o tamanho do icone
    const fontSize = size ? { fontSize: size } : null;
    // define o tamanho do icone
    const _color = color ? { color: color } : null;
    // retorna o componente
    return <IconComponent style={[styles.root, fontSize, _color, style]} name={this.props.name} />
  };
}

// define as props padrão do icone
Icon.defaultProps = {
  // tipo do componente padrão
  type: 'MaterialIcons',
};

/**
 * Permite mapear props para o componente facilitando um tema
 * @param {{}} theme configurações do tema da aplicação
 */
const mapThemeToProps = theme => ({
  // define qual é o tipo de icone padrão usado pelo tema
  type: theme.application.defaultIconType,
  // define o tamanho padrão do icone
  size: 15,
  // mapeia os styles para props
  styles: {
    // styles do icone em si
    root: {
      // define a cor padrão do icone
      color: theme.application.primary,
    },
  },
});

// define o nome do componente
const componentName = 'Icon';

// exporta o componente conectado com os estilos
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Icon));