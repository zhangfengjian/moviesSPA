export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'hpapp'
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'hpapp',
    port: 27017,
    username: '',
    password: ''
  },
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user'
  },
  emailConfig: {
    user: '',
    pass: ''
  },
  app: {
    domain: '47.107.250.36',
    host: '127.0.0.1',
    port: 8000,
    routerBaseApi: 'api'
  },
  category:[
    {
      levelName:'Categories',
      superId: '957301',
      subCategory: [
        {
          levelName:'Afghanistan',
          subId:'957301001'
        },
        {
          levelName:'Aland Islands',
          subId:'957301002'
        },
        {
          levelName:'Albania',
          subId:'957301003'
        },
        {
          levelName:'American Samoa',
          subId:'957301004'
        },
        {
          levelName:'Andorra',
          subId:'957301005'
        },
        {
          levelName:'Argentina',
          subId:'957301006'
        },
        {
          levelName:'Austria',
          subId:'957301007'
        },
        {
          levelName:'Bahrain',
          subId:'957301008'
        },
        {
          levelName:'Beurette',
          subId:'957301009'
        },
        {
          levelName:'Cote D Ivoire',
          subId:'9573010010'
        }
      ]
    },
    {
      levelName:'Trends',
      superId: '957302',
      subCategory: [
        {
          levelName:'Hungary',
          subId:'957302001'
        },
        {
          levelName:'Indonesia',
          subId:'957302002'
        },
        {
          levelName:'Japan',
          subId:'957302003'
        },
        {
          levelName:'Mauritius',
          subId:'957302004'
        },
        {
          levelName:'Korea (South)',
          subId:'957302005'
        },
        {
          levelName:'Netherlands',
          subId:'957302006'
        }
      ]
    },
    {
      levelName:'Best Video',
      superId: '957303'
    },
    {
      levelName:'globalStars',
      superId: '957304'
    },
    {
      levelName:'Channels',
      superId: '957305'
    },
    {
      levelName:'100% Verified',
      superId: '957306'
    }
  ]
}
