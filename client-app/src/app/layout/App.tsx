import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then(resp => {
      setActivities(resp.data)
    }
    )
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(act => act.id === id));
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  return (
    <>
      <NavBar />
      <Container style={{ 'margin-top': '7em' }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          activities={activities}
        />
      </Container>
    </>
  );
}

export default App;
