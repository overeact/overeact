// importa os recursos do react
import React from 'react';
// importa os recursos do react-native
import { Platform, View } from 'react-native';
// importa os recursos de cor
import contrast from 'contrast';
// importa a base do botão
import ButtonBase from './ButtonBase';
// importa os recursos de override
import { OverrideProvider } from '../styler/withOverride';
// importa os recursos de tema
import withTheme from '../styler/withTheme';

const getContrastColor = color => {
  // se for uma cor clara, retorna texto escuro
  if(contrast(color) === 'light') {
    // retorna cor escura
    return '#444';
  } else {
    // retorna cor clara
    return '#fff';
  }
}

/**
 * Componente que é usado como botão
 */
class Button extends React.PureComponent {
  /**
   * Coleta a variante de cor
   */
  _getColorVariant = () => {
    // coleta as props
    const { styles, color } = this.props;
    // retorna o styles com base na variante de cor
    return styles[color] || styles['default'];
  };
  /**
   * Coleta a variante de cor
   */
  _getColorVariantContrast = () => {
    // coleta as props
    const { styles, color } = this.props;
    // retorna o styles com base na variante de cor
    return styles[`${color}Contrast`] || styles['defaultContrast'];
  };
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, override, children, ...props } = this.props;
    // retorna o componente
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <ButtonBase {...props}>
            <View style={styles.content}>
              <OverrideProvider override={override}>
                {children}
              </OverrideProvider>
            </View>
          </ButtonBase>
        </View>
      </View>
    );
  };
}

// define as props padrão
Button.defaultProps = {
  // define a variante de cor
  color: 'primary',
};

/**
 * Mapeia os styles do tema para styles do componente
 * @param {{}} styles do tema
 */
const mapThemeToProps = (theme, props) => {
  // define a cor de fundo do botão
  let backgroundColor = '';
  // define se o botão é ou não transparent
  let transparent = false;
  // define com base nas props a cor
  switch(props.color) {
    case 'primary':
      backgroundColor = theme.application.primary;
      break;
    case 'secondary':
      backgroundColor = theme.application.secondary;
      break;
    case 'default':
      backgroundColor = theme.application.light;
      break;
    case 'transparent':
      backgroundColor = 'transparent';
      transparent = true;
      break;
    default:
      backgroundColor = props.color;
  }
  // retorna as props
  return {
    // styles do componente
    styles: {
      // define o styles do root do botão para evitar fill
      root: {
        flexDirection: 'row',
      },
      // define o styles do container do botão
      container: {
        flexDirection: 'row',
        borderWidth: transparent ? Platform.select({ios: 1, android: 0}) : 0,
        borderRadius: theme.application.borderRadius,
        borderColor: '#ddd',
        elevation: transparent ? 0 : 3,
        overflow: 'hidden',
      },
      // styles do content do botão
      content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: backgroundColor,
      },
    },
    // passa o override
    override: {
      Icon: {
        styles: {
          root: {
            color: transparent ? theme.application.primary : getContrastColor(backgroundColor),
            marginHorizontal: 5,
          }
        }
      },
      Text: {
        uppercase: Platform.OS === 'android',
        styles: {
          root: {
            color: transparent ? theme.application.primary : getContrastColor(backgroundColor),
            fontWeight: '500',
          }
        }
      }
    },
  }
};

// exporta o componente conectado com os styles
export default withTheme(mapThemeToProps, 'Button')(Button);