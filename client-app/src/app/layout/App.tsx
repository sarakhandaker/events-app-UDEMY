import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    agent.Activities.list().then(resp => {
      let activities: Activity[]= []
      resp.forEach(act => {
        act.date=act.date.split('T')[0]
        activities.push(act)
      })
      setActivities(activities)
      setLoading(false)
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
    setSubmitting(true)
    if (activity.id){
        agent.Activities.update(activity).then( ()=>{
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(true)
      })
    }
    else {
      activity.id = uuid()
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(true)
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)])
      setSubmitting(false)
    })
   
  }

  if (loading) return <LoadingComponent content='Loading app...'/>

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ 'marginTop': '7em' }}>
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
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
