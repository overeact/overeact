// importa o react
import React from 'react';
// importa os recursos de merjar objetos
import deepMerge from 'deepmerge';

// define os styles do tema padrão da aplicação
const defaultTheme = {
  /**
   * DEFINE OS STYLES DA APLICAÇÃO
   */
  application: {
    // cor primária da aplicação
    primary: '#79a832',
    // contraste da cor primária
    primary_contrast: '#fff',
    // cor secundária da aplicação
    secondary: '#d66a0f',
    // contraste da cor secundária
    secondary_contrast: '#fff',
    // border radius para toda a aplicação
    borderRadius: 4,
    // define a cor de fundo da aplicação (Container)
    backgroundColor: '#fafafa',
    // define o padding da aplicação
    padding: 10,
  },
};

// inicializa o contexto
const ThemeContext = React.createContext(defaultTheme);

/**
 * Coleta o nome do componente
 * @param {{}} WrappedComponent Componente decorado
 */
const getDisplayName = (WrappedComponent) => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
);

/**
 * Efetua a criação do tema para a aplicação
 * @param {{}} options opções para preencher os dados do tema da aplicação
 * @param {Function} customize função para customizar qualquer componente conectado com o tema
 */
export const createTheme = (options, customize) => {
  // define o tema da aplicação com base no tema padrão
  const theme = {
    // coleta os dados do tema padrão
    ...defaultTheme,
    // coleta os dados do tema da aplicação
    application: {
      // coleta o tema padrão da aplicação
      ...defaultTheme.application,
      // coleta
      ...options.application,
    },
  };
  // retorna o tema
  return {
    ...theme,
    ...(typeof customize === 'function' ? customize(theme) : {}),
  };
};

/**
 * Componente que provê os recursos globalmente
 */
export class ThemeProvider extends React.PureComponent {
  /**
   * Renderiza o provider
   */
  render = () => {
    // retorna o provider com seus filhos
    return (
      <ThemeContext.Provider value={this.props.theme || defaultTheme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  };
}

/**
 * Função que decora o componente
 */
export default (themeProps = {}, componentName) => Component => {
  // retorna a classe
  return class WithTheme extends React.PureComponent {
    // define qual é o contexto a ser usado
    static contextType = ThemeContext;
    // define o nome do componente
    static displayName = `WithTheme(${getDisplayName(Component)})`;
    // define as props padrão
    static defaultProps = {
      // define os styles do componente
      styles: {},
      // coletas as default props do componente
      ...Component.defaultProps,
    };
    /**
     * Efetua a decoração das props
     */
    _decorateProps = () => {
      // coleta as props copiadas
      const { ...props } = this.props;
      // resolve as props do tema
      const resolvedProps = typeof themeProps === 'function' ? themeProps(this.context, props) : themeProps;
      // retorna as props decoradas
      return [ resolvedProps, this.context[componentName], props ].reduce((prev, next) => {
        if(!next) {
          return prev;
        }
        // para cada chave nas props do tema
        for(let key of Object.keys(next)) {
          // se as props resolvidas não tiverem a chave, adiciona sozinho
          if(!prev[key] || typeof prev[key] !== 'object' || typeof next[key] !== 'object') {
            // define a chave
            prev[key] = next[key];
            // vai para a próxima chave
            continue;
          }
          // se for um objeto
          if(typeof next[key] === 'object') {
            // passa os objetos
            prev[key] = deepMerge(prev[key], next[key]);
            // continua para a próxima chave
            continue;
          }
          // no fim das contas atribui o próximo em cima do anterior
          prev[key] = next[key];
        }
        // retorna o resultado
        return prev;
      }, {});
    };
    /**
     * Renderiza o componente decorado
     */
    render = () => {
      // efetua a decoração das props
      const decoratedProps = this._decorateProps();
      // retorna o componente decorado
      return (
        <Component {...decoratedProps} />
      );
    };
  };
};