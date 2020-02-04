module.exports = {
  base: '/blog/',
  title: 'site',
  description: 'summerycicada',
  themeConfig: {
    // 导航栏
    navbar: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'FrontEnd', items: [
          { text: '前端工程化', link: '/fe/engineering'},
          { text: '前端模块化', link: '/fe/module'},
          { text: '性能优化', link: '/fe/performance'},
          { text: 'Node.js', link: '/fe/nodejs'},
        ]
      },
      { text: 'Linux', items: [
          { text: '基本命令', link: '/linux/command' },
          { text: 'vi/vim', link: '/linux/vi&vim' },
          { text: 'CentOS', link: '/linux/centos' },
        ]
      },
      {
        text: 'Languages',
        ariaLabel: 'Language Menu',
        items: [
          { text: 'Group1', items: [
              { text: 'Chinese', link: '/language/chinese/' },
              { text: 'English', link: '/language/english/' },
            ]
          },
          { text: 'Group2', items: [
            { text: 'Japanese', link: '/language/chinese/' },
            { text: 'France', link: '/language/english/' },
          ]
        }
        ]
      },
      {
        text: 'HTTP',
        link: '/http/'
      },
      {
        text: 'ALG',
        items: [
          { text: '复杂度分析（上）', link: '/alg/复杂度分析（上）' },
          { text: '复杂度分析（下）', link: '/alg/复杂度分析（下）' },
        ]
      },
      { text: 'movie', link: '/movie' },
      { text: 'GitHub', link: 'https://github.com/stupidsongshu' },
    ],

    // 侧边栏
    sidebarDepth: 2,
    sidebar: [
      '/guide/',
      '/guide/page-a',
      ['/guide/page-b', 'Explicit link text'],
      {
        title: 'page-c',
        path: '/guide/page-c',
        // collapsable: false,
        sidebarDepth: 2,
        children: [
          '/guide/page-c',
          '/',
        ]
      },
      {
        title: 'Linux',
        children: [
          '/linux/command',
          '/linux/vi&vim',
          '/linux/centos',
        ]
      },
      '/movie',
    ],
    displayAllHeaders: true
  },
  plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
  ],
  markdown: {
    lineNumbers: true
  }
}