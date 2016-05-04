import React, {Component, PropTypes} from 'react';
import Table from '../com/Table.jsx';
import * as ContentAPI from './../../../api/content';

class Type extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thead: ["ID", "产品类型名称", "备注", "是否显示", "排序"],
			tbody: [],
			flag: ""
		};
	}
	
	componentWillMount() {
		ContentAPI.getProductType().then((res) => {
			this.setState({
				tbody: res
			});
		});
	}

	render() {
		var tbdoyDom;
		tbdoyDom = this.state.tbody.map((item, index) => {
			return (
				<tr>
					<td>{item.ID}</td>
					<td>{item.Name}</td>
					<td>{item.Remark}</td>
					<td>{item.IsShow}</td>
					<td>{item.OrderBy}</td>
				</tr>
			);
		});

		return (
			<div className="row">
				<ol className="breadcrumb">
					<li><a href="#">产品管理</a></li>
					<li className="active">产品类型</li>
				</ol>
				<div className="container-fluid">
					<Table id="type" name="产品类型列表" title={this.state.thead} tbody={tbdoyDom}/>
				</div>
			</div>

		);
	}
}

export default Type;



