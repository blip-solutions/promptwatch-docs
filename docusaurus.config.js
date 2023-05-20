// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PromptWatch.io Docs',
  tagline: 'Track and tweak your LLM Chains',
  url: 'https://docs.promptwatch.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  staticDirectories: ['static'],



  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },

        
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Blip solutions`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'G-VQ6LCPKSYX'
        },
        gtag: {
          trackingID: 'G-VQ6LCPKSYX',
        }
      }),
    ],
    // [
    //   'redocusaurus',
    //   {
    //     // Plugin Options for loading OpenAPI files
    //     specs: [
    //       {
    //         spec: 'static/api_swagger.yaml',
    //         route: '/api/',
    //       },
    //       {
    //         spec: 'static/serving_api_swagger.yaml',
    //         route: '/serving-api/',
    //       },
    //     ],
    //     // Theme Options for modifying how redoc renders them
    //     theme: {
    //       // Change with your site colors
    //       primaryColor: '#1890ff',
    //     },
    //   },
    // ]
    
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      defaultMode:"light",
      image: 'img/dashboard-screen.png',
      navbar: {
        title: 'PromptWatch.io',
        logo: {
          alt: '',
          src: 'img/logo192.png',
        },

        items: [

          {
            type: 'dropdown',
            
            position: 'right',
            label: 'Docs',
            items: [
              {
                type: 'doc',
                docId: 'intro',
                
                label: 'Introduction'
              },
              {
                type: 'doc',
                docId: 'quickstart',
                
                label: 'Quickstart',
              },
              {
                type: 'doc',
                docId: 'caching',
                
                label: 'LLM Caching',
              },
              {
                type: 'doc',
                label: 'Unit testing',
                docId: '/category/unit-testing',
                
              },
            ]
          },
         
        
          // {
            
          //   to:"/api_branching_page",
          //   position: 'left',
          //   label: 'API docs',
          // },
          // {to: '/blog', label: 'Blog', position: 'left'},
          // {
            
          //   to:"/serving-api",
          //   position: 'left',
          //   label: 'Model inference API',
          // },
          // {
          //   type: 'doc',
          //   docId: 'legal/privacy_policy',
          //   position: 'left',
          //   label: 'Legal',
          // },
          //{to: '/blog', label: 'Blog', position: 'left'},
       
          {
            href: 'https://github.com/blip-solutions/promptwatch-client',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Quickstart',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'GitHub',
            items: [
              // {
              //   label: 'Slack',
              //   href: 'https://labelatorio.slack.com/join/shared_invite/zt-1dpn10chj-1EMqk3lhY1xkkygiJ4rGaQ#/shared-invite/email',
              // },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/docusaurus',
              // },
              // {
              //   label: 'Twitter',
              //   href: 'https://twitter.com/labelator_io',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/blip-solutions/promptwatch-client',
              },
            ],
          },
         
          {
            title: 'Legal',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'Privacy policy',
                to: '/docs/legal/privacy-policy',
              },
              {
                label: 'Terms of service',
                to: '/docs/legal/terms-of-service',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Blip.solutions.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
