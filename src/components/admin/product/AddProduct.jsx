import React, {Component, PropTypes} from 'react';
import * as ContentAPI from './../../../api/content';

require('./../../../../node_modules/bootstrap-fileinput/css/fileinput.min.css');
require('./../../../../node_modules/bootstrap-fileinput/js/fileinput.min.js');

class Type extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdtImgUrl: "",
      pid: this.props.params.pid || 0
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    $('.fileMuti').fileinput({
      language: 'zh', //设置语言
      uploadUrl: "http://139.196.39.83:8848/api/fileupload", //上传的地址
      allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀,
      maxFileCount: 6,
      showUpload: true, //是否显示上传按钮
      showCaption: false,//是否显示标题
      browseClass: "btn btn-primary", //按钮样式
      previewFileIcon: "<i className='glyphicon glyphicon-king'></i>",
      msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
    });
    $("#input-default").on("fileuploaded", function (event, data, previewid, index) {
      alert(data.response.msg);
      this.setState({
        pdtImgUrl: data.response.msg
      });
    }.bind(this));
    debugger;
    var pid = this.state.pid;
    ContentAPI.getProductCategory(pid).then((res) => {
      debugger;
    });
  }

  _saveBasic() {
    var data = {
      PdtBasic: {
        ID: this.state.pid,
        TypeID: 1,
        BrandID: 0,
        Name: $("#Name").val(),
        ShopID: 0,
        PdtNo: "",
        PriceExplain: "",
        PriceType: 0,
        EnfantPrice: $("#EnfantPrice").val(),
        ListingPrice: $("#ListingPrice").val(),
        RetailPrice: $("#RetailPrice").val(),
        MemberPrice: $("#MemberPrice").val(),
        YouHuiPrice: $("#MemberPrice").val(),
        DiscountDetail: "",
        IntegralCoefficient: $("#IntegralCoefficient").val(),
        DiscountCoefficient: $("#DiscountCoefficient").val(),
        Stock: $("#Stock").val(),
        BuyMax: $("#BuyMax").val(),
        BuyMin: $("#BuyMin").val(),
        IsCanOrder: $("#IsCanOrder").prop("checked") ? 1 : 0,
        LinkTel: $("#Phone").val(),
        PdtBrief: $("#PdtBrief").val(),
        PdtDetail: $("#PdtDetail").val(),
        IsTrip: 1,
        ProvinceID: 0,
        CityID: 0,
        DistrictID: 0,
        PdtImgUrl: this.state.pdtImgUrl,
        //"VisitNum": 1,
        //"CommentNum": 1,
        //"SelledNum": 1,
        Title: "",
        Meta_Keywords: "",
        Meta_Description: "",
        //"IsPolicy": 64,
        //"IsTop": 64,
        //"IsCommend": 64,
        IsShow: $("#IsShow").prop("checked") ? 1 : 0,
        //"Flag": 64,
        IsEnable: 1,
        IsDelete: 0,
        //"CreatTime": "2016-05-02T17:10:19.7270867+08:00",
        //"CreatUser": 1,
        //"ModifyTime": "2016-05-02T17:10:19.7270867+08:00",
        //"ModifyUser": 1
      },
      PdtInfo: {
        PdtID: 0,
        PdtType: 1,
        Address: $("#Address").val(),
        Phone: $("#Phone").val(),
        TrafficeInfo: $("#TrafficeInfo").val(),
        BookNotice: $("#BookNotice").val(),
        FriendlyPrompt: $("#FriendlyPrompt").val(),
        RouteFeature: $("#RouteFeature").val()
        //"Trip_Type": 1,
        //"Trip_JoinType": 1,
        //"Trip_SignUpAheadDays": 1,
        //"Trip_Days": 1,
        //"Trip_RouteType": 64,
        //"Trip_StartCity": "sample string 8",
        //"Trip_StartDate": "2016-05-02T17:10:19.7290399+08:00",
        //"Trip_StartType": 64,
        //"Trip_GoTrafficType": 1,
        //"Trip_ReturnTrafficType": 1,
        //"Trip_TrafficType": 1,
        //"Trip_TrafficContent": "sample string 9",
        //"Hotel_Level": 1,
        //"Hotel_Services": "sample string 10",
        //"Sight_Type": 1,
        //"Cars_HiresType": 1,
        //"Cars_Type": 1,
        //"Cars_PersonNum": 1,
        //"Cars_Config": "sample string 11",
        //"CreatTime": "2016-05-02T17:10:19.7309931+08:00",
        //"CreatUser": 1,
        //"ModifyTime": "2016-05-02T17:10:19.7309931+08:00",
        //"ModifyUser": 1
      }
    };

    ContentAPI.saveProductBasic(data).then((res) => {
      debugger;
    });
  }

  _savePrice() {
    var arr = [];
    for (var i = 0; i < $("#tbl_Price tbody").find("tr").length; i++) {
      var obj = {
        //"ID": 1,
        "PdtID": 1,
        "PriceType": $("#tbl_Price tbody").find("tr:eq(" + i + ")").children("td:eq(0)").find("input").val(),
        "MenShiPrice": $("#tbl_Price tbody").find("tr:eq(" + i + ")").children("td:eq(1)").find("input").val(),
        //"YouHuiPrice": 1.0,
        "ErTongPrice": $("#tbl_Price tbody").find("tr:eq(" + i + ")").children("td:eq(4)").find("input").val(),
        "HuiYuanPrice": $("#tbl_Price tbody").find("tr:eq(" + i + ")").children("td:eq(2)").find("input").val(),
        "TongHangPrice": $("#tbl_Price tbody").find("tr:eq(" + i + ")").children("td:eq(3)").find("input").val(),
        "PriceIntroduces": $("#tbl_Price tbody").find("tr:eq(" + i + ")").children("td:eq(5)").find("input").val(),
        //"PriceDate": "2016-05-02T18:14:02.8235357+08:00",
        //"OrderBy": 64,
        //"Flag": 64,
        "IsShow": 1,
        "IsDelete": 0
        //"CreatTime": "2016-05-02T18:14:02.8245123+08:00",
        //"CreatUser": 1,
        //"ModifyTime": "2016-05-02T18:14:02.8245123+08:00",
        //"ModifyUser": 1
      };
      arr.push(obj);
    }


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
                    <input id="Name" type="text" className="form-control"
                           placeholder="请输入产品名称" maxLength="50"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">是否旅游产品</label>
                  <div className="col-sm-9">
                    <div className="checkbox">
                      <label>
                        <input type="checkbox" disabled name="order" defaultChecked="true"/>是
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-sm-3 control-label">产品类型</label>
                  <div className="col-sm-9">
                    <select className="form-control" id="TypeID">
                      <option value="1">旅游</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label for="" className="col-sm-3 control-label">产品分类</label>
                  <div className="col-sm-9">
                    <select className="form-control" id="CategoryID">
                      <option value="-1">---请选择---</option>
                      <option value="1">周边游</option>
                      <option value="2">国内游</option>
                      <option value="3">出境游</option>
                      <option value="4">酒店</option>
                      <option value="5">门票</option>
                      <option value="6">租车</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ width:"100%"}}>
                  <label className="col-sm-3 control-label" style={{width:"161px"}}>产品图片</label>
                  <div className="col-sm-4">
                    <input id="input-default" type="file" className="file fileMuti" multiple
                           data-allowed-file-extensions='["png", "jpg", "jpeg"]'/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">产品概述</label>
                  <div className="col-sm-9">
                    <textarea id="PdtBrief" className="form-control" placeholder="请输入产品概述" maxLength="1000"></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">产品详情</label>
                  <div className="col-sm-9">
                    <textarea id="PdtDetail" className="form-control" placeholder="请输入产品详情" maxLength="1000"></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">门市价（元）</label>
                  <div className="col-sm-9">
                    <input id="RetailPrice" type="text" className="form-control"
                           placeholder="请输入门市价"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">会员价（元）</label>
                  <div className="col-sm-9">
                    <input id="MemberPrice" type="text" className="form-control"
                           placeholder="请输入会员价"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">同行价（元）</label>
                  <div className="col-sm-9">
                    <input id="ListingPrice" type="text" className="form-control"
                           placeholder="请输入同行价"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">儿童价（元）</label>
                  <div className="col-sm-9">
                    <input id="EnfantPrice" type="text" className="form-control"
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
                    <input id="Stock" type="text" className="form-control"
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
                    <input id="BuyMax" type="text" className="form-control"
                           placeholder="请输入最大可买数量"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">最小可买数量</label>
                  <div className="col-sm-9">
                    <input id="BuyMin" type="text" className="form-control"
                           placeholder="请输入最小可买数量"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">积分系数</label>
                  <div className="col-sm-9">
                    <input id="IntegralCoefficient" type="text" className="form-control"
                           placeholder="请输入积分系数"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">折扣系数</label>
                  <div className="col-sm-9">
                    <input id="DiscountCoefficient" type="text" className="form-control"
                           placeholder="请输入折扣系数"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">是否可预订</label>
                  <div className="col-sm-9">
                    <div className="checkbox">
                      <label>
                        <input id="IsCanOrder" type="checkbox" name="order" defaultChecked="true"/>是
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-3 control-label">是否显示</label>
                  <div className="col-sm-9">
                    <div className="checkbox">
                      <label>
                        <input id="IsShow" type="checkbox" name="order" defaultChecked="true"/>是
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-horizontal" role="form">
                  <div className="form-group">
                    <label className="col-sm-3 control-label">联系地址</label>
                    <div className="col-sm-9">
                      <input id="Address" type="text" className="form-control"
                             placeholder="请输入联系地址" maxLength="100"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">联系电话</label>
                    <div className="col-sm-9">
                      <input id="Phone" type="text" className="form-control"
                             placeholder="请输入联系电话"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">交通指南</label>
                    <div className="col-sm-9">
											<textarea id="TrafficeInfo" className="form-control" placeholder="请输入交通指南"
                                maxLength="1000"></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">预订须知</label>
                    <div className="col-sm-9">
											<textarea id="BookNotice" className="form-control" placeholder="请输入预订须知"
                                maxLength="1000"></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">温馨提示</label>
                    <div className="col-sm-9">
											<textarea id="FriendlyPrompt" className="form-control" placeholder="请输入温馨提示"
                                maxLength="1000"></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">特色</label>
                    <div className="col-sm-9">
											<textarea id="RouteFeature" className="form-control" placeholder="请输入特色"
                                maxLength="1000"></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-9">
                    <a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}
                       onClick={this._saveBasic.bind(this)}>保存</a>
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
              <table className="table table-striped table-bordered" id="tbl_Price">
                <thead>
                <tr>
                  <th>价格类型</th>
                  <th>门市价</th>
                  <th>会员价</th>
                  <th>同行价</th>
                  <th>儿童价</th>
                  <th>费用说明</th>
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
                </tr>
                <tr>
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
                  <a type="submit" className="btn btn-primary" style={{ marginRight:"10px"}}
                     onClick={this._savePrice.bind(this)}>保存</a>
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


