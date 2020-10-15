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
          { text: 'frontend-road', link: '/fe/'},
          { text: '移动端兼容性', link: '/fe/snippet'},
          { text: '前端组件化', link: '/fe/component'},
          { text: '前端工程化', link: '/fe/engineering'},
          { text: '前端模块化', link: '/fe/module'},
          { text: '性能优化', link: '/fe/performance'},
          { text: 'CLI', link: '/fe/cli'},
          { text: 'React', link: '/fe/react'},
        ]
      },
      { text: 'Node.js', link: '/nodejs'},
      { text: 'Java', link: '/java/' },
      { text: 'PHP', link: '/php/' },
      { text: 'Python', link: '/python/' },
      { text: 'HTTP', link: '/http/' },
      {
        text: 'ALG',
        items: [
          { text: '复杂度分析（上）', link: '/alg/复杂度分析（上）' },
          { text: '复杂度分析（下）', link: '/alg/复杂度分析（下）' },
        ]
      },
      { text: '其他', items: [
        { text: 'Git', link: '/other/git' },
          { text: 'Linux', link: '/other/linux' },
          { text: 'Shell', link: '/other/shell' },
          { text: 'CentOS', link: '/other/centos' },
          { text: 'MySQL', link: '/other/mysql' },
        ]
      },
      { text: 'movie', link: '/movie' },
      { text: 'GitHub', link: 'https://github.com/stupidsongshu' },
      // {
      //   text: 'Languages',
      //   ariaLabel: 'Language Menu',
      //   items: [
      //     { text: 'Group1', items: [
      //         { text: 'Chinese', link: '/language/chinese/' },
      //         { text: 'English', link: '/language/english/' },
      //       ]
      //     },
      //     { text: 'Group2', items: [
      //       { text: 'Japanese', link: '/language/chinese/' },
      //       { text: 'France', link: '/language/english/' },
      //     ]
      //   }
      //   ]
      // },
    ],

    // 侧边栏
    sidebarDepth: 0,
    sidebar: [
      // '/guide/',
      // '/guide/page-a',
      // ['/guide/page-b', 'Explicit link text'],
      // {
      //   title: 'page-c',
      //   path: '/guide/page-c',
      //   // collapsable: false,
      //   sidebarDepth: 2,
      //   children: [
      //     '/guide/page-c',
      //     '/',
      //   ]
      // },

      {
        title: 'FrontEnd',
        path: '/fe',
        children: [
          // {
          //   title: 'Home',
          //   path: '/fe/'
          // },
          // {
          //   title: '移动端兼容性',
          //   path: '/fe/snippet'
          // },
          '/fe/',
          '/fe/snippet',
          '/fe/component',
          '/fe/engineering',
          '/fe/module',
          '/fe/performance',
          '/fe/cli',
          '/fe/react',
        ]
      },
      {
        title: 'Node.js',
        path: '/nodejs/'
      },
      {
        title: 'Java',
        path: '/java/'
      },
      {
        title: 'PHP',
        path: '/php/'
      },
      {
        title: 'Python',
        path: '/python/'
      },
      {
        title: 'HTTP',
        path: '/http/'
      },
      {
        title: '其他',
        children: [
          '/other/git',
          '/other/linux',
          '/other/shell',
          '/other/centos',
          {
            title: 'MySQL',
            path: '/other/mysql',
          }
        ]
      },
      '/movie',
    ],
    displayAllHeaders: false
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