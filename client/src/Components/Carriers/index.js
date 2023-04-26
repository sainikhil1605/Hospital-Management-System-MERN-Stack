import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Table } from "reactstrap";

const Carrier = () => {
  const [carrier, setCarrier] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getData = async () => {
      const {
        data: { carriers },
      } = await axiosInstance.get("/carrier");
      setCarrier([...carriers]);
    };
    getData();
  }, []);

  return (
    <div>
      <h3 style={{ margin: "auto", width: "50%", marginBottom: "10px" }}>
        This is the list of Insurance carriers we support
      </h3>
      <Table
        striped
        style={{
          width: "50%",
          "box-shadow": "2px 2px 4px 4px #CCCCCC",
          marginTop: "30px",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>S.no</th>
            <th>Carrier Name</th>
            <th>Carrier Percentage</th>
          </tr>
        </thead>
        <tbody>
          {carrier.map((carrier, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{carrier.name}</td>
                <td>{carrier.percentage}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
export default Carrier;
