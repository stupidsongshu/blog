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
          { text: '工具库', link: '/fe/util'},
          { text: '编译', link: '/fe/compile'},
          { text: 'TypeScript', link: '/fe/typescript'},
        ]
      },
      { text: 'Node.js', items: [
          { text: 'Node.js', link: '/nodejs/' },
          { text: '事件循环', link: '/nodejs/eventloop' },
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
    //       //   title: '移动端兼容性',
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
        'snippet',
        'component',
        'engineering',
        'module',
        'performance',
        'cli',
        'react',
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
        'eventloop'
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