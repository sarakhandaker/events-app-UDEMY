import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

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
        <ActivityDashboard activities={activities}/>
      </Container>
    </>
  );
}

export default App;
