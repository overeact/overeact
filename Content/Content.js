// importa o react
import React from 'react';
// importa o scrollview
import { ScrollView } from 'react-native';
// importa os recursos do override
import withOverride from '../styler/withOverride';
// importa os recursos do tema
import withTheme from '../styler/withTheme';
// importa as constantes do expo
import Constants from 'expo-constants';

/**
 * Controla o conteúdo da aplicação
 * @param {{}} props
 */
const Content = ({styles, style, contentContainerStyle, children, noStatusBar, ...props}) => (
  <ScrollView style={[styles.root, style]} contentContainerStyle={[styles.content, contentContainerStyle, noStatusBar && styles.statusBar]} {...props}>
    {children}
  </ScrollView>
);

/**
 * Mapeia o tema para props
 * @param {{}} theme 
 */
const mapThemeToProps = (theme, props) => ({
  styles: {
    // styles do root
    root: {
      flex: 1,
    },
    // styles do contentContainer
    content: {
      padding: props.gutter ? theme.application.padding : 0,
    },
    // styles do status bar
    statusBar: {
      paddingTop: Constants.statusBarHeight + (props.gutter ? theme.application.padding : 0),
    }
  },
});

// define o nome do componente para o tema
const componentName = 'Content';

// exporta o componente conectado com o tema
export default withOverride(componentName)(withTheme(mapThemeToProps, componentName)(Content));