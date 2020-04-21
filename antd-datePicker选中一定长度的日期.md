```
import React,{Component} from 'react'
import { Button, Breadcrumb, DatePicker, message, Input } from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { fetchPost } from '../utils/fetch'
import urls from '../utils/urls'
const dateFormat = 'YYYY-MM-DD';

export default class THeader extends Component {
	constructor(props){
		super(props)
		// props.initDay?初始化为昨天:初始化前30天的日期
		// props.dateLength 最大选中多少天的范围
		this.state = {
			startValue: props.initDay ? moment(new Date().getTime() - 24 * 60 * 60 * 1000):moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 31),
			endValue: moment(new Date().getTime() - 24 * 60 * 60 * 1000),
			loading:false,
			dateLength: props.dateLength ? props.dateLength:30
		}
	}
	componentDidMount(){
		const { startValue, endValue } = this.state
		// this.props.getDateRange(startValue.format(dateFormat), endValue.format(dateFormat))
	}
	onStartChange = (date) => {
		const { endValue, dateLength } = this.state
		const length = parseInt((endValue.valueOf() - date.valueOf()) / (24 * 60 * 60 * 1000))
		// console.log('33333=>', length);
		this.setState({ startValue: date})
		if (length > dateLength-1 || date.valueOf() > endValue.valueOf()){
			this.setState({endValue:null})
			return
		}
		this.props.getDateRange(date.format(dateFormat), endValue.format(dateFormat))
	}
	onEndChange = (date) => {
		const { startValue } = this.state
		this.setState({ endValue: date })
		this.props.getDateRange(startValue.format(dateFormat), date.format(dateFormat))
	}
	disabledStartDate = (startValue) => {
		const { endValue, dateLength } = this.state
		return startValue.valueOf() > new Date().getTime() - 24 * 60 * 60 * 1000
		// return endValue.valueOf() - startValue.valueOf() > 24 * 60 * 60 * 1000 * dateLength || startValue.valueOf() > new Date().getTime() - 24 * 60 * 60 * 1000 || startValue.valueOf() > endValue.valueOf()
	}

	disabledEndDate = (endValue) => {
		const { startValue, dateLength } = this.state
		return endValue.valueOf() - startValue.valueOf() > 24 * 60 * 60 * 1000 * dateLength || endValue.valueOf() > new Date().getTime() - 24 * 60 * 60 * 1000 || endValue.valueOf() < startValue.valueOf()
	}

	render(){
		const { loading, startValue,endValue} = this.state
		const { bread, date, btnText, style} = this.props
		return (
			<div className="operation">
				<div className="datePicker" style={{opacity:date!=='none'?1:0}}>
					<DatePicker
						value={startValue}
						locale={locale}
						onChange={this.onStartChange}
						placeholder={'请输入开始时间' }
						allowClear={false}
						showToday={false}
						format={dateFormat}
						suffixIcon={<img src={require('../assets/calendarIcon.png')} alt="" style={{width:18,height:18}} />}
						disabledDate={this.disabledStartDate}
					/>
					<span className="line"></span>
					<DatePicker
						value={endValue}
						locale={locale}
						onChange={this.onEndChange}
						placeholder={'请输入结束时间'}
						allowClear={false}
						showToday={false}
						format={dateFormat}
						suffixIcon={<img src={require('../assets/calendarIcon.png')} alt="" style={{ width: 18, height: 18 }} />}
						disabledDate={this.disabledEndDate}
					/>
				</div>
		)
	}
}
```