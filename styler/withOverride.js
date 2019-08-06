// importa o react
import React from 'react';
// importa os recursos de merjar objetos
import deepMerge from 'deepmerge';

// define o contexto dos overrides
const OverrideContext = React.createContext({});

/**
 * Coleta o nome do componente
 * @param {{}} WrappedComponent Componente decorado
 */
const getDisplayName = (WrappedComponent) => (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
);

/**
 * Componente que provê os recursos globalmente
 */
export class OverrideProvider extends React.PureComponent {
  // define as props padrão
  static defaultProps = {
    // define o objeto do override caso não tenha um
    override: {},
  };
  /**
   * Renderiza o provider
   */
  render = () => {
    // retorna o provider com seus filhos
    return (
      <OverrideContext.Provider value={this.props.override}>
        {this.props.children}
      </OverrideContext.Provider>
    );
  };
}

/**
 * Função que decora o componente com os overrides do componente pai
 */
export default (componentName) => Component => {
  // retorna a classe com o componente decorado
  return class WithOverride extends React.Component {
    // define qual é o contexto a ser usado
    static contextType = OverrideContext;
    // define o nome do componente
    static displayName = `WithOverride(${getDisplayName(Component)})`;
    /**
     * Efetua a decoração das props
     */
    _decorateProps = () => {
      // coleta as props copiadas
      const { ...props } = this.props;
      // retorna as props decoradas
      return [ this.context[componentName], props ].reduce((prev, next) => {
        // se as props não estiverem definidas
        if(!next) {
          // retorna o atual
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
  }
}