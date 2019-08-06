// importa o react
import React from 'react';
// importa os recursos do react-native
import { View } from 'react-native';
// importa os recursos de tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';
// importa o icone
import Icon from '../Icon/Icon';
// importa a base do touchable
import ButtonBase from '../Button/ButtonBase';
// importa o input adornment
import InputAdornment from './InputAdornment';


/**
 * Botão que limpa os valores do input
 * @param {{value, allowClear, onClear}} props
 */
class ClearButton extends React.Component {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, value, allowClear, onClear } = this.props;
    // se não for pra ter o botão
    if(!allowClear || !value) {
      // retorna vazio
      return null;
    }
    // retorna o componente
    return (
      <InputAdornment width={40}>
        <View style={styles.root}>
          <ButtonBase onPress={onClear}>
            <View style={styles.content}>
              <Icon name="clear" size={15} style={styles.icon} />
            </View>
          </ButtonBase>
        </View>
      </InputAdornment>
    );
  };
};

/**
 * Mapeia o tema para props
 */
const mapThemeToProps = () => ({
  // define os styles do componente
  styles: {
    // styles do container do componente
    root: {
      flexDirection: 'row', 
      borderRadius: 15, 
      overflow: 'hidden',
    },
    // styles do conteúdo do componente
    content: {
      width: 20, 
      height: 20, 
      alignItems: 'center', 
      justifyContent: 'center',
    },
    // styles do icone
    icon: {
      color: '#444',
    },
  },
});

const componentName = 'ClearButton';

// exporta o componente conectado com o tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(ClearButton));