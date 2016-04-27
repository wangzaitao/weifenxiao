import React, {Component, PropTypes} from 'react';
import Table from '../com/Table.jsx';

class ParamGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thead: ["ID", "产品参数组名称", "备注", "是否显示", "排序"],
			tbody: []
		};
	}
	
	componentWillMount() {
		//获取数据
		var result = [
			{ID: 1, Name: "产品参数组1", Remark: '备注...', IsShow: '是', OrderBy: 1},
			{ID: 2, Name: "产品参数组2", Remark: '备注...', IsShow: '是', OrderBy: 2},
			{ID: 3, Name: "产品参数组3", Remark: '备注...', IsShow: '是', OrderBy: 3}
		];
		this.setState({
			tbody: result
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
					<li className="active">产品参数组</li>
				</ol>
				<div className="container-fluid">
					<Table id="type" name="产品参数组列表" title={this.state.thead} tbody={tbdoyDom}/>
				</div>
			</div>
		
		);
	}
}

export default ParamGroup;



