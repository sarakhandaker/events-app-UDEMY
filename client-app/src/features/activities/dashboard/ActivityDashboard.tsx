import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer (function ActivityDashboard({submitting, activities, deleteActivity, createOrEdit}: Props) {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && <ActivityDetails />}
                {editMode && <ActivityForm submitting={submitting} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
})