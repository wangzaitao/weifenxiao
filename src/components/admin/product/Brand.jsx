import React, {Component, PropTypes} from 'react';
import Table from '../com/Table.jsx';

class Brand extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thead: ["ID", "品牌名称", "链接地址", "Logo", "备注", "是否显示", "排序"],
			tbody: []
		};
	}

	componentWillMount() {
		//获取数据
		var result = [
			{ID: 1, Name: "七天", UrlLink: "www.baidu.com", Logo: "显示图片", Remark: "备注...", IsShow: "是", OrderBy: 1},
			{ID: 2, Name: "如家", UrlLink: "www.baidu.com", Logo: "显示图片", Remark: "备注...", IsShow: "是", OrderBy: 2},
			{ID: 3, Name: "汉庭", UrlLink: "www.baidu.com", Logo: "显示图片", Remark: "备注...", IsShow: "是", OrderBy: 3}
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
					<td>{item.UrlLink}</td>
					<td>{item.Logo}</td>
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
					<li className="active">品牌</li>
				</ol>
				<div className="container-fluid" style={{ marginBottom:"10px"}}>
					<span>产品类型：</span>
					<select value="旅游">
						<option value="旅游">旅游</option>
						<option value="土特产">土特产</option>
						<option value="化妆品">化妆品</option>
					</select>
					<span style={{ marginLeft:"20px"}}>产品分类：</span>
					<select value="酒店">
						<option value="周边游">周边游</option>
						<option value="国内游">国内游</option>
						<option value="出镜游">出镜游</option>
						<option value="景点门票">景点门票</option>
						<option value="酒店">酒店</option>
					</select>
				</div>
				<div className="container-fluid">
					<Table id="type" name="品牌列表" title={this.state.thead} tbody={tbdoyDom}/>
				</div>
			</div>
		
		);
	}
}

export default Brand;



