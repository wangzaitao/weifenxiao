import React, {Component, PropTypes} from 'react';
import Table from '../com/Table.jsx';

class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thead: ["ID", "产品分类名称", "备注", "是否显示", "排序"],
			tbody: []
		};
	}
	
	componentWillMount() {
		//获取数据
		var result = [
			{ID: 1, Name: "周边游", Remark: '备注...', IsShow: '是', OrderBy: 1},
			{ID: 2, Name: "国内游", Remark: '备注...', IsShow: '是', OrderBy: 2},
			{ID: 3, Name: "出境游", Remark: '备注...', IsShow: '是', OrderBy: 3},
			{ID: 4, Name: "景点门票", Remark: '备注...', IsShow: '是', OrderBy: 4},
			{ID: 5, Name: "酒店", Remark: '备注...', IsShow: '是', OrderBy: 5},
			{ID: 6, Name: "旅游服务", Remark: '备注...', IsShow: '是', OrderBy: 6}
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
					<li className="active">产品分类</li>
				</ol>
				<div className="container-fluid" style={{ marginBottom:"10px"}}>
					<span>类型：</span>
					<select>
						<option>旅游</option>
						<option>土特产</option>
						<option>化妆品</option>
					</select>
				</div>
				<div className="container-fluid">
					<Table id="type" name="产品分类列表" title={this.state.thead} tbody={tbdoyDom}/>
				</div>
			</div>
		
		);
	}
}

export default Category;



