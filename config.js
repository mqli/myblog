module.exports = {
	SERVER_HOST: process.env.VCAP_APP_HOST || 'localhost',
	SERVER_PORT: process.env.VCAP_APP_PORT || 3000,
	MONGO_HOST: 'localhost',
	MONGO_PORT: 27017,
	MONGO_DB: 'test',
  OPEN_ID_VERIFY: process.env.VCAP_APP_HOST ? 
    'http://mqli.cloudfoundry.com/verify' :
    ('http://localhost:' +  (process.env.VCAP_APP_PORT || 3000) + '/verify'),
  OPEN_ID_PROVIDER: 'https://www.google.com/accounts/o8/id',
  CLAIMED_IDS: [
    'https://www.google.com/accounts/o8/id?id=AItOawk5CBQlVd8Bgsmm6YAVj_T3syDbxqF5Z9s',
    'https://www.google.com/accounts/o8/id?id=AItOawn_3jSuTwepmP4sAfuLdNMnMhAlaF09Wdk'
  ]
}
