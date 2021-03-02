import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    agent.Activities.list().then(resp => {
      let activities: Activity[]= []
      resp.forEach(act => {
        act.date=act.date.split('T')[0]
        activities.push(act)
      })
      setActivities(activities)
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(act => act.id === id));
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrUpdateActivity(activity: Activity) {
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) :
      setActivities([...activities, { ...activity, id: uuid() }])

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ 'margin-top': '7em' }}>
        <ActivityDashboard
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          activities={activities}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrUpdateActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
