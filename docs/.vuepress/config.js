// module.exports = {
//     base:'/blog/',
//     themeConfig: {
//       nav: [
//         { text: 'Home', link: '/' },
//         { text: 'Guide', link: '/guide/' },
//         { text: 'External', link: 'https://google.com' },
//       ]
//     }
//   }
module.exports = {
    // base: '/blog/',
    theme: 'reco',
    title: '随心所欲',
    description: '自律、自信、坚持，加油',
    themeConfig: {
        type: 'blog',
        authorAvatar: '/assets/head.jpeg',
        logo: '/assets/head.jpeg',
        subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
        sidebar: {
            '/view/': [
                {
                    title: '前端',
                    collapsable: true,
                    children: ['前端/css', '前端/js', '前端/html', '前端/计算机网络', '前端/游览器缓存', '前端/websocket']

                },
                {
                    title: 'vue',
                    collapsable: true,
                    children: ['vue/vue2', 'vue/vue3', 'vue/vue2和3的区别']
                },
                {
                    title: '小程序',
                    collapsable: true,
                    children: ['小程序/微信小程序',]
                },
                {
                    title: 'webpack配置',
                    collapsable: true,
                    children: ['webpack配置/webpack介绍', 'webpack配置/webpack之Loader', 'webpack配置/webpack之Plugin', 'webpack配置/webpack之入口和出口', 'webpack配置/webpack汇总']


                },
            ]
        },
        // 最后更新时间
        lastUpdated: 'Last Updated',
        author: '沈',//设置全局作者姓名
        huawei: false,//首页可以显示 “华为” 文案
        // 项目开始时间，只填写年份
        startYear: '2022',
        nav: [
            { text: 'Home', link: '/', icon: 'reco-home' },
            { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
            { text: 'GitHub', link: 'https://github.com/Shenjunku', icon: 'reco-github' },
            // { text: 'about', link: '/about/', icon: 'reco-home' },
        ],
        //添加友链
        friendLink: [
            {
                title: 'vuepress-theme-reco', //title 友链标题
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',  //desc 友链描述
                logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png", //logo 友链 LOGO（本地图片或网络图片）
                link: 'https://vuepress-theme-reco.recoluan.com'  //link 友链地址
            },
            {
                title: '午后南杂',
                desc: 'Enjoy when you can, and endure when you must.',
                email: 'recoluan@qq.com',  //email 如果没有设置 logo，将通过 Email获取到的 Gravatar 头像来设置 LOGO
                link: 'https://www.recoluan.com'
            },
        ],
        // 博客配置
        blogConfig: {
            category: {
                location: 2,     // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/recoluan' },
                { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
            ]
        }
    },

    plugins: [
        [
            "vuepress-plugin-live2d",
            {
                modelName: ["z16", "Epsilon2.1", "izumi", "koharu", "shizuku", "miku", "hijiki", "tororo"],
                mobileShow: true,
                position: "left"

            }
        ],
        ["cursor-effects"],
        //  ["go-top"]
    ]
}