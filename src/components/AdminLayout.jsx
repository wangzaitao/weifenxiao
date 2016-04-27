import React from 'react';
import CustomLink from './admin/com/CustomLink.jsx';

require('bootstrap');
require('./../../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./../scss/admin/common.scss');

class AdminLayout extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<header className="navbar navbar-static-top bs-docs-nav" id="top" role="banner"
					        style={{  background: "#278FD3", marginBottom:"0px" }}>
						<div className="container">
							<div className="navbar-header">
								<button className="navbar-toggle collapsed" type="button" data-toggle="collapse"
								        data-target="#bs-navbar"
								        aria-controls="bs-navbar" aria-expanded="false">
									<span className="sr-only">Toggle navigation</span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
									<span className="icon-bar"></span>
								</button>
								<a href="../" className="navbar-brand">乐翻天户外</a>
							</div>
							<nav id="bs-navbar" className="collapse navbar-collapse">
								<ul className="nav navbar-nav">
									<li class="dropdown">
										<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
										   aria-expanded="false">
											产品管理
											<span className="caret"></span>
										</a>
										<ul className="dropdown-menu">
											<li><CustomLink to="/product/type">产品类型</CustomLink></li>
											<li><CustomLink to="/product/category">产品分类</CustomLink></li>
											<li><CustomLink to="/product/brand">产品品牌</CustomLink></li>
											<li role="separator" class="divider"></li>
											<li><CustomLink to="/product/param_group">产品参数</CustomLink></li>
											<li role="separator" class="divider"></li>
											<li><CustomLink to="/product">产品信息</CustomLink></li>
										</ul>
									</li>
									<li>
										<a>商城资源</a>
									</li>
									<li>
										<a>用户管理</a>
									</li>
									<li>
										<a>分销商管理</a>
									</li>
									<li>
										<a>供应商管理</a>
									</li>
									<li class="dropdown">
										<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
										   aria-expanded="false">
											系统设置
											<span className="caret"></span>
										</a>
										<ul className="dropdown-menu">
											<li><a href="#">城市分站</a></li>
											<li><a href="#">网站公告</a></li>
											<li><a href="#">友情链接</a></li>
											<li role="separator" class="divider"></li>
											<li><a href="#">参数配置</a></li>
										</ul>
									</li>
									<li>
										<a>微信高级功能</a>
									</li>
								</ul>
								<ul className="nav navbar-nav navbar-right">
									<li><a>王载涛</a></li>
									<li><a>退出</a></li>
								</ul>
							</nav>
						</div>
					</header>
				</div>
				{this.props.children}
			</div>
		);
	}
}
export default AdminLayout;

