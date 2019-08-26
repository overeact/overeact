// importa o react
import React from 'react';
// importa os recursos do react-native
import { View, Text, Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
// importa os recursos de tema
import withTheme from '../styler/withTheme';
// importa os recursos de override
import withOverride from '../styler/withOverride';
// importa o icone
import Icon from '../Icon';

// define o touchable para o botão do checkbox
const Touchable = Platform.select({ios: TouchableOpacity, android: TouchableNativeFeedback});

/**
 * Componente funcional de label
 * @param {{children}} props
 */
const Label = ({style, children}) => {
  // se não tiver conteúdo
  if(!children) {
    // retorna vazio
    return null;
  }
  // retorna o componente
  return <Text style={style}>{children}</Text>;
};

/**
 * Componente que controla uma checkbox
 */
class CheckBox extends React.Component {
  // define o state
  state = {
    // define se está ou não checada
    checked: false,
  };
  /**
   * Roda para inverter se está ou não checada
   */
  _toggleCheck = () => {
    // coleta o checked já invertido
    const checked = !this.state.checked;
    // atribui o novo state
    this.setState({checked}, () => {
      // se tiver o evento
      if(this.props.onChangeCheck) {
        // então chama
        this.props.onChangeCheck(checked);
      }
    });
  };
  /**
   * Define se deve ou não re-renderizar
   */
  shouldComponentUpdate = (nextProps) => {
    // renderiza somente se o checked for diferente
    return this.state.checked != nextProps.checked;
  };
  /**
   * Renderiza o componente
   */
  render = () => {
    // importa os styles do componente
    const { styles, icon, label } = this.props;
    // coleta se está checado
    const { checked } = this.state;
    // retorna o componente
    return (
      <TouchableWithoutFeedback onPress={this._toggleCheck}>
        <View style={styles.root}>
          <View style={styles.container}>
            <Touchable onPress={this._toggleCheck}>
              <View style={styles.check}>
                {checked && (icon || <Icon name="check" type="MaterialIcons" />)}
              </View>
            </Touchable>
          </View>
          <Label style={styles.label}>{label}</Label>
        </View>
      </TouchableWithoutFeedback>
    );
  };
}

/**
 * Função que retorna o state com base nas props
 */
CheckBox.getDerivedStateFromProps = (props, state) => ({
  // se tiver a props checked então ela vale
  checked: typeof props.checked !== 'undefined' ? props.checked : state.checked,
});

/**
 * Permite mapear props para o componente facilitando um tema
 * @param {{}} theme configurações do tema da aplicação
 */
const mapThemeToProps = theme => ({
  // mapeia os styles para props
  styles: {
    // styles do icone em si
    root: {
      // define que é uma linha
      flexDirection: 'row',
      // alinha os itens ao centro
      alignItems: 'center',
    },
    // styles do container do check
    container: {
      // define a cor da borda do checkbox
      borderColor: theme.application.primary,
      // define o radio da borda
      borderRadius: 5,
      // define o tamanho da borda
      borderWidth: 2,
      // define o overflow
      overflow: 'hidden',
    },
    // styles do container do check
    check: {
      // define a largura
      width: 30,
      // define a altura
      height: 30,
      // define a cor de fun do checkbox
      backgroundColor: '#fff',
      // alinha os filhos ao centro
      alignItems: 'center',
      // justifica os filhos ao centro
      justifyContent: 'center',
    },
    // styles da label
    label: {
      // define o texto como flex inteiro
      flex: 1,
      // tamanho da fonte
      fontSize: 15,
      // cor do texto
      color: '#444',
      // padding horizontal
      paddingHorizontal: 10,
    },
  },
});

// define o nome do componente
const componentName = 'CheckBox';

// exporta o componente conectado com os estilos
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(CheckBox));