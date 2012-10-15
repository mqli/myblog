module.exports = 
  SERVER_HOST: process.env.VCAP_APP_HOST || 'localhost'
  SERVER_PORT: process.env.VCAP_APP_PORT || process.env.PORT || 3000

  MONGO_HOST: 'localhost'
  MONGO_PORT: 27017
  MONGO_DB: 'test'

  OPENID_URL: 'http://www.google.com/accounts/o8/id'

  OPENID_CALLBACK:
    if process.env.VCAP_APP_HOST then 'http://mqli.cloudfoundry.com/verify' else 'http://localhost:3000/verify'

  AUTHORS:
    'limanqing315@gmail.com' : 'mqli'