import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patient_name: "",
			email: "",
			password: "",
			address: "",
			phone: "",
			sex: "",
			birthdate: "",
			age: "",
			bloodgroup: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		console.log(this.state);
		const headers = {
			authorization: Cookies.get("token"),
		};
		axios
			.post("http://localhost:4000/patient/patientList", this.state, {
				headers: headers,
			})
			.then((res) => {
				console.log(res);
				if (res.data.isError) {
					alert(res.data.message);
				} else {
					alert(res.data);
				}
			});
	}
	render() {
		return (
			<div>
				<Form style={{ marginTop: "25px" }}>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Name *</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({ patient_name: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Email *</Label>
							</Col>
							<Col sm="10">
								<Input
									type="email"
									onChange={(e) =>
										this.setState({ email: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Password *</Label>
							</Col>
							<Col sm="10">
								<Input
									type="password"
									onChange={(e) =>
										this.setState({
											password: e.target.value,
										})
									}
								/>
								<small>
									(Must be atleast of length 8 with one
									Uppercase,one Lowercase,a number and a
									special character)
								</small>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Address</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({
											address: e.target.value,
										})
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Phone</Label>
							</Col>
							<Col sm="10">
								<Input
									type="phone"
									onChange={(e) =>
										this.setState({ phone: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Sex</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({ sex: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Birthdate</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({
											birthdate: e.target.value,
										})
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Age *</Label>
							</Col>
							<Col sm="10">
								<Input
									type="number"
									onChange={(e) =>
										this.setState({ age: e.target.value })
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2">
								<Label>Blood Group</Label>
							</Col>
							<Col sm="10">
								<Input
									type="text"
									onChange={(e) =>
										this.setState({
											bloodgroup: e.target.value,
										})
									}
								/>
							</Col>
						</Row>
					</FormGroup>
					<FormGroup>
						<Row>
							<Col sm="2"></Col>
							<Col sm="10">
								<Button onClick={(e) => this.handleSubmit()}>
									Submit
								</Button>
							</Col>
						</Row>
					</FormGroup>
				</Form>
			</div>
		);
	}
}
export default SignUp;
