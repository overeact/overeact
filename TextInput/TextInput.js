// importa o react
import React from 'react';
// importa o provider de override
import withOverride, { OverrideProvider } from '../styler/withOverride';
// importa o container do input
import InputGroup from './InputGroup';
// importa os recursos do tema
import withTheme from '../styler/withTheme';
// importa a label
import Label from './Label';
// importa o input
import Input from './Input';
// importa o helper
import Helper from './Helper';

/**
 * Componente que forma um textfield padrão
 */
class TextField extends React.PureComponent {
  // define o state
  state = {
    // define que está falso
    focused: false,
  };
  /**
   * Atualiza informando que o input está focado
   */
  _handleOnFocus = e => {
    // informa que o input está focado
    this.setState({focused: true}, () => this.props.onFocus && this.props.onFocus(e));
  };
  /**
   * Atualiza informando que o input não está mais focado
   */
  _handleOnBlur = () => {
    // informa que o input não está focado
    this.setState({focused: false}, () => this.props.onBlur && this.props.onBlur(e));
  }
  /**
   * Renderiza o componente
   */
  render = () => {
    console.log(this.props.label);
    // coleta as props
    const { override, label, helper, ..._props } = this.props;
    // copia uma props editável
    let { ...props } = _props;
    // define as props para o componente Input
    const inputGroupProps = {
      // componente a esquerda do input
      startAdornment: props.outerStartAdornment,
      // componente a direita do input
      endAdornment: props.outerEndAdornment,
    };
    // remove as props desnecessárias
    delete props.outerStartAdornment;
    delete props.outerEndAdornment;
    // define as props do label
    const labelProps = {
      // componente a esquerda do input
      startAdornment: props.labelStartAdornment,
      // define a label do input
      children: label,
      // componente a direita do input
      endAdornment: props.labelEndAdornment,
      // define se o input é ou não obrigatório
      required: props.required,
    };
    // remove as props desnecessárias
    delete props.labelStartAdornment;
    delete props.labelEndAdornment;
    // define as props do helper
    const helperProps = {
      // define o helper do input
      children: helper,
    };
    // define as props para o componente Input
    const inputProps = {
      // componente a esquerda do input
      startAdornment: props.innerStartAdornment,
      // componente a direita do input
      endAdornment: props.innerEndAdornment,
      // roda ao focar no input
      onFocus: this._handleOnFocus,
      // roda ao desfocar do input
      onBlur: this._handleOnBlur,
      // informa se o input está focado ou não
      focused: this.state.focused,
      // coleta o resto das props
      ...props,
    };
    // remove as props desnecessárias
    delete props.innerStartAdornment;
    delete props.innerEndAdornment;
    // retorna o componente
    return (
      <OverrideProvider override={override}>
        <InputGroup {...inputGroupProps}>
          <Label {...labelProps} />
          <Input {...inputProps} />
          <Helper {...helperProps} />
        </InputGroup>
      </OverrideProvider>
    );
  };
}

// mapeia o tema para props
const mapThemeToProps = (theme, props) => {
  // define o borderRadius
  const borderRadius = props.borderRadius || theme.application.borderRadius;
  // retorna as props
  return {
    // faz o override
    override: {
      // adiciona props ao input
      Input: {
        // substitui os styles
        styles: {
          // sobrescreve o container
          root: {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          },
        },
      },
      // adiciona props a label
      Label: {
        // substitui os styles
        styles: {
          // sobrescreve o style do texto
          root: {
            paddingHorizontal: borderRadius / 2,
          },
        },
      },
      // adiciona props ao helper
      Helper: {
        // substitui os styles
        styles: {
          // sobrescreve o style do texto
          root: {
            paddingHorizontal: borderRadius / 2,
          },
        },
      },
    },
  };
};

// define o nome do componente para o tema
const componentName = 'TextField';

// exporta o componente conectado com o tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(TextField));