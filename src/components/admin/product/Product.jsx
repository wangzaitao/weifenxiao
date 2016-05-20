import React, {Component, PropTypes} from 'react';
import * as ContentAPI from './../../../api/content';
import Table from '../com/Table.jsx';

require('./../../../../node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.css');
require('./../../../../node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.js');

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			thead: ["ID", "产品名称", "产品分类", "门市价", "会员价", "积分系数", "折扣系数", "库存", "是否可预定", "联系电话", "访问次数", "评论次数", "是否违规", "是否推荐", "是否显示"],
			tbody: [],
			pid: 0
		};
	}
	
	componentWillMount() {
		ContentAPI.getProductList().then((res) => {
			var result = [];
			for (var i = 0; i < res.length; i++) {
				var obj = {
					ID: res[i]["ID"],
					Name: res[i]["Name"],
					CategoryName:"",
					RetailPrice: res[i]["RetailPrice"],
					MemberPrice: res[i]["MemberPrice"],
					IntegralCoefficient: res[i]["IntegralCoefficient"],
					DiscountCoefficient: res[i]["DiscountCoefficient"],
					Stock: res[i]["Stock"],
					IsCanOrder: res[i]["IsCanOrder"],
					LinkTel: res[i]["LinkTel"],
					VisitNum: res[i]["VisitNum"],
					CommentNum: res[i]["CommentNum"],
					IsPolicy: res[i]["IsPolicy"],
					IsCommend: res[i]["IsCommend"],
					IsShow: res[i]["IsShow"]
				};
				result.push(obj);
			}
			this.setState({
				tbody: result
			});
		});
	}

	componentDidMount() {
		var tree = [
			{
				text: "旅游",
				nodes: [
					{
						text: "周边游"
					},
					{
						text: "国内游"
					},
					{
						text: "出境游"
					},
					{
						text: "景点门票"
					},
					{
						text: "酒店"
					},
					{
						text: "旅游服务"
					}
				]
			},
			{
				text: "土特产"
			},
			{
				text: "化妆品"
			},
			{
				text: "Parent 4"
			},
			{
				text: "Parent 5"
			}
		];

		$('#tree').treeview({data: tree});
	}
	
	render() {
		var tbdoyDom;
		tbdoyDom = this.state.tbody.map((item, index) => {
			return (
				<tr>
					<td>{item.ID}</td>
					<td>{item.Name}</td>
					<td>{item.CategoryName}</td>
					<td>{item.RetailPrice}</td>
					<td>{item.MemberPrice}</td>
					<td>{item.IntegralCoefficient}</td>
					<td>{item.DiscountCoefficient}</td>
					<td>{item.Stock}</td>
					<td>{item.IsCanOrder}</td>
					<td>{item.LinkTel}</td>
					<td>{item.VisitNum}</td>
					<td>{item.CommentNum}</td>
					<td>{item.IsPolicy}</td>
					<td>{item.IsShow}</td>
					<td>{item.IsCommend}</td>
				</tr>
			);
		});

		return (
			<div>
				<div className="row">
					<ol className="breadcrumb">
						<li><a href="#">产品管理</a></li>
						<li className="active">产品列表</li>
					</ol>
				</div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-2" style={{paddingLeft:"0px",paddingRight:"0px"}}>
							<div id="tree"></div>
						</div>
						<div className="col-md-10" style={{paddingRight:"0px"}}>
							<Table id="product" name="产品列表" title={this.state.thead} tbody={tbdoyDom} addUrl="/product/add"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;



