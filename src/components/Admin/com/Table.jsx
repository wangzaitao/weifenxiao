import React from 'react';
import CustomLink from './CustomLink.jsx';

class Table extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let props = this.props;
		var thDom;
		var theadDom;
		thDom = props.title.map((item, index) => {
			if (item == "IDdddd") {
				return <th index={index} style={{display:"none"}}>{item}</th>;
			} else {
				return <th index={index}>{item}</th>;
			}

		});

		theadDom = (
			<thead>
			<tr className="lft-green">
				{thDom}
			</tr>
			</thead>
		);

		return (
			<table className="table table-striped table-bordered">
				<tr>
					<td style={{fontWeight: "bold", fontSize: "14px",color:"#777" }}>
						<span>{props.name}</span>
						<CustomLink className="btn-sm btn btn-primary fr" target="_blank" to="/product/add_product">新增</CustomLink>
					</td>
				</tr>
				<tr>
					<td style={{ padding: "0px",minHeight:"500px",height:"500px"}}>
						<table className="table table-striped table-bordered table-hover" style={{ marginBottom:"0px" }}
						       id={props.id}>
							{theadDom}
							<tbody style={{ fontSize: "12px"}}>
							{props.tbody}
							</tbody>
						</table>
					</td>
				</tr>
			</table>
		);
	}
}

export default Table;



