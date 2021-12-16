import Cookies from "js-cookie";
import { Route, Switch } from "react-router";
import GetAppointments from "../Components/Doctor/Appointments";
import GetDocProfile from "../Components/Doctor/getDocProfile";
export default function DoctorRoutes() {
	return (
		<Switch>
			<Route exact path="/doctorLogin">
				<GetAppointments />
			</Route>
			<Route exact path="/doctorLogin/editDocProfile">
				<GetDocProfile id={Cookies.get("doc_id")} />
			</Route>
		</Switch>
	);
}
