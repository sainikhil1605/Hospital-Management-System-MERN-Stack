import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';
import Loader from '../Loader';
function FeedBack() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFeedbacks = async () => {
      setLoading(true);
      const res = await axiosInstance.get('/feedback');
      if (res.status === 200) {
        setFeedbacks(res.data.feedbacks);
        setLoading(false);
      }
    };
    getFeedbacks();
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Row>
        <Col sm="3"></Col>

        <Table
          striped
          style={{
            width: '50%',
            'box-shadow': '2px 2px 4px 4px #CCCCCC',
            marginTop: '30px',
          }}
        >
          <thead>
            <th>Id</th>
            <th>Feedback</th>
          </thead>

          {feedbacks.map((feedback, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{feedback.feedback}</td>
              </tr>
            );
          })}
        </Table>
      </Row>
    </div>
  );
}
export default FeedBack;
