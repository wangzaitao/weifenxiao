import React, {Component, PropTypes} from 'react';

require("jquery");
require('./../../../../node_modules/bootstrap-fileinput/css/fileinput.min.css');
require('./../../../../node_modules/bootstrap-fileinput/js/fileinput.min.js');

class Type extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	componentWillMount() {
	}

	componentDidMount() {

		$('.fileMuti').fileinput({
			language: 'zh', //设置语言
			uploadUrl: "/FileUpload/Upload", //上传的地址
			allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀,
			maxFileCount: 6,
			enctype: 'multipart/form-data',
			showUpload: true, //是否显示上传按钮
			showCaption: false,//是否显示标题
			browseClass: "btn btn-primary", //按钮样式
			previewFileIcon: "<i className='glyphicon glyphicon-king'></i>",
			msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
		});
	}
	
	render() {
		return (
			<div>
				<div className="row">
					<ol className="breadcrumb">
						<li><a href="#">产品管理</a></li>
						<li className="active">新增产品</li>
					</ol>
				</div>
				<div className="container-fluid">
					<ul id="myTab" className="nav nav-tabs">
						<li className="active">
							<a href="#basic" data-toggle="tab">
								基本信息
							</a>
						</li>
						<li className="dropdown">
							<a href="#" id="myTabDrop1" className="dropdown-toggle"
							   data-toggle="dropdown">价格和图片
								<b className="caret"></b>
							</a>
							<ul className="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">
								<li><a href="#price" tabindex="-1" data-toggle="tab">价格信息</a></li>
								<li><a href="#pic" tabindex="-1" data-toggle="tab">图片信息</a></li>
							</ul>
						</li>
						<li><a href="#travel" data-toggle="tab">旅游线路</a></li>
						<li><a href="#hotel" data-toggle="tab">酒店</a></li>
						<li><a href="#sight" data-toggle="tab">门票</a></li>
						<li><a href="#car" data-toggle="tab">租车</a></li>
					</ul>
					<div id="myTabContent" className="tab-content">
						<div className="tab-pane fade in active" id="basic">
							<div className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">产品名称</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入产品名称"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">是否旅游产品</label>
									<div className="col-sm-9">
										<div className="checkbox">
											<label>
												<input type="checkbox" name="order" defaultChecked="true"/>是
											</label>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">产品类型</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">产品分类</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
										</select>
									</div>
								</div>
								<div className="form-group" style={{ width:"100%"}}>
									<label className="col-sm-3 control-label" style={{width:"161px"}}>产品图片</label>
									<div className="col-sm-4">
										<input id="input-1" type="file" className="file" multiple
										       data-allowed-file-extensions='["png", "jpg", "jpeg"]'/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">产品概述</label>
									<div className="col-sm-9">
										<textarea className="form-control" placeholder="请输入产品概述"></textarea>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">产品详情</label>
									<div className="col-sm-9">
										<textarea className="form-control" placeholder="请输入产品详情"></textarea>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">门市价</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入门市价"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">会员价</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入会员价"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">同行价</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入同行价"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">儿童价</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入儿童价"/>
									</div>
								</div>
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">所属省份</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">湖北</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">所属城市</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">武汉</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">库存</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入库存"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-9">
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">最大可买数量</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入最大可买数量"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">最小可买数量</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入最小可买数量"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">积分系数</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入积分系数"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">折扣系数</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入折扣系数"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">是否可预订</label>
									<div className="col-sm-9">
										<div className="checkbox">
											<label>
												<input type="checkbox" name="order" defaultChecked="true"/>是
											</label>
										</div>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">是否显示</label>
									<div className="col-sm-9">
										<div className="checkbox">
											<label>
												<input type="checkbox" name="order" defaultChecked="true"/>是
											</label>
										</div>
									</div>
								</div>
								<div className="form-horizontal" role="form">
									<div className="form-group">
										<label className="col-sm-3 control-label">联系地址</label>
										<div className="col-sm-9">
											<input type="text" className="form-control"
											       placeholder="请输入联系地址"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-3 control-label">联系电话</label>
										<div className="col-sm-9">
											<input type="text" className="form-control"
											       placeholder="请输入联系电话"/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-3 control-label">交通指南</label>
										<div className="col-sm-9">
											<textarea className="form-control" placeholder="请输入交通指南"></textarea>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-3 control-label">预订须知</label>
										<div className="col-sm-9">
											<textarea className="form-control" placeholder="请输入预订须知"></textarea>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-3 control-label">温馨提示</label>
										<div className="col-sm-9">
											<textarea className="form-control" placeholder="请输入温馨提示"></textarea>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-3 control-label">特色</label>
										<div className="col-sm-9">
											<textarea className="form-control" placeholder="请输入特色"></textarea>
										</div>
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-offset-2 col-sm-9">
										<a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}>保存</a>
										<a className="btn btn-default">取消</a>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="ios">
							<p>iOS 是一个由苹果公司开发和发布的手机操作系统。最初是于 2007 年首次发布 iPhone、iPod Touch 和 Apple
								TV。iOS 派生自 OS X，它们共享 Darwin 基础。OS X 操作系统是用在苹果电脑上，iOS 是苹果的移动版本。</p>
						</div>
						<div className="tab-pane fade" id="price">
							<table className="table table-striped table-bordered">
								<thead>
								<tr>
									<th>价格类型</th>
									<th>门市价</th>
									<th>会员价</th>
									<th>同行价</th>
									<th>儿童价</th>
									<th>费用说明</th>
									<th>排序</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
								</tr>
								<tr>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
									<td><input type="text"/></td>
								</tr>
								</tbody>
							</table>
							<div className="form-group">
								<div className="col-sm-9">
									<a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}>保存</a>
									<a className="btn btn-default">取消</a>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="pic">
							<div className="form-group" style={{ width:"100%"}}>
								<label className="col-sm-3 control-label" style={{width:"161px"}}>产品图片</label>
								<div className="col-sm-9">
									<input id="input-1" type="file" className="file fileMuti" multiple
									       data-allowed-file-extensions='["png", "jpg", "jpeg"]'/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-sm-offset-6 col-sm-9">
									<a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}>保存</a>
									<a className="btn btn-default">取消</a>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="travel">
							<div className="form-horizontal clearfix" role="form" id="trip">
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">线路类型</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
											<option value="1">按天编辑</option>
											<option value="2">可视化编辑</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">参团性质</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">提前几天报名</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入提前几天报名"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">行程天数</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入行程天数"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">出发城市</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择</option>
										</select>
										<select className="form-control">
											<option value="-1">---请选择</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">交通方式</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">发团方式</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择</option>
											<option value="0">天天发团</option>
											<option value="1">指定发团日期</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">发团日期</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="" data-provide="datepicker"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">去时交通</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择</option>
											<option value="0">大巴</option>
											<option value="1">火车</option>
											<option value="2">飞机</option>
											<option value="3">轮船</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">回来交通</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择</option>
											<option value="0">大巴</option>
											<option value="1">火车</option>
											<option value="2">飞机</option>
											<option value="3">轮船</option>
										</select>
									</div>
								</div>
								<div className="form-group" style={{ width:"100%"}}>
									<table className="table table-striped table-bordered">
										<thead>
										<tr>
											<th>第几天</th>
											<th>按天-标题</th>
											<th>按天-行程内容</th>
											<th>按天-吃</th>
											<th>按天住</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>1</td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
										</tr>
										<tr>
											<td>2</td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
										</tr>
										<tr>
											<td>3</td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
											<td><input type="text"/></td>
										</tr>
										</tbody>
									</table>
								</div>
								<div className="form-group">
									<div className="col-sm-offset-2 col-sm-9">
										<a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}>保存</a>
										<a className="btn btn-default">取消</a>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="hotel">
							<div className="form-horizontal clearfix" role="form" id="hotel">
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">酒店星级</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
											<option value="0">无星级</option>
											<option value="1">1星级</option>
											<option value="2">2星级</option>
											<option value="3">3星级</option>
											<option value="4">4星级</option>
											<option value="5">5星级</option>
											<option value="6">6星级</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">酒店服务</label>
									<div className="col-sm-9">
										<div className="checkbox">
											<label>
												<input type="checkbox" name="order" defaultChecked="true"/>wify
											</label>
										</div>
										<div className="checkbox">
											<label>
												<input type="checkbox" name="order"/>免费停车
											</label>
										</div>
										<div className="checkbox">
											<label>
												<input type="checkbox" name="order"/>早餐供应
											</label>
										</div>
										<div className="checkbox">
											<label>
												<input type="checkbox" name="order"/>棋牌室
											</label>
										</div>
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-offset-2 col-sm-9">
										<a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}>保存</a>
										<a className="btn btn-default">取消</a>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="sight">
							<div className="form-horizontal clearfix" role="form" id="sight">
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">景点类别</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label for="" className="col-sm-3 control-label"></label>
									<div className="col-sm-9">
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-offset-2 col-sm-9">
										<a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}>保存</a>
										<a className="btn btn-default">取消</a>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-pane fade" id="car">
							<div className="form-horizontal clearfix" role="form" id="car">
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">租车类别</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label for="" className="col-sm-3 control-label">车辆类别</label>
									<div className="col-sm-9">
										<select className="form-control">
											<option value="-1">---请选择---</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">车载人数</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入车载人数"/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">车载配置</label>
									<div className="col-sm-9">
										<input type="text" className="form-control"
										       placeholder="请输入车载配置"/>
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-offset-2 col-sm-9">
										<a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}>保存</a>
										<a className="btn btn-default">取消</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Type;


