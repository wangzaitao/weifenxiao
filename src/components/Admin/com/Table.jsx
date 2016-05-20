import React from 'react';
import CustomLink from './CustomLink.jsx';

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0
		}
	}

	componentDidMount() {
		var that = this;
		$(document).on("click", ".table-click tr", function () {
			$(".table-click tr").removeClass("current");
			$(this).addClass("current");
			alert($(this).find("td:first").text());
			that.setState({
				id: $(this).find("td:first").text()
			});
		})
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
						<a className="btn-sm btn btn-primary fr" href={props.addUrl} target="_blank">新增</a>
						<a className="btn-sm btn btn-primary fr" href={"/product/edit/"+this.state.id} target="_blank">修改</a>
					</td>
				</tr>
				<tr>
					<td style={{ padding: "0px",minHeight:"500px",height:"500px"}}>
						<table className="table table-striped table-bordered table-click" style={{ marginBottom:"0px" }}
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



