import React from "react";
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Nav,
	NavItem,
	NavLink,
	Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
class GetDocProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Name: "",
			Email: "",
			Address: "",
			Phone: "",
			Role: "doctor",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		const headers = {
			authorization: Cookies.get("token"),
		};
		const id = this.props.id;
		axios
			.get(
				`http://localhost:4000/doctor/profile/${id}`,

				{ headers: headers }
			)
			.then((res) => {
				console.log(res);
				this.setState({
					Id: this.props.id,
					Name: res.data[0].doctor_name,
					Email: res.data[0].email,
					Address: res.data[0].address,
					Phone: res.data[0].phone,
				});
			});
	}
	handleSubmit(e) {
		e.preventDefault();
		const headers = {
			authorization: Cookies.get("token"),
		};
		axios
			.post("http://localhost:4000/doctor/profile", this.state, {
				headers: headers,
			})
			.then((res) => {
				alert(res.data);
			});
	}

	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink>
							<Link to="/doctorLogin">View Appointments</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink active>
							<Link to="#">Edit Profile</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Row>
					<Col md="3"></Col>
					<Col md="6">
						<Form className="mt-4">
							<FormGroup>
								<Row>
									<Col md="2">
										<Label>Name</Label>
									</Col>
									<Col>
										<Input
											value={this.state.Name}
											onChange={(e) =>
												this.setState({
													Name: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Row>
									<Col md="2">
										<Label>Email</Label>
									</Col>
									<Col>
										<Input
											value={this.state.Email}
											onChange={(e) =>
												this.setState({
													Email: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Row>
									<Col md="2">
										<Label>Phone Number</Label>
									</Col>
									<Col>
										<Input
											value={this.state.Phone}
											onChange={(e) =>
												this.setState({
													Phone: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>
							<FormGroup>
								<Row>
									<Col md="2">
										<Label>Adress</Label>
									</Col>
									<Col>
										<Input
											value={this.state.Address}
											onChange={(e) =>
												this.setState({
													Address: e.target.value,
												})
											}
										/>
									</Col>
								</Row>
							</FormGroup>

							<FormGroup>
								<Button onClick={(e) => this.handleSubmit(e)}>
									Submit
								</Button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}
export default GetDocProfile;
