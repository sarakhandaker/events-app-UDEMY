import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activities';
import NavBar from './NavBar';

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(resp => {
      setActivities(resp.data)
    }
    )
  }, [])
  return (
    <>
      <NavBar />
      <Container style={{'margin-top': '7em'}}>
        <List>
          {activities.map(activity => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
