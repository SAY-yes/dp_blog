
	let that = this
	let formData = new FormData();
	formData.append('type', 4);
	formData.append('language_id', 1);

	fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: formData
	}).then((response) => {
		// console.log(response._bodyText)
		let res = response._bodyText
		return JSON.parse(res)
	}).then((resData) => {
		// console.log(resData)
		that.setState({ infoData: resData.data })
	}).catch((e) => {
		console.log(e)
		console.log("网络错误")
	})

