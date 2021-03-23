import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, initialLoading } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    // function handleSubmit() {
    //     if (activity.id.length === 0) {
    //         let newActivity = {
    //             ...activity,
    //             id: uuid()
    //         };
    //         createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    //     } else {
    //         updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    //     }
    // }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if (initialLoading) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                initialValues={activity} 
                onSubmit={values => console.log(values)}
                enableReinitialize
                >
                {({ handleSubmit }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <FormField>
                            <Field placeholder="Title" name="title"></Field>
                            <ErrorMessage name="title" 
                            render={err => <Label basic content={err} color='red'/>} />
                        </FormField>
                        <Field placeholder='Title' name='title'/>
                        <Field placeholder='Description' name='description' />
                        <Field placeholder='Category' name='category' />
                        <Field placeholder='Date' type="date" value={activity.date} name='date' />
                        <Field placeholder='City' name='city' />
                        <Field placeholder='Venue' name='venue' />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})