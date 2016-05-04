import React, {Component, PropTypes} from 'react';
import Table from '../com/Table.jsx';
import * as ContentAPI from './../../../api/content';

class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: [],
			thead: ["ID", "产品分类名称", "备注", "是否显示", "排序"],
			tbody: []
		};
	}
	
	componentWillMount() {
		ContentAPI.getProductType().then((res) => {
			this.setState({
				type: res
			});
		});

		ContentAPI.getProductCategory().then((res) => {
			this.setState({
				tbody: res
			});
		});
	}
	
	render() {
		var typeDom;
		typeDom = this.state.type.map((item, index)=> {
			return (
				<option value={item.ID}>{item.Name}</option>
			);
		});

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
						{typeDom}
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



