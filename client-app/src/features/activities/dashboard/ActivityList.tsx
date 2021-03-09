import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer (function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities: activities} = activityStore;
    
    return (
        <>
            {activities.map(([date, activities]) => (
                <Fragment key={date}>
                    <Header sub color='teal'>
                        {date}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})