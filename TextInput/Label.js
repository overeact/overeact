// importa o react
import React from 'react';
// importa os recursos do react-native
import { View, Text } from 'react-native';
// importa os recursos de tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';

/**
 * Label de um input
 */
class Label extends React.PureComponent {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, style, children, required, startAdornment, endAdornment } = this.props;
    // se não tiver texto no label
    if(!children) {
      // retorna vazio
      return null;
    }
    // retorna o componente
    return (
      <View style={styles.root}>
        {startAdornment && React.cloneElement(React.Children.only(startAdornment), { width: 40 })}
        <Text style={[styles.text, style]}>
          {children}
        </Text>
        {required && <Text style={styles.required}>*</Text>}
        {endAdornment && React.cloneElement(React.Children.only(endAdornment), { width: 40 })}
      </View>
    );
  };
}

/**
 * Mapeia o tema para props
 */
const mapThemeToProps = theme => ({
  // define os styles do componente
  styles: {
    // styles da root
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 4,
    },
    // styles do texto
    text: {
      fontSize: 16,
      fontWeight: '500',
    },
    // define o styles do identificador de obrigatório
    required: {
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 5,
      color: theme.application.primary,
    },
  },
});

// define o nome do componente
const componentName = 'Label';

// exporta o componente com tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Label));