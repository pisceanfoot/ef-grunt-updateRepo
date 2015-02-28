module.exports = {
	checkRepo: {
			'Database' : [],
			'Frameworks' : [],
			'labs-commerce' : ['commerce', 'customerservice'],
			'labs-mobile' : [],
			'labs-ops' : [],
			'labs-school' : ['school', 'school-ui-activity'],
			'labs-share' : ['service-clients', 'partners-portal', 'enrollment', 'queue-processor', 'ui-shared-dist'],
			'labs-solution' : ['community', 'et-ui-headerfooter'],
						'labs-specialdeal': ['rio2016languagetest']
		},
	updateRepo:{
		'labs-share' : ['service-clients', 'shared-services'/*, 
						{'enrollment': 
							{branch:'team/specialdeals/develop'}
						}*/
					],
		'labs-commerce' : [],
		'labs-mobile' : [],
		'labs-ops' : [],
		'labs-school' : [{'school-platform':{legacy:true}}, 
						{'school' : {legacy:true, branch:'team/specialdeals/develop'}}
		],
		'labs-solution' : [],
		'labs-specialdeal' : []
	}
}