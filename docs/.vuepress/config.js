module.exports = {
  base: '/blog/',
  title: 'Blog',
  description: 'summerycicada',
  lastUpdated: 'Last Updated',
  themeConfig: {
    // 导航栏
    navbar: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'FrontEnd', items: [
          { text: 'frontend-road', link: '/fe/'},
          { text: 'Vue', link: '/fe/vue'},
          { text: 'React', link: '/fe/react'},
          { text: 'TypeScript', link: '/fe/typescript'},
          { text: '工具', link: '/fe/util'},
          { text: '编译', link: '/fe/compile'},
          { text: '面试', link: '/fe/interview'},
          { text: '兼容性', link: '/fe/snippet'},
          { text: '组件化', link: '/fe/component'},
          { text: '工程化', link: '/fe/engineering'},
          { text: '模块化', link: '/fe/module'},
          { text: '性能优化', link: '/fe/performance'},
          { text: '函数式编程', link: '/fe/functional-programing'},
        ]
      },
      { text: 'Node.js', items: [
          { text: 'Node.js', link: '/nodejs/' },
          { text: 'EventLoop', link: '/nodejs/eventloop' },
          { text: 'CLI', link: '/nodejs/cli'},
        ]
      },
      { text: 'Java', link: '/java/' },
      { text: 'PHP', link: '/php/' },
      { text: 'Python', link: '/python/' },
      { text: 'HTTP', link: '/http/' },
      {
        text: 'ALG',
        items: [
          { text: '算法与数据结构', link: '/alg/' },
          { text: '复杂度分析（上）', link: '/alg/complexity-1' },
          { text: '复杂度分析（下）', link: '/alg/complexity-2' },
        ]
      },
      {
        text: 'MySQL',
        items: [
          { text: '基础', link: '/mysql/' },
          { text: '函数', link: '/mysql/function' },
          { text: '子查询', link: '/mysql/subquery' },
          { text: '连接查询', link: '/mysql/join' },
          { text: 'SQL必知必会', link: '/mysql/sql' },
        ]
      },
      { text: '其他', items: [
        { text: 'Git', link: '/other/git' },
          { text: 'Linux', link: '/other/linux' },
          { text: 'Shell', link: '/other/shell' },
          { text: 'CentOS', link: '/other/centos' },
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
    sidebarDepth: 1,
    // sidebar: [
    //   // '/guide/',
    //   // '/guide/page-a',
    //   // ['/guide/page-b', 'Explicit link text'],
    //   // {
    //   //   title: 'page-c',
    //   //   path: '/guide/page-c',
    //   //   // collapsable: false,
    //   //   sidebarDepth: 2,
    //   //   children: [
    //   //     '/guide/page-c',
    //   //     '/',
    //   //   ]
    //   // },

    //   {
    //     title: 'FrontEnd',
    //     path: '/fe',
    //     children: [
    //       // {
    //       //   title: 'Home',
    //       //   path: '/fe/'
    //       // },
    //       // {
    //       //   title: '兼容性',
    //       //   path: '/fe/snippet'
    //       // },
    //       '/fe/',
    //       '/fe/snippet',
    //       '/fe/component',
    //       '/fe/engineering',
    //       '/fe/module',
    //       '/fe/performance',
    //       '/fe/cli',
    //       '/fe/react',
    //     ]
    //   },
    //   {
    //     title: 'Node.js',
    //     children: [
    //       '/nodejs/',
    //       '/nodejs/eventloop'
    //     ]
    //   },
    //   {
    //     title: 'Java',
    //     path: '/java/'
    //   },
    //   {
    //     title: 'PHP',
    //     path: '/php/'
    //   },
    //   {
    //     title: 'Python',
    //     path: '/python/'
    //   },
    //   {
    //     title: 'HTTP',
    //     path: '/http/'
    //   },
    //   {
    //     title: '其他',
    //     children: [
    //       '/other/git',
    //       '/other/linux',
    //       '/other/shell',
    //       '/other/centos'
    //     ]
    //   },
    //   '/movie',
    // ],

    // 多个侧边栏：为不同的页面组来显示不同的侧边栏
    sidebar: {
      '/alg/': [
        '',
        'complexity-1',
        'complexity-2'
      ],
      '/fe/': [
        '',
        'vue',
        'react',
        'typescript',
        'util',
        'compile',
        'interview',
        'snippet',
        'component',
        'engineering',
        'module',
        'performance',
        'functional-programing',
      ],
      '/mysql/': [
        '',
        'function',
        'subquery',
        'join',
        'sql'
      ],
      '/nodejs/': [
        '',
        'eventloop',
        'cli',
      ],
      '/java/': [
        ''
      ],
      '/php/': [
        ''
      ],
      '/python/': [
        ''
      ],
      '/http/': [
        ''
      ],
      '/other/': [
        'git',
        'linux',
        'shell',
        'centos'
      ],
      '/movie/': [
        ''
      ]
    },
    displayAllHeaders: false
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
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