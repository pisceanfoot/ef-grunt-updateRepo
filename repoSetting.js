module.exports = {
	checkRepo: {
			'Database' : [],
			'Frameworks' : [],
			'labs-commerce' : [],
			'labs-mobile' : [],
			'labs-ops' : [],
			'labs-school' : [],
			'labs-share' : [{'service-clients': {}}, 
							'partners-portal'],
			'labs-solution' : [],
			'labs-specialdeal' : ['rio2016languagetest', /*'login-handler', 'russ-ui-headerfooter'*/]
		},
	updateRepo:{
		'labs-share' : ['service-clients', 'shared-services', 
						{'enrollment': 
							{branch:'team/specialdeals/develop'}
						}
					],
		'labs-commerce' : [],
		'labs-mobile' : [],
		'labs-ops' : [],
		'labs-school' : [],
		'labs-solution' : [],
		'labs-specialdeal' : []
	}
}