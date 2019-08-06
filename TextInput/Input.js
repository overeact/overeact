// importa o react
import React from 'react';
// importa os recursos do react-native
import { View, TextInput } from 'react-native';
// importa os recursos de tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';
// importa o clear button
import ClearButton from './ClearButton';

/**
 * O verdadeiro input da textfield
 */
class Input extends React.PureComponent {
  // define o state
  state = {
    // define o valor do input
    value: '',
  };
  // define as props padrão do componente
  static defaultProps = {
    // por padrão, sempre dá para limpar o campo
    allowClear: true,
  };
  /**
   * Mapeia o state com base
   */
  static getDerivedStateFromProps = ({value}, state) => {
    // retorna o state
    return {
      // valor do input
      value: typeof value !== 'undefined' ? value : state.value,
    };
  };
  /**
   * Roda toda vez que o texto do input muda
   */
  _handleTextChange = value => {
    // coleta as props
    const { onChangeText } = this.props;
    // limpa o valor do campo
    this.setState({ value }, () => onChangeText && onChangeText(value));
  };
  /**
   * Roda para limpar o campo
   */
  _handleClear = () => {
    // coleta as props
    const { onChangeText } = this.props;
    // limpa o valor do campo
    this.setState({ value: '' }, () => onChangeText && onChangeText(''));
  };
  /**
   * Renderiza o componente
   */
  render = () => {
    // coleta as props
    const { styles, style, allowClear, startAdornment, endAdornment, focused, ...props } = this.props;
    // coleta o state
    const { value } = this.state;
    // retorna o componente
    return (
      <View style={[styles.root, focused ? styles.focused : null]}>
        {startAdornment && React.cloneElement(React.Children.only(startAdornment), { width: 40 })}
        <TextInput 
          style={[styles.input, style]} 
          {...props} 
          value={value} 
          onChangeText={this._handleTextChange}
        />
        <ClearButton value={value} allowClear={allowClear} onClear={this._handleClear} />
        {endAdornment && React.cloneElement(React.Children.only(endAdornment), { width: 40 })}
      </View>
    );
  };
}

/**
 * Mapeia o tema para props
 */
const mapThemeToProps = (theme, props) => {
  // retorna as props
  return {
    // define os styles do componente
    styles: {
      // styles do container
      root: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor: '#ddd',
        overflow: 'hidden',
        alignItems: 'center',
        paddingHorizontal: 5,
      },
      // styles quando input está focado
      focused: {
        borderColor: theme.application.primary,
      },
      // styles do input
      input: {
        flex: 1,
        paddingVertical: 10,
      },
    },
  }
};

// define o nome do componente
const componentName = 'Input';

// exporta o componente com tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Input));