const themeConfig = {
  app: {
    appName: 'Dunitech Project Management',
    appLogoImage: require('@src/assets/images/logo/logo.svg').default
  },
  layout: {
    isRTL: false,
    skin: 'light', 
    routerTransition: 'fadeIn',
    type: 'vertical',
    contentWidth: 'boxed',
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      type: 'floating', 
      backgroundColor: 'white' 
    },
    footer: {
      type: 'static' 
    },
    customizer: false,
    scrollTop: true 
  }
}

export default themeConfig
