// importa o react
import React from 'react';
// importa os recursos do react-native
import { View } from 'react-native';
// importa os recursos de tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';

/**
 * Container de um input
 */
class InputGroup extends React.PureComponent {
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, style, children } = this.props;
    // coleta o startAdornment
    const startAdornment = this.props.startAdornment ? React.Children.only(this.props.startAdornment) : null;
    // coleta o endAdornment
    const endAdornment = this.props.endAdornment ? React.Children.only(this.props.endAdornment) : null;
    // retorna o componente
    return (
      <View style={[styles.root, style]}>
        {startAdornment && React.cloneElement(startAdornment, { width: startAdornment.props.width || 40 })}
        <View style={styles.content}>
          {children}
        </View>
        {endAdornment && React.cloneElement(endAdornment, { width: endAdornment.props.width || 40 })}
      </View>
    );
  };
}

/**
 * Mapeia o tema para props
 */
const mapThemeToProps = () => ({
  // define os styles do componente
  styles: {
    // styles do root do componete
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    // styles do conteúdo
    content: {
      flex: 1,
    },
  },
});

// define o nome do componente
const componentName = 'InputGroup';

// exporta o componente com tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(InputGroup));